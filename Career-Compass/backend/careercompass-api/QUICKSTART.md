# 🚀 Quick Start Guide - Career Compass API

## Prerequisites
- Python 3.8 or higher
- PowerShell (Windows)
- Internet connection

## 📦 Installation (2 minutes)

### Option 1: Automated Setup (Recommended)
```powershell
cd backend\careercompass-api
.\setup.ps1
```

### Option 2: Manual Setup
```powershell
# 1. Create virtual environment
python -m venv .venv

# 2. Activate it
.venv\Scripts\Activate.ps1

# 3. Install packages
pip install -r requirements.txt

# 4. Setup environment
copy .env.example .env
```

## 🔑 Get API Key (1 minute)
1. Go to: https://openrouter.ai/keys
2. Sign up (free)
3. Generate an API key
4. Open `.env` file
5. Replace `your_openrouter_api_key_here` with your actual key

## ✅ Verify Setup
```powershell
python check_setup.py
```

## ▶️ Run Server
```powershell
python app.py
```
Server starts at: http://localhost:5001

## 🧪 Test It
```powershell
# In a new terminal
python test_api.py
```

## 📝 API Endpoint

**URL**: `POST http://localhost:5001/api/full-analysis`

**Body**:
```json
{
  "resume_text": "Your resume here..."
}
```

**Example with curl**:
```powershell
curl -X POST http://localhost:5001/api/full-analysis `
  -H "Content-Type: application/json" `
  -d '{\"resume_text\": \"Python developer with 5 years experience...\"}'
```

**Example with Python**:
```python
import requests

response = requests.post(
    "http://localhost:5001/api/full-analysis",
    json={"resume_text": "Your resume text..."}
)
print(response.json())
```

## 📚 Files Overview

| File | Purpose |
|------|---------|
| `app.py` | Main Flask application |
| `requirements.txt` | Python dependencies |
| `.env` | API key configuration |
| `setup.ps1` | Automated setup script |
| `check_setup.py` | Configuration checker |
| `test_api.py` | API testing script |
| `README.md` | Full documentation |

## 🐛 Common Issues

### "Import flask could not be resolved"
- **Solution**: Activate virtual environment
  ```powershell
  .venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  ```

### "API key not configured"
- **Solution**: Edit `.env` file with your OpenRouter API key

### "Connection refused"
- **Solution**: Make sure Flask server is running (`python app.py`)

### "Timeout error"
- **Solution**: Normal for complex resumes. AI processing can take 30-120 seconds.

## 🎯 Next Steps

1. ✅ Complete setup
2. ✅ Test locally
3. 🔄 Integrate with frontend
4. 🚀 Deploy to production (see README.md)

## 💡 Tips

- Keep the virtual environment activated
- Monitor console output for debugging
- Use test_api.py for quick testing
- Check IMPROVEMENTS.md for detailed changes
- See README.md for full documentation

## 🆘 Need Help?

1. Run: `python check_setup.py`
2. Check: `IMPROVEMENTS.md` for troubleshooting
3. Read: `README.md` for detailed docs

---
**Last Updated**: 2025-10-16
**Version**: 1.0.0
