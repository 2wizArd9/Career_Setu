#!/usr/bin/env python3
"""
Quick configuration check for Career Compass API
Run this to verify your setup before starting the server
"""

import os
import sys

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✓ Python {version.major}.{version.minor}.{version.micro} (OK)")
        return True
    else:
        print(f"✗ Python {version.major}.{version.minor}.{version.micro} (Need 3.8+)")
        return False

def check_file_exists(filepath, required=True):
    """Check if a file exists"""
    if os.path.exists(filepath):
        print(f"✓ {filepath} (exists)")
        return True
    else:
        symbol = "✗" if required else "!"
        status = "missing - REQUIRED" if required else "missing - optional"
        print(f"{symbol} {filepath} ({status})")
        return not required

def check_env_var(var_name):
    """Check if environment variable is set"""
    from dotenv import load_dotenv
    load_dotenv()
    
    value = os.getenv(var_name)
    if value and value != f"your_{var_name.lower()}_here":
        print(f"✓ {var_name} (configured)")
        return True
    else:
        print(f"✗ {var_name} (not configured)")
        return False

def check_imports():
    """Check if required packages are installed"""
    packages = {
        'flask': 'Flask',
        'flask_cors': 'Flask-CORS',
        'autogen': 'pyautogen',
        'dotenv': 'python-dotenv',
    }
    
    all_ok = True
    for module, package in packages.items():
        try:
            __import__(module)
            print(f"✓ {package} (installed)")
        except ImportError:
            print(f"✗ {package} (not installed)")
            all_ok = False
    
    return all_ok

def main():
    print("=" * 60)
    print("Career Compass API - Configuration Check")
    print("=" * 60)
    print()
    
    print("1. Checking Python Version:")
    python_ok = check_python_version()
    print()
    
    print("2. Checking Required Files:")
    files_ok = all([
        check_file_exists("app.py", required=True),
        check_file_exists("requirements.txt", required=True),
        check_file_exists(".env", required=True),
        check_file_exists(".env.example", required=False),
    ])
    print()
    
    print("3. Checking Package Installation:")
    packages_ok = check_imports()
    print()
    
    if packages_ok:
        print("4. Checking Environment Variables:")
        env_ok = check_env_var("OPENROUTER_API_KEY")
        print()
    else:
        env_ok = False
        print("4. Skipping environment check (packages not installed)")
        print()
    
    print("=" * 60)
    if python_ok and files_ok and packages_ok and env_ok:
        print("✓ All checks passed! You're ready to run the server.")
        print("  Run: python app.py")
    else:
        print("✗ Some checks failed. Please fix the issues above.")
        print()
        if not packages_ok:
            print("  To install packages: pip install -r requirements.txt")
        if not env_ok:
            print("  To configure API key: Edit .env file")
        if not check_file_exists(".env", required=False):
            print("  To create .env: copy .env.example .env")
    print("=" * 60)

if __name__ == "__main__":
    main()
