"""
Test script for Career Compass API (Endpoint Test Only)
This script only tests the API endpoints without processing a full resume
"""

import requests
import json
import time

# Test data - Much smaller test data to avoid rate limits
test_resume = """
John Smith
Software Developer
Skills: Python
Experience: 1 year
"""

# API endpoints
base_url = "http://localhost:5001"
start_url = f"{base_url}/api/start-analysis"
status_url = f"{base_url}/api/analysis-status/"

print("=" * 60)
print("Testing Career Compass API (Endpoints Only)")
print("=" * 60)
print(f"\nTesting endpoint: {start_url}")
print("\nTest Resume Text:")
print("-" * 60)
print(test_resume)
print("-" * 60)

try:
    # Step 1: Test the start-analysis endpoint
    print("\n1. Testing /api/start-analysis endpoint...")
    start_response = requests.post(
        start_url,
        json={"resume_text": test_resume},
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    
    print(f"Status Code: {start_response.status_code}")
    if start_response.status_code == 202:
        print("✓ Success! Endpoint is working correctly.")
        job_data = start_response.json()
        job_id = job_data["job_id"]
        print(f"Job ID: {job_id}")
        
        # Step 2: Test the analysis-status endpoint
        print("\n2. Testing /api/analysis-status/<job_id> endpoint...")
        status_response = requests.get(
            f"{status_url}{job_id}",
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {status_response.status_code}")
        if status_response.status_code == 200:
            print("✓ Success! Endpoint is working correctly.")
            job_status = status_response.json()
            print(f"Job Status: {job_status.get('status', 'unknown')}")
        else:
            print(f"✗ Error: {status_response.text}")
    else:
        print(f"✗ Error: {start_response.text}")
    
except requests.exceptions.ConnectionError:
    print("\n✗ Error: Could not connect to the API")
    print("Make sure the Flask server is running (python app.py)")
except requests.exceptions.Timeout:
    print("\n✗ Error: Request timed out")
    print("A timeout occurred during the API request.")
except Exception as e:
    print(f"\n✗ Error: {e}")

print("\n" + "=" * 60)
print("API Endpoint Test Complete")
print("=" * 60)