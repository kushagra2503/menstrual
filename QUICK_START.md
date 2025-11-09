# 🚀 Quick Start Guide

## Start Backend (Choose One)

### macOS/Linux:
```bash
cd backend
./start.sh
```

### Windows:
```bash
cd backend
start.bat
```

### Manual:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Start Frontend

```bash
npm run dev
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Demo Login Credentials

| Role | Phone | Password |
|------|-------|----------|
| Seller | 9876543210 | password123 |
| Buyer | 9876543220 | password123 |
| NGO | 9876543230 | password123 |

## Test API (cURL)

```bash
# Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "password": "password123"}'

# Get Products
curl -X GET "http://localhost:8000/api/products"
```

## File Structure

```
menstrual/
├── backend/                    # FastAPI Backend
│   ├── main.py                # Main API file
│   ├── requirements.txt       # Python dependencies
│   ├── start.sh              # Unix startup script
│   └── start.bat             # Windows startup script
│
├── src/                       # React Frontend
│   ├── services/
│   │   └── api.js            # API integration service
│   └── components/           # React components
│
└── Documentation/
    ├── BACKEND_SETUP.md              # Backend setup guide
    ├── FRONTEND_API_INTEGRATION.md   # Integration examples
    ├── BACKEND_API_SUMMARY.md        # Complete API summary
    └── QUICK_START.md                # This file
```

## Next Steps

1. ✅ Start backend server
2. ✅ Start frontend dev server
3. 🔐 Login with demo credentials
4. 🧪 Test all features
5. 📝 Integrate API in components (see FRONTEND_API_INTEGRATION.md)
6. 🚀 Deploy to production

## Need Help?

- **API Documentation**: http://localhost:8000/docs
- **Backend Details**: See `BACKEND_API_SUMMARY.md`
- **Integration Guide**: See `FRONTEND_API_INTEGRATION.md`
- **Setup Issues**: See `BACKEND_SETUP.md`

---

**Happy Coding! 🎉**

