"""
Career Compass Mock API Demo
This script demonstrates the mock agent workflow without needing Flask
"""

import time
import json
import uuid
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

print("=" * 60)
print("Career Compass Mock Demo")
print("=" * 60)
print("\nResume Text:")
print("-" * 60)
print(test_resume)
print("-" * 60)

# Mock job store
jobs = {}

# Global variables for the demo
job_id = str(uuid.uuid4())
current_agent = "Starting"
progress = 0
status = "starting"

# Create a global spinner controller
class SpinnerController:
    def __init__(self):
        self.stop = False
        self.status = "Starting job"

# Initialize the global spinner controller
spinner = SpinnerController()

def show_progress_indicator():
    # Create a background thread to show a spinner
    def spinner_func():
        spinner_chars = itertools.cycle(['-', '\\', '|', '/'])
        last_printed_time = time.time()
        
        while time.time() - start_time < 300 and not spinner.stop:  # 5 minutes max
            current_time = time.time()
            elapsed = current_time - start_time
            
            # Only update every 2 seconds to avoid too much console output
            if current_time - last_printed_time >= 2:
                minutes = int(elapsed // 60)
                seconds = int(elapsed % 60)
                status = spinner.status
                print(f"{next(spinner_chars)} {minutes:02d}:{seconds:02d} - {status}", end="\r", flush=True)
                last_printed_time = current_time
                
            time.sleep(0.25)
    
    # Start the spinner in a background thread
    t = threading.Thread(target=spinner_func)
    t.daemon = True
    t.start()
    return t

def run_mock_workflow():
    """This function returns mock data without using any external API."""
    global status, progress, current_agent, jobs
    
    try:
        # Extract basic info from the resume for personalization
        resume_lines = test_resume.strip().split('\n')
        name = "Candidate"
        title = "Professional"
        skills = []
        
        # Try to extract name and title from resume
        if len(resume_lines) >= 2:
            name = resume_lines[0].strip()
            title = resume_lines[1].strip()
        
        # Try to extract some skills from the resume text
        skills_section = False
        for line in resume_lines:
            if 'skills' in line.lower():
                skills_section = True
                continue
            if skills_section and line.strip().startswith('-'):
                skills.extend([s.strip() for s in line.replace('-', '').split(',')])
                
        # Limit skills to prevent excessive extraction
        if len(skills) == 0:
            skills = ["Python", "JavaScript", "Communication"]
        elif len(skills) > 10:
            skills = skills[:10]
        
        # Simulate the first agent analyzing the resume - Skill Analyst
        status = 'processing'
        progress = 25
        current_agent = 'Skill_Analyst'
        spinner.status = f"Job status: {status} | Agent: {current_agent} | Progress: {progress}%"
        time.sleep(3)  # Simulate processing time
        
        # Extract technical and soft skills
        technical_skills = []
        soft_skills = []
        certifications = []
        
        for skill in skills:
            if any(tech in skill.lower() for tech in ['python', 'java', 'javascript', 'react', 'node', 'sql', 'mongo', 'git', 'docker']):
                technical_skills.append(skill)
            elif 'certif' in skill.lower() or 'aws' in skill.lower():
                certifications.append(skill)
            else:
                soft_skills.append(skill)
                
        if not technical_skills:
            technical_skills = ["Python", "JavaScript", "React", "Node.js", "SQL", "MongoDB", "Git", "Docker"]
        if not soft_skills:
            soft_skills = ["Problem-solving", "Team collaboration", "Communication"]
        if not certifications and 'aws' in test_resume.lower():
            certifications = ["AWS Certified Developer Associate"]
            
        # Simulate the second agent analyzing career options - Market Forecaster
        status = 'processing'
        progress = 50
        current_agent = 'Market_Forecaster'
        spinner.status = f"Job status: {status} | Agent: {current_agent} | Progress: {progress}%"
        time.sleep(3)  # Simulate processing time
        
        # Generate career paths based on skills
        career_forecast = []
        
        # Customize career paths based on extracted skills
        if any(js in ' '.join(technical_skills).lower() for js in ['javascript', 'react', 'node']):
            career_forecast.append({
                "role": "Full Stack Developer",
                "fit_percentage": 92,
                "salary_range": "$95,000 - $120,000",
                "growth_outlook": "Strong"
            })
            
        if any(dev in ' '.join(technical_skills).lower() for dev in ['docker', 'kubernetes', 'ci/cd', 'devops', 'aws']):
            career_forecast.append({
                "role": "DevOps Engineer",
                "fit_percentage": 85,
                "salary_range": "$105,000 - $135,000",
                "growth_outlook": "Very Strong"
            })
            
        if any(back in ' '.join(technical_skills).lower() for back in ['python', 'java', 'sql', 'mongodb']):
            career_forecast.append({
                "role": "Backend Developer",
                "fit_percentage": 88,
                "salary_range": "$90,000 - $115,000",
                "growth_outlook": "Strong"
            })
            
        if any(data in ' '.join(technical_skills).lower() for data in ['python', 'sql', 'data']):
            career_forecast.append({
                "role": "Data Scientist",
                "fit_percentage": 82,
                "salary_range": "$100,000 - $130,000",
                "growth_outlook": "Very Strong"
            })
            
        # Ensure we have at least 3 career paths
        default_careers = [
            {
                "role": "Full Stack Developer",
                "fit_percentage": 92,
                "salary_range": "$95,000 - $120,000",
                "growth_outlook": "Strong"
            },
            {
                "role": "DevOps Engineer",
                "fit_percentage": 85,
                "salary_range": "$105,000 - $135,000",
                "growth_outlook": "Very Strong"
            },
            {
                "role": "Backend Developer",
                "fit_percentage": 88,
                "salary_range": "$90,000 - $115,000",
                "growth_outlook": "Strong"
            }
        ]
        
        if len(career_forecast) < 3:
            for career in default_careers:
                if not any(c["role"] == career["role"] for c in career_forecast):
                    career_forecast.append(career)
                if len(career_forecast) >= 3:
                    break
                    
        # Sort by fit percentage
        career_forecast = sorted(career_forecast, key=lambda x: x["fit_percentage"], reverse=True)
        if len(career_forecast) > 3:
            career_forecast = career_forecast[:3]
            
        # Simulate the third agent creating a learning plan - Learning Coach
        status = 'processing'
        progress = 75
        current_agent = 'Learning_Coach'
        spinner.status = f"Job status: {status} | Agent: {current_agent} | Progress: {progress}%"
        time.sleep(3)  # Simulate processing time
        
        # Generate learning plan based on top career path
        top_career = career_forecast[0]["role"]
        learning_plan = []
        
        if "Full Stack Developer" in top_career:
            learning_plan = [
                {
                    "step": "Master modern frontend frameworks",
                    "resources": ["React Advanced Patterns Course", "Next.js Documentation and Tutorials"],
                    "timeline": "2-3 months"
                },
                {
                    "step": "Develop backend expertise with API design",
                    "resources": ["RESTful API Design Best Practices", "GraphQL Zero to Hero Course"],
                    "timeline": "2-3 months"
                },
                {
                    "step": "Build a comprehensive full-stack portfolio project",
                    "resources": ["GitHub project template", "Full Stack Open MOOC"],
                    "timeline": "3-4 months"
                }
            ]
        elif "DevOps" in top_career:
            learning_plan = [
                {
                    "step": "Learn Kubernetes for container orchestration",
                    "resources": ["Kubernetes Certified Administrator course", "Docker and Kubernetes: The Complete Guide"],
                    "timeline": "3-4 months"
                },
                {
                    "step": "Master CI/CD pipelines and infrastructure as code",
                    "resources": ["GitHub Actions Deep Dive", "Terraform for AWS Infrastructure"],
                    "timeline": "2-3 months"
                },
                {
                    "step": "Implement monitoring and observability solutions",
                    "resources": ["Prometheus and Grafana Workshop", "Cloud Native Observability Book"],
                    "timeline": "2-3 months"
                }
            ]
        elif "Data" in top_career:
            learning_plan = [
                {
                    "step": "Strengthen machine learning foundations",
                    "resources": ["Fast.ai Practical Deep Learning", "Python for Data Science Handbook"],
                    "timeline": "3-4 months"
                },
                {
                    "step": "Develop data engineering skills",
                    "resources": ["Spark and Hadoop Essentials", "Data Pipelines with Apache Airflow"],
                    "timeline": "2-3 months"
                },
                {
                    "step": "Build an end-to-end ML project with deployment",
                    "resources": ["MLOps on AWS Workshop", "Deployment of ML Models Course"],
                    "timeline": "3-4 months"
                }
            ]
        else:
            learning_plan = [
                {
                    "step": "Learn Kubernetes for container orchestration",
                    "resources": ["Kubernetes Certified Administrator course", "Docker and Kubernetes: The Complete Guide"],
                    "timeline": "3-4 months"
                },
                {
                    "step": "Build a scalable microservices project",
                    "resources": ["GitHub project template", "Udemy: Microservices with Node.js and React"],
                    "timeline": "2-3 months"
                },
                {
                    "step": "Contribute to open-source cloud projects",
                    "resources": ["GitHub trending repositories", "Good First Issues list"],
                    "timeline": "Ongoing"
                }
            ]
            
        # Simulate final analysis compilation
        status = 'processing'
        progress = 90
        current_agent = 'GroupChat_Manager'
        spinner.status = f"Job status: {status} | Agent: {current_agent} | Progress: {progress}%"
        time.sleep(2)  # Simulate processing time
        
        # Create a personalized message
        personalized_insight = f"Based on {name}'s background as a {title}, they show strong aptitude for {top_career} roles. Their skills in {', '.join(technical_skills[:3])} position them well for this career path. Recommend focusing on {learning_plan[0]['step']} to maximize career potential."
        
        # Create the final mock result with all the personalized data
        mock_result = {
            "extracted_skills": {
                "technical": technical_skills,
                "soft": soft_skills,
                "certifications": certifications
            },
            "career_forecast": career_forecast,
            "learning_plan": learning_plan,
            "personalized_insight": personalized_insight
        }
        
        # Simulate final completion
        status = 'completed'
        progress = 100
        current_agent = ''
        spinner.status = f"Job status: {status} | Progress: {progress}%"
        
        return mock_result
        
    except Exception as e:
        print(f"An error occurred in mock workflow: {e}")
        status = 'failed'
        spinner.status = f"Job status: {status} | Error occurred"
        return {"error": str(e)}


print("\nStarting agent simulation. This will take a few moments...")
print("Progress: ", end="", flush=True)

start_time = time.time()
progress_thread = show_progress_indicator()

try:
    # Run the mock workflow
    result = run_mock_workflow()
    
    # Print elapsed time
    elapsed = time.time() - start_time
    print(f"\n\nSimulation completed in {elapsed:.1f} seconds")
    
    # Display the results
    print("\n✓ Success! Analysis completed:")
    print("=" * 60)
    
    # Display personalized insight
    if "personalized_insight" in result:
        print("\n📋 PERSONALIZED INSIGHT:")
        print(result["personalized_insight"])
        print("\n")
    
    # Display skills
    print("🔍 SKILLS ANALYSIS:")
    if "extracted_skills" in result:
        skills = result["extracted_skills"]
        print(f"  Technical: {', '.join(skills.get('technical', []))}")
        print(f"  Soft: {', '.join(skills.get('soft', []))}")
        if "certifications" in skills and skills["certifications"]:
            print(f"  Certifications: {', '.join(skills.get('certifications', []))}")
        print()
        
    # Display career forecast
    print("🚀 CAREER FORECAST:")
    if "career_forecast" in result:
        for i, career in enumerate(result["career_forecast"][:3], 1):
            print(f"  {i}. {career.get('role')} (Match: {career.get('fit_percentage')}%)")
            print(f"     Salary Range: {career.get('salary_range')}")
            print(f"     Growth Outlook: {career.get('growth_outlook')}")
            print()
    
    # Display learning plan
    print("📚 LEARNING PLAN:")
    if "learning_plan" in result:
        for i, step in enumerate(result["learning_plan"], 1):
            print(f"  {i}. {step.get('step')} ({step.get('timeline')})")
            print(f"     Resources: {', '.join(step.get('resources', []))}")
            print()
    
    print("=" * 60)
            
except Exception as e:
    print(f"\n\n✗ Error: {e}")
finally:
    # Stop the spinner thread
    spinner.stop = True
    progress_thread.join(timeout=1.0)