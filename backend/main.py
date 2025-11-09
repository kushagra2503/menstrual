from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Menstrual Health & Hygiene Marketplace API",
    description="API for connecting sellers, buyers, and NGOs in menstrual hygiene products marketplace",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# ==================== Models ====================

class UserBase(BaseModel):
    phone: str
    name: str
    role: str  # seller, buyer, ngo
    village: Optional[str] = None
    state: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    phone: str
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class ProductBase(BaseModel):
    name: str
    category: str  # reusable_pad, menstrual_cup, period_underwear
    price: float
    stock: int
    description: Optional[str] = None

class ProductCreate(ProductBase):
    seller_id: int

class ProductResponse(ProductBase):
    id: int
    seller_id: int
    seller_name: str
    created_at: datetime

class OrderBase(BaseModel):
    product_id: int
    quantity: int
    customer_name: str
    delivery_address: str

class OrderCreate(OrderBase):
    buyer_id: int
    seller_id: int

class OrderResponse(OrderBase):
    id: int
    order_number: str
    buyer_id: int
    seller_id: int
    product_name: str
    buyer_name: str
    seller_name: str
    total_amount: float
    status: str  # pending, confirmed, shipped, delivered
    order_date: datetime

class OrderStatusUpdate(BaseModel):
    status: str

class TransactionBase(BaseModel):
    order_id: int
    amount: float
    platform_fee: float
    net_earning: float

class TransactionResponse(TransactionBase):
    id: int
    seller_id: int
    seller_name: str
    status: str  # pending, completed, failed
    created_at: datetime

class PlatformMetrics(BaseModel):
    total_orders: int
    total_revenue: float
    total_sellers: int
    total_buyers: int
    completed_orders: int
    pending_orders: int

# ==================== Mock Database (Replace with actual DB) ====================

# In-memory storage (replace with actual database)
users_db = []
products_db = []
orders_db = []
transactions_db = []

# Initialize with demo data
def init_demo_data():
    # Demo users
    demo_users = [
        {"id": 1, "phone": "9876543210", "password": pwd_context.hash("password123"), "name": "Radha Devi", "role": "seller", "village": "Bhopal", "state": "Madhya Pradesh", "created_at": datetime.now()},
        {"id": 2, "phone": "9876543220", "password": pwd_context.hash("password123"), "name": "Asha Enterprises", "role": "buyer", "village": "Delhi", "state": "Delhi", "created_at": datetime.now()},
        {"id": 3, "phone": "9876543230", "password": pwd_context.hash("password123"), "name": "Women Empowerment NGO", "role": "ngo", "village": "Mumbai", "state": "Maharashtra", "created_at": datetime.now()},
    ]
    users_db.extend(demo_users)
    
    # Demo products
    demo_products = [
        {"id": 1, "name": "Eco-Friendly Reusable Pad", "category": "reusable_pad", "price": 150.0, "stock": 500, "seller_id": 1, "seller_name": "Radha Devi", "description": "Washable and reusable cloth pad", "created_at": datetime.now()},
        {"id": 2, "name": "Medical Grade Menstrual Cup", "category": "menstrual_cup", "price": 350.0, "stock": 200, "seller_id": 1, "seller_name": "Radha Devi", "description": "Safe and eco-friendly menstrual cup", "created_at": datetime.now()},
        {"id": 3, "name": "Organic Period Underwear", "category": "period_underwear", "price": 450.0, "stock": 150, "seller_id": 1, "seller_name": "Radha Devi", "description": "Comfortable period underwear", "created_at": datetime.now()},
    ]
    products_db.extend(demo_products)

init_demo_data()

# ==================== Helper Functions ====================

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_token(token)
    phone = payload.get("sub")
    if phone is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user = next((u for u in users_db if u["phone"] == phone), None)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ==================== Authentication Endpoints ====================

@app.post("/api/auth/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    """Register a new user (seller, buyer, or NGO)"""
    # Check if user already exists
    if any(u["phone"] == user.phone for u in users_db):
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create new user
    new_user = {
        "id": len(users_db) + 1,
        "phone": user.phone,
        "password": get_password_hash(user.password),
        "name": user.name,
        "role": user.role,
        "village": user.village,
        "state": user.state,
        "created_at": datetime.now()
    }
    users_db.append(new_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user.phone})
    
    user_response = UserResponse(
        id=new_user["id"],
        phone=new_user["phone"],
        name=new_user["name"],
        role=new_user["role"],
        village=new_user["village"],
        state=new_user["state"],
        created_at=new_user["created_at"]
    )
    
    return Token(access_token=access_token, token_type="bearer", user=user_response)

@app.post("/api/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login user and return access token"""
    user = next((u for u in users_db if u["phone"] == credentials.phone), None)
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid phone number or password")
    
    access_token = create_access_token(data={"sub": user["phone"]})
    
    user_response = UserResponse(
        id=user["id"],
        phone=user["phone"],
        name=user["name"],
        role=user["role"],
        village=user["village"],
        state=user["state"],
        created_at=user["created_at"]
    )
    
    return Token(access_token=access_token, token_type="bearer", user=user_response)

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current logged-in user information"""
    return UserResponse(
        id=current_user["id"],
        phone=current_user["phone"],
        name=current_user["name"],
        role=current_user["role"],
        village=current_user["village"],
        state=current_user["state"],
        created_at=current_user["created_at"]
    )

# ==================== Product Endpoints ====================

@app.get("/api/products", response_model=List[ProductResponse])
async def get_products(seller_id: Optional[int] = None):
    """Get all products or filter by seller"""
    if seller_id:
        filtered_products = [p for p in products_db if p["seller_id"] == seller_id]
        return filtered_products
    return products_db

@app.get("/api/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int):
    """Get a specific product by ID"""
    product = next((p for p in products_db if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/api/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate, current_user: dict = Depends(get_current_user)):
    """Create a new product (seller only)"""
    if current_user["role"] != "seller":
        raise HTTPException(status_code=403, detail="Only sellers can create products")
    
    new_product = {
        "id": len(products_db) + 1,
        "name": product.name,
        "category": product.category,
        "price": product.price,
        "stock": product.stock,
        "description": product.description,
        "seller_id": current_user["id"],
        "seller_name": current_user["name"],
        "created_at": datetime.now()
    }
    products_db.append(new_product)
    return new_product

@app.put("/api/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product: ProductBase, current_user: dict = Depends(get_current_user)):
    """Update a product (seller only, own products)"""
    existing_product = next((p for p in products_db if p["id"] == product_id), None)
    
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if existing_product["seller_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="You can only update your own products")
    
    existing_product.update({
        "name": product.name,
        "category": product.category,
        "price": product.price,
        "stock": product.stock,
        "description": product.description
    })
    
    return existing_product

@app.delete("/api/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: int, current_user: dict = Depends(get_current_user)):
    """Delete a product (seller only, own products)"""
    product_index = next((i for i, p in enumerate(products_db) if p["id"] == product_id), None)
    
    if product_index is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if products_db[product_index]["seller_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="You can only delete your own products")
    
    products_db.pop(product_index)
    return None

# ==================== Order Endpoints ====================

@app.get("/api/orders", response_model=List[OrderResponse])
async def get_orders(current_user: dict = Depends(get_current_user)):
    """Get orders based on user role"""
    if current_user["role"] == "seller":
        filtered_orders = [o for o in orders_db if o["seller_id"] == current_user["id"]]
    elif current_user["role"] == "buyer":
        filtered_orders = [o for o in orders_db if o["buyer_id"] == current_user["id"]]
    elif current_user["role"] == "ngo":
        filtered_orders = orders_db  # NGO can see all orders
    else:
        filtered_orders = []
    
    return filtered_orders

@app.get("/api/orders/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, current_user: dict = Depends(get_current_user)):
    """Get a specific order"""
    order = next((o for o in orders_db if o["id"] == order_id), None)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Check permissions
    if current_user["role"] != "ngo" and order["buyer_id"] != current_user["id"] and order["seller_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="You don't have permission to view this order")
    
    return order

@app.post("/api/orders", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(order: OrderCreate, current_user: dict = Depends(get_current_user)):
    """Create a new order (buyer only)"""
    if current_user["role"] != "buyer":
        raise HTTPException(status_code=403, detail="Only buyers can create orders")
    
    # Get product details
    product = next((p for p in products_db if p["id"] == order.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check stock
    if product["stock"] < order.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")
    
    # Get seller details
    seller = next((u for u in users_db if u["id"] == order.seller_id), None)
    
    # Calculate total
    total_amount = product["price"] * order.quantity
    
    # Create order
    new_order = {
        "id": len(orders_db) + 1,
        "order_number": f"ORD{len(orders_db) + 1:05d}",
        "product_id": order.product_id,
        "product_name": product["name"],
        "quantity": order.quantity,
        "customer_name": order.customer_name,
        "delivery_address": order.delivery_address,
        "buyer_id": current_user["id"],
        "buyer_name": current_user["name"],
        "seller_id": order.seller_id,
        "seller_name": seller["name"],
        "total_amount": total_amount,
        "status": "pending",
        "order_date": datetime.now()
    }
    orders_db.append(new_order)
    
    # Update product stock
    product["stock"] -= order.quantity
    
    # Create transaction
    platform_fee = total_amount * 0.1  # 10% platform fee
    net_earning = total_amount - platform_fee
    
    new_transaction = {
        "id": len(transactions_db) + 1,
        "order_id": new_order["id"],
        "seller_id": order.seller_id,
        "seller_name": seller["name"],
        "amount": total_amount,
        "platform_fee": platform_fee,
        "net_earning": net_earning,
        "status": "pending",
        "created_at": datetime.now()
    }
    transactions_db.append(new_transaction)
    
    return new_order

@app.patch("/api/orders/{order_id}/status", response_model=OrderResponse)
async def update_order_status(order_id: int, status_update: OrderStatusUpdate, current_user: dict = Depends(get_current_user)):
    """Update order status (seller only)"""
    order = next((o for o in orders_db if o["id"] == order_id), None)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if current_user["role"] != "seller" or order["seller_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Only the seller can update order status")
    
    order["status"] = status_update.status
    
    # Update transaction status if order is delivered
    if status_update.status == "delivered":
        transaction = next((t for t in transactions_db if t["order_id"] == order_id), None)
        if transaction:
            transaction["status"] = "completed"
    
    return order

# ==================== Transaction Endpoints ====================

@app.get("/api/transactions", response_model=List[TransactionResponse])
async def get_transactions(current_user: dict = Depends(get_current_user)):
    """Get transactions based on user role"""
    if current_user["role"] == "seller":
        filtered_transactions = [t for t in transactions_db if t["seller_id"] == current_user["id"]]
    elif current_user["role"] == "ngo":
        filtered_transactions = transactions_db  # NGO can see all transactions
    else:
        raise HTTPException(status_code=403, detail="Only sellers and NGOs can view transactions")
    
    return filtered_transactions

@app.get("/api/transactions/earnings", response_model=dict)
async def get_earnings(current_user: dict = Depends(get_current_user)):
    """Get total earnings for seller"""
    if current_user["role"] != "seller":
        raise HTTPException(status_code=403, detail="Only sellers can view earnings")
    
    seller_transactions = [t for t in transactions_db if t["seller_id"] == current_user["id"] and t["status"] == "completed"]
    total_earnings = sum(t["net_earning"] for t in seller_transactions)
    
    return {
        "total_earnings": total_earnings,
        "total_transactions": len(seller_transactions),
        "transactions": seller_transactions
    }

# ==================== Analytics Endpoints (NGO) ====================

@app.get("/api/analytics/platform-metrics", response_model=PlatformMetrics)
async def get_platform_metrics(current_user: dict = Depends(get_current_user)):
    """Get platform-wide metrics (NGO only)"""
    if current_user["role"] != "ngo":
        raise HTTPException(status_code=403, detail="Only NGOs can view platform metrics")
    
    total_orders = len(orders_db)
    total_revenue = sum(o["total_amount"] for o in orders_db)
    total_sellers = len([u for u in users_db if u["role"] == "seller"])
    total_buyers = len([u for u in users_db if u["role"] == "buyer"])
    completed_orders = len([o for o in orders_db if o["status"] == "delivered"])
    pending_orders = len([o for o in orders_db if o["status"] == "pending"])
    
    return PlatformMetrics(
        total_orders=total_orders,
        total_revenue=total_revenue,
        total_sellers=total_sellers,
        total_buyers=total_buyers,
        completed_orders=completed_orders,
        pending_orders=pending_orders
    )

@app.get("/api/analytics/seller-performance", response_model=List[dict])
async def get_seller_performance(current_user: dict = Depends(get_current_user)):
    """Get seller performance analytics (NGO only)"""
    if current_user["role"] != "ngo":
        raise HTTPException(status_code=403, detail="Only NGOs can view seller performance")
    
    sellers = [u for u in users_db if u["role"] == "seller"]
    performance = []
    
    for seller in sellers:
        seller_orders = [o for o in orders_db if o["seller_id"] == seller["id"]]
        seller_transactions = [t for t in transactions_db if t["seller_id"] == seller["id"] and t["status"] == "completed"]
        
        performance.append({
            "seller_id": seller["id"],
            "seller_name": seller["name"],
            "village": seller["village"],
            "state": seller["state"],
            "total_orders": len(seller_orders),
            "total_earnings": sum(t["net_earning"] for t in seller_transactions),
            "avg_order_value": sum(t["net_earning"] for t in seller_transactions) / len(seller_transactions) if seller_transactions else 0
        })
    
    return performance

# ==================== Health Check ====================

@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "Menstrual Health & Hygiene Marketplace API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

