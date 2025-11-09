# Menstrual Health & Hygiene Marketplace - Backend API

FastAPI backend for the menstrual hygiene products marketplace platform connecting sellers, buyers, and NGOs.

## Features

- 🔐 **JWT Authentication** - Secure user authentication with token-based auth
- 👥 **Multi-Role Support** - Sellers, Buyers, and NGOs with role-based access
- 📦 **Product Management** - CRUD operations for menstrual hygiene products
- 🛒 **Order Processing** - Complete order lifecycle management
- 💰 **Transaction Tracking** - Financial transactions with platform fee calculation
- 📊 **Analytics Dashboard** - Platform metrics and seller performance (NGO access)
- 🔒 **Security** - Password hashing, JWT tokens, role-based permissions

## Tech Stack

- **FastAPI** - Modern, fast web framework
- **Pydantic** - Data validation using Python type annotations
- **JWT** - JSON Web Tokens for authentication
- **Passlib** - Password hashing with bcrypt
- **Uvicorn** - ASGI server

## Installation

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp env.example .env
```

Edit `.env` and update the `SECRET_KEY`:

```env
SECRET_KEY=your-super-secret-key-here
```

### 4. Run the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or using Python
python main.py
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Products

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/products` | Get all products | No | All |
| GET | `/api/products/{id}` | Get product by ID | No | All |
| POST | `/api/products` | Create new product | Yes | Seller |
| PUT | `/api/products/{id}` | Update product | Yes | Seller |
| DELETE | `/api/products/{id}` | Delete product | Yes | Seller |

### Orders

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/orders` | Get orders | Yes | All |
| GET | `/api/orders/{id}` | Get order by ID | Yes | All |
| POST | `/api/orders` | Create new order | Yes | Buyer |
| PATCH | `/api/orders/{id}/status` | Update order status | Yes | Seller |

### Transactions

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/transactions` | Get transactions | Yes | Seller, NGO |
| GET | `/api/transactions/earnings` | Get seller earnings | Yes | Seller |

### Analytics (NGO Only)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/analytics/platform-metrics` | Platform-wide metrics | Yes | NGO |
| GET | `/api/analytics/seller-performance` | Seller performance data | Yes | NGO |

## Request/Response Examples

### Register User

**Request:**
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "password": "password123",
    "name": "Radha Devi",
    "role": "seller",
    "village": "Bhopal",
    "state": "Madhya Pradesh"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "phone": "9876543210",
    "name": "Radha Devi",
    "role": "seller",
    "village": "Bhopal",
    "state": "Madhya Pradesh",
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### Login

**Request:**
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "password": "password123"
  }'
```

### Create Product (Seller)

**Request:**
```bash
curl -X POST "http://localhost:8000/api/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Eco-Friendly Reusable Pad",
    "category": "reusable_pad",
    "price": 150.0,
    "stock": 500,
    "description": "Washable and reusable cloth pad",
    "seller_id": 1
  }'
```

### Create Order (Buyer)

**Request:**
```bash
curl -X POST "http://localhost:8000/api/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "product_id": 1,
    "quantity": 50,
    "customer_name": "School ABC",
    "delivery_address": "123 Main St, Delhi",
    "buyer_id": 2,
    "seller_id": 1
  }'
```

### Get Platform Metrics (NGO)

**Request:**
```bash
curl -X GET "http://localhost:8000/api/analytics/platform-metrics" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "total_orders": 10,
  "total_revenue": 50000.0,
  "total_sellers": 5,
  "total_buyers": 8,
  "completed_orders": 7,
  "pending_orders": 3
}
```

## Demo Credentials

The system is pre-populated with demo users:

| Role | Phone | Password | Name |
|------|-------|----------|------|
| Seller | 9876543210 | password123 | Radha Devi |
| Buyer | 9876543220 | password123 | Asha Enterprises |
| NGO | 9876543230 | password123 | Women Empowerment NGO |

## User Roles & Permissions

### Seller
- Create, update, delete own products
- View own orders
- Update order status
- View own transactions and earnings

### Buyer
- View all products
- Create orders
- View own orders

### NGO
- View all orders
- View all transactions
- Access platform analytics
- View seller performance metrics

## Database Integration

Currently using in-memory storage. To integrate with a real database:

1. Install database driver (e.g., `pip install asyncpg` for PostgreSQL)
2. Create database models using SQLAlchemy or similar ORM
3. Replace the in-memory lists with database queries
4. Update the `DATABASE_URL` in `.env`

Example with SQLAlchemy:
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## Security Best Practices

1. **Change SECRET_KEY** - Use a strong, random secret key in production
2. **HTTPS** - Always use HTTPS in production
3. **Environment Variables** - Never commit `.env` file to version control
4. **Password Policy** - Implement strong password requirements
5. **Rate Limiting** - Add rate limiting to prevent abuse
6. **Input Validation** - Pydantic models handle validation automatically
7. **CORS** - Configure CORS origins properly for production

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Testing

```bash
# Install testing dependencies
pip install pytest httpx

# Run tests
pytest
```

## Deployment

### Using Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Using Gunicorn (Production)

```bash
pip install gunicorn

gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

