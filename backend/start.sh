#!/bin/bash

# Menstrual Health & Hygiene Marketplace Backend Startup Script

echo "🚀 Starting Menstrual Health & Hygiene Marketplace Backend..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp env.example .env
    echo "✅ Please update the .env file with your configuration"
fi

echo ""
echo "✨ Backend setup complete!"
echo ""
echo "📚 API Documentation will be available at:"
echo "   - Swagger UI: http://localhost:8000/docs"
echo "   - ReDoc: http://localhost:8000/redoc"
echo ""
echo "🔐 Demo Credentials:"
echo "   Seller: 9876543210 / password123"
echo "   Buyer:  9876543220 / password123"
echo "   NGO:    9876543230 / password123"
echo ""
echo "🎯 Starting FastAPI server..."
echo ""

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

