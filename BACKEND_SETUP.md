# Backend Setup Guide

## Quick Start

### Option 1: Automated Setup (Recommended)

#### On macOS/Linux:
```bash
cd backend
chmod +x start.sh
./start.sh
```

#### On Windows:
```bash
cd backend
start.bat
```

### Option 2: Manual Setup

#### 1. Navigate to backend directory
```bash
cd backend
```

#### 2. Create virtual environment
```bash
python -m venv venv
```

#### 3. Activate virtual environment

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

#### 4. Install dependencies
```bash
pip install -r requirements.txt
```

#### 5. Create .env file
```bash
cp env.example .env
```

Edit `.env` and update the `SECRET_KEY` with a secure random string.

#### 6. Run the server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Access

Once running, the API will be available at:

- **Base URL**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Demo Credentials

Use these credentials to test the API:

| Role | Phone | Password |
|------|-------|----------|
| Seller | 9876543210 | password123 |
| Buyer | 9876543220 | password123 |
| NGO | 9876543230 | password123 |

## Testing the API

### 1. Login
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "password": "password123"
  }'
```

### 2. Use the token
Copy the `access_token` from the response and use it in subsequent requests:

```bash
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Connecting Frontend to Backend

Update your frontend API calls to point to `http://localhost:8000/api/`

Example:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';

// Login
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: '9876543210',
    password: 'password123'
  })
});
```

## Troubleshooting

### Port already in use
If port 8000 is already in use, change the port:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### Module not found errors
Make sure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### CORS errors
Check that the frontend URL is included in the CORS origins in `main.py`:
```python
allow_origins=["http://localhost:5173", "http://localhost:3000"]
```

## Next Steps

1. ✅ Backend is running
2. 📝 Test API endpoints using Swagger UI
3. 🔗 Connect your React frontend
4. 💾 Integrate with a real database (PostgreSQL/MySQL)
5. 🚀 Deploy to production

For detailed API documentation, see `backend/README.md`

