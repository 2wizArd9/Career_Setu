# Career Compass API

A Flask-based API that uses multi-agent AI collaboration to analyze resumes, forecast career paths, and generate personalized learning plans.

## Features

- **Multi-Agent System**: Uses AutoGen with three specialized AI agents:
  - **Skill Analyst**: Extracts hard skills, soft skills, and certifications from resumes
  - **Market Forecaster**: Predicts high-growth career paths based on extracted skills
  - **Learning Coach**: Creates personalized learning plans to bridge skill gaps

- **OpenRouter Integration**: Uses free models from OpenRouter for cost-effective AI processing

## Setup

1. **Create a virtual environment**:
   ```powershell
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

2. **Install dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Get a free API key from [OpenRouter](https://openrouter.ai/keys)
   - Add your API key to the `.env` file:
     ```
     OPENROUTER_API_KEY=your_actual_api_key_here
     ```

4. **Run the application**:
   ```powershell
   python app.py
   ```

   The API will be available at `http://localhost:5001`

## API Endpoints

### POST /api/full-analysis

Analyzes a resume and returns career insights with a learning plan.

**Request Body**:
```json
{
  "resume_text": "Your resume text here..."
}
```

**Response**:
```json
{
  "extracted_skills": {
    "hard_skills": ["Python", "JavaScript", "SQL"],
    "soft_skills": ["Communication", "Leadership"],
    "certifications": ["AWS Certified Developer"]
  },
  "career_forecast": [
    {
      "title": "Full Stack Developer",
      "description": "Build complete web applications",
      "required_skills": ["React", "Node.js", "MongoDB", "REST APIs", "Git"]
    }
  ],
  "learning_plan": [
    {
      "step": 1,
      "activity": "Complete online course",
      "topic": "React Fundamentals",
      "duration": "2 weeks"
    }
  ]
}
```

## Technology Stack

- **Flask**: Web framework
- **AutoGen**: Multi-agent orchestration
- **OpenRouter**: AI model access
- **Python 3.8+**: Runtime environment

## Models Used

The API uses three different free models from OpenRouter:
- `nousresearch/deephermes-3-llama-3-8b-preview:free` - Skill Analysis
- `deepseek/deepseek-r1-0528:free` - Career Forecasting & Management
- `meta-llama/llama-3.3-8b-instruct:free` - Learning Coaching

## Development

To enable debug mode and auto-reload:
```python
app.run(port=5001, debug=True)
```

## Error Handling

The API includes comprehensive error handling for:
- Missing request data
- JSON parsing errors
- AI agent failures
- General exceptions

All errors return appropriate HTTP status codes and descriptive error messages.
