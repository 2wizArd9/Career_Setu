"""
Test script for Career Compass API (Async Version)
Run this after starting the Flask server to test the endpoint
"""

import requests
import json
import time
import threading
import itertools
import sys

# Test data
test_resume = """
John Doe
Software Engineer

Skills:
- Python, JavaScript, React, Node.js
- SQL, MongoDB
- Git, Docker
- Problem-solving, Team collaboration, Communication

Experience:
- Built web applications using React and Node.js
- Developed REST APIs with Python Flask
- Worked with agile teams

Certifications:
- AWS Certified Developer Associate
"""

# API endpoints
base_url = "http://localhost:5001"
start_url = f"{base_url}/api/start-analysis"
status_url = f"{base_url}/api/analysis-status/"

print("=" * 60)
print("Testing Career Compass API (Async Version)")
print("=" * 60)
print(f"\nStarting job at: {start_url}")
print("\nResume Text:")
print("-" * 60)
print(test_resume)
print("-" * 60)

# Create a global spinner controller
class SpinnerController:
    def __init__(self):
        self.stop = False
        self.status = "Starting job"

# Initialize the global spinner controller
spinner_controller = SpinnerController()

# Progress indicator setup
def show_progress_indicator():
    """Create a spinner with elapsed time display"""
    
    def spinner_func():
        spinner_chars = itertools.cycle(['-', '\\', '|', '/'])
        last_printed_time = time.time()
        
        while time.time() - start_time < 300:  # 5 minutes max
            if spinner_controller.stop:
                break
                
            current_time = time.time()
            elapsed = current_time - start_time
            
            # Only update every 2 seconds to avoid too much console output
            if current_time - last_printed_time >= 2:
                minutes = int(elapsed // 60)
                seconds = int(elapsed % 60)
                status = spinner_controller.status
                print(f"{next(spinner_chars)} {minutes:02d}:{seconds:02d} - {status}", end="\r", flush=True)
                last_printed_time = current_time
                
            time.sleep(0.25)
    
    # Start the spinner in a background thread
    t = threading.Thread(target=spinner_func)
    t.daemon = True
    t.start()
    return t

print("\nSending request. This may take 3-5 minutes to process...")
print("Progress: ", end="", flush=True)

# Set the global start_time variable
start_time = time.time()
progress_thread = show_progress_indicator()

try:
    # Using a session for better control
    session = requests.Session()
    
    # Step 1: Start the analysis job
    spinner_controller.status = "Starting analysis job"
    start_response = session.post(
        start_url,
        json={"resume_text": test_resume},
        headers={"Content-Type": "application/json"},
        timeout=30  # 30 seconds timeout for starting the job
    )
    
    if start_response.status_code != 202:
        raise Exception(f"Failed to start job: {start_response.text}")
    
    # Get the job_id from the response
    job_data = start_response.json()
    job_id = job_data["job_id"]
    print(f"\nJob started successfully! Job ID: {job_id}")
    
    # Step 2: Poll for job status until it's complete
    spinner_controller.status = f"Polling for status (job: {job_id})"
    max_polls = 30
    poll_interval = 5  # seconds
    
    for i in range(max_polls):
        # Check job status
        status_response = session.get(
            f"{status_url}{job_id}",
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if status_response.status_code != 200:
            raise Exception(f"Failed to get job status: {status_response.text}")
        
        job_status = status_response.json()
        current_status = job_status.get("status", "unknown")
        spinner_controller.status = f"Job status: {current_status}"
        
        # If job is complete or failed, break the polling loop
        if current_status in ["completed", "failed"]:
            break
            
        # Wait before polling again
        time.sleep(poll_interval)
    
    # Set the final response to the job status response
    response = status_response
    
    # Print elapsed time
    elapsed = time.time() - start_time
    print(f"\n\nRequest completed in {elapsed:.1f} seconds")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        job_status = response.json()
        current_status = job_status.get("status", "unknown")
        
        if current_status == "completed":
            result = job_status["result"]
            print("\n✓ Success! Analysis completed:")
            print("=" * 60)
            print(json.dumps(result, indent=2))
            print("=" * 60)
        elif current_status == "failed":
            print(f"\n✗ Error: Job failed")
            print(f"Error message: {job_status.get('error', 'Unknown error')}")
        else:
            print(f"\n⚠ Warning: Job did not complete in time")
            print(f"Current status: {current_status}")
    else:
        print(f"\n✗ Error: {response.status_code}")
        print(response.text)
        
except requests.exceptions.ConnectionError:
    print("\n\n✗ Error: Could not connect to the API")
    print("Make sure the Flask server is running (python app.py)")
except requests.exceptions.Timeout:
    elapsed = time.time() - start_time
    print(f"\n\n✗ Error: Request timed out after {elapsed:.1f} seconds")
    print("A timeout occurred during the API request.")
    print("\nPossible solutions:")
    print("1. Check if the Flask server is still running")
    print("2. Verify that the API endpoints are correct")
    print("3. If you already have a job_id, you can still check its status")
except Exception as e:
    print(f"\n\n✗ Error: {e}")
finally:
    # Stop the spinner thread
    if progress_thread:
        spinner_controller.stop = True
        progress_thread.join(timeout=1.0)