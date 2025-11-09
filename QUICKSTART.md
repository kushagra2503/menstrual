# Quick Start Guide

## 🚀 Get Started in 2 Steps

### 1. Install Dependencies (Already Done!)
```bash
npm install
```

### 2. Run the Application
```bash
npm run dev
```

The app will open at: **http://localhost:3000**

## 🔐 Login Credentials

### Try as a Seller 👩‍🌾
```
Phone: 9876543210
Password: password123
```
**What you'll see:**
- Product catalog (Reusable Pads, Menstrual Cups, Period Underwear)
- Your earnings dashboard
- Order management

### Try as a Buyer 🛒
```
Phone: 9876543220
Password: password123
```
**What you'll see:**
- Browse all products
- Place orders with quantities
- Order summary

### Try as NGO 🏢
```
Phone: 9876543230
Password: password123
```
**What you'll see:**
- Complete analytics dashboard
- All orders monitoring
- Seller performance tracking

## 📊 Database Setup (Optional)

If you want to use a real MySQL database:

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE menstrual_platform"

# Import schema
mysql -u root -p menstrual_platform < database/schema.sql

# Import mock data
mysql -u root -p menstrual_platform < database/mock_data.sql
```

The app currently works with mock data in `src/data/mockData.js`

## 🎨 Features to Explore

### Seller Features:
- ✅ View product catalog with pricing
- ✅ Track total earnings (₹15,000+ in demo)
- ✅ See transaction history
- ✅ Monitor order statuses

### Buyer Features:
- ✅ Browse 10+ products
- ✅ Place orders with custom quantities
- ✅ Auto-calculate order totals
- ✅ Order success notifications

### NGO Features:
- ✅ Platform-wide metrics
- ✅ All orders dashboard
- ✅ Seller analytics
- ✅ Revenue tracking

## 🎯 Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning fast build tool
- **React Router v6** - Navigation
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with gradients

## 📱 Mobile Responsive

The UI is optimized for mobile devices (matches the iPhone mockups in your reference images)

## 🤝 Need Help?

Check `README.md` for detailed documentation!

