import os
import json
import uuid
import time
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify
from flask_cors import CORS
import autogen
from dotenv import load_dotenv

# ======================================================================================
# 1. INITIAL SETUP & CONFIGURATION
# ======================================================================================
load_dotenv()
app = Flask(__name__)
CORS(app)

# --- New: Setup for Asynchronous Job Processing ---
# A simple in-memory dictionary to act as our job store for the hackathon.
# In a production system, this would be a database like Redis or PostgreSQL.
jobs = {}
# A thread pool to run our long-running AutoGen tasks in the background.
executor = ThreadPoolExecutor(max_workers=2)

# Resilient configuration with fallbacks and retries
config_list = [
    {
        "model": "nousresearch/deephermes-3-llama-3-8b-preview:free",
        "base_url": "https://openrouter.ai/api/v1",
        "api_key": os.getenv("OPENROUTER_API_KEY"),
    },
    {
        "model": "deepseek/deepseek-r1-0528:free",
        "base_url": "https://openrouter.ai/api/v1",
        "api_key": os.getenv("OPENROUTER_API_KEY"),
    },
    {
        "model": "meta-llama/llama-3.3-8b-instruct:free",
        "base_url": "https://openrouter.ai/api/v1",
        "api_key": os.getenv("OPENROUTER_API_KEY"),
    }
]

# ======================================================================================
# 2. AGENT PROMPTS (No changes needed here)
# ======================================================================================
SKILL_ANALYST_PROMPT = """
You are an expert HR Technology Analyst AI... # (Paste your full prompt here)
"""
MARKET_FORECASTER_PROMPT = """
You are an expert Career Forecaster AI... # (Paste your full prompt here)
"""
LEARNING_COACH_PROMPT = """
You are an expert Learning and Development Coach AI... # (Paste your full prompt here)
"""

# ======================================================================================
# 3. AGENT & GROUP CHAT DEFINITION (No changes needed here)
# ======================================================================================
llm_config_hermes = {"config_list": autogen.filter_config(config_list, {"model": ["nousresearch/deephermes-3-llama-3-8b-preview:free"]}), "cache_seed": None}
llm_config_deepseek_with_fallback = {"config_list": autogen.filter_config(config_list, {"model": ["deepseek/deepseek-r1-0528:free", "meta-llama/llama-3.3-8b-instruct:free"]}), "cache_seed": None}
llm_config_llama3 = {"config_list": autogen.filter_config(config_list, {"model": ["meta-llama/llama-3.3-8b-instruct:free"]}), "cache_seed": None}

# ======================================================================================
# 4. THE BACKGROUND WORKER FUNCTION (The "Slow" Part)
# ======================================================================================
def run_mock_workflow(job_id, resume_text):
    """This function returns mock data quickly without using the OpenRouter API, but simulates realistic agent interactions."""
    print(f"Starting MOCK workflow for job_id: {job_id}")
    try:
        # Extract basic info from the resume for personalization
        resume_lines = resume_text.strip().split('\n')
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
        jobs[job_id]['status'] = 'processing'
        jobs[job_id]['progress'] = 25
        jobs[job_id]['current_agent'] = 'Skill_Analyst'
        print(f"Job {job_id}: Skill Analyst examining resume...")
        time.sleep(2)  # Simulate processing time
        
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
        if not certifications and 'aws' in resume_text.lower():
            certifications = ["AWS Certified Developer Associate"]
            
        # Simulate the second agent analyzing career options - Market Forecaster
        jobs[job_id]['status'] = 'processing'
        jobs[job_id]['progress'] = 50
        jobs[job_id]['current_agent'] = 'Market_Forecaster'
        print(f"Job {job_id}: Market Forecaster analyzing career paths based on skills...")
        time.sleep(2)  # Simulate processing time
        
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
        jobs[job_id]['status'] = 'processing'
        jobs[job_id]['progress'] = 75
        jobs[job_id]['current_agent'] = 'Learning_Coach'
        print(f"Job {job_id}: Learning Coach developing personalized learning plan...")
        time.sleep(2)  # Simulate processing time
        
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
        jobs[job_id]['status'] = 'processing'
        jobs[job_id]['progress'] = 90
        jobs[job_id]['current_agent'] = 'GroupChat Manager'
        print(f"Job {job_id}: Compiling final analysis...")
        time.sleep(1)  # Simulate processing time
        
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
        jobs[job_id]['status'] = 'completed'
        jobs[job_id]['progress'] = 100
        jobs[job_id]['result'] = mock_result
        print(f"Successfully completed job_id: {job_id} with personalized analysis")
        
    except Exception as e:
        print(f"An error occurred in mock workflow for job_id {job_id}: {e}")
        jobs[job_id]['status'] = 'failed'
        jobs[job_id]['error'] = str(e)


def run_autogen_workflow(job_id, resume_text):
    """This function contains the long-running AI logic and will be run in a background thread."""
    print(f"Starting AutoGen workflow for job_id: {job_id}")
    try:
        # We re-initialize agents here to ensure thread safety
        skill_analyst = autogen.AssistantAgent(name="Skill_Analyst", system_message=SKILL_ANALYST_PROMPT, llm_config=llm_config_hermes)
        market_forecaster = autogen.AssistantAgent(name="Market_Forecaster", system_message=MARKET_FORECASTER_PROMPT, llm_config=llm_config_deepseek_with_fallback)
        learning_coach = autogen.AssistantAgent(name="Learning_Coach", system_message=LEARNING_COACH_PROMPT, llm_config=llm_config_llama3)
        user_proxy = autogen.UserProxyAgent(name="User_Proxy", human_input_mode="NEVER", max_consecutive_auto_reply=10, is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"), code_execution_config=False)
        groupchat = autogen.GroupChat(agents=[user_proxy, skill_analyst, market_forecaster, learning_coach], messages=[], max_round=15)
        manager = autogen.GroupChatManager(groupchat=groupchat, llm_config=llm_config_deepseek_with_fallback)

        initial_prompt = f"""
        Here is the resume text: --- {resume_text} ---
        Please execute the following workflow:
        1. The Skill_Analyst must analyze this text and output a JSON of the user's skills.
        2. The Market_Forecaster must take the extracted skills and generate a JSON list of 3 potential career paths.
        3. The Learning_Coach must take the user's skills and the #1 career path from the forecast to generate a 3-step JSON learning plan.
        4. Finally, after all steps are complete, output a single, final JSON object that consolidates all the results. The final JSON should have three top-level keys: "extracted_skills", "career_forecast", and "learning_plan". The conversation is finished after this final JSON is provided. TERMINATE
        """

        user_proxy.initiate_chat(manager, message=initial_prompt)
        final_response = user_proxy.last_message()["content"]

        if "```json" in final_response:
            final_response = final_response.split("```json")[1].split("```")[0].strip()
        
        parsed_json = json.loads(final_response)

        # Update the job store with the final result
        jobs[job_id]['status'] = 'completed'
        jobs[job_id]['result'] = parsed_json
        print(f"Successfully completed job_id: {job_id}")

    except Exception as e:
        print(f"An error occurred in background worker for job_id {job_id}: {e}")
        jobs[job_id]['status'] = 'failed'
        jobs[job_id]['error'] = str(e)

# ======================================================================================
# 5. THE NEW API ENDPOINTS
# ======================================================================================

# Add a simple health check endpoint
@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "API is running"}), 200

# Add a test mode flag (for development)
ENABLE_MOCK_MODE = True  # Set to False in production

@app.route("/api/start-analysis", methods=["POST"])
def start_analysis():
    """This is the 'fast' endpoint. It starts the job and returns a job_id immediately."""
    data = request.get_json()
    if not data or "resume_text" not in data:
        return jsonify({"error": "Missing 'resume_text' in request body"}), 400

    job_id = str(uuid.uuid4())
    resume_text = data["resume_text"]

    # Store the initial job status
    jobs[job_id] = {"status": "processing"}

    if ENABLE_MOCK_MODE:
        # In mock mode, we'll use a simpler worker that doesn't hit the OpenRouter API
        executor.submit(run_mock_workflow, job_id, resume_text)
        print(f"Job {job_id} started in MOCK MODE. Returning immediate response.")
    else:
        # Submit the long-running task to our background thread pool
        executor.submit(run_autogen_workflow, job_id, resume_text)
        print(f"Job {job_id} started. Returning immediate response.")
        
    # Return the job_id to the client instantly
    return jsonify({"job_id": job_id}), 202

@app.route("/api/analysis-status/<job_id>", methods=["GET"])
def analysis_status(job_id):
    """This is the 'polling' endpoint. The front-end will call this to check the job status."""
    job = jobs.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    print(f"Checking status for job_id {job_id}: {job['status']}")
    return jsonify(job)

# ======================================================================================
# 6. RUN THE FLASK APP
# ======================================================================================
if __name__ == "__main__":
    app.run(port=5001, debug=True)