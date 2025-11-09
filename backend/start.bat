@echo off
REM Menstrual Health & Hygiene Marketplace Backend Startup Script (Windows)

echo 🚀 Starting Menstrual Health & Hygiene Marketplace Backend...
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found. Creating from example...
    copy env.example .env
    echo ✅ Please update the .env file with your configuration
)

echo.
echo ✨ Backend setup complete!
echo.
echo 📚 API Documentation will be available at:
echo    - Swagger UI: http://localhost:8000/docs
echo    - ReDoc: http://localhost:8000/redoc
echo.
echo 🔐 Demo Credentials:
echo    Seller: 9876543210 / password123
echo    Buyer:  9876543220 / password123
echo    NGO:    9876543230 / password123
echo.
echo 🎯 Starting FastAPI server...
echo.

REM Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

