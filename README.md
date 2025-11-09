# Menstrual Health & Hygiene Platform

A platform connecting rural women sellers with buyers for menstrual health products, monitored by NGOs.

## Features

### 👩‍🌾 Seller Dashboard
- **Product Catalog**: View and manage menstrual health products (reusable pads, menstrual cups, period underwear)
- **My Earnings**: Track total earnings and view transaction history
- **Orders Management**: View all orders with status tracking
- Beautiful UI with product illustrations

### 🛒 Buyer Dashboard
- **Browse Products**: View all available menstrual health products
- **Place Orders**: Easy order placement with quantity selection
- **Order Summary**: Real-time calculation of order totals
- Simple and intuitive interface

### 🏢 NGO Dashboard
- **Analytics Dashboard**: Comprehensive platform metrics
  - Total orders, revenue, active sellers, buyers
  - Completed and pending orders tracking
- **All Orders View**: Monitor all orders across the platform
- **Seller Analytics**: Track individual seller performance
  - Total earnings per seller
  - Order counts and average order values
  - Location-based seller information

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: CSS3 with modern gradients and animations
- **Database**: SQL (schema and mock data provided)

## Project Structure

```
menstrual/
├── database/
│   ├── schema.sql          # Database schema with all tables
│   └── mock_data.sql       # Sample data for demo
├── src/
│   ├── components/
│   │   ├── Login.jsx       # Login component
│   │   ├── SellerDashboard.jsx
│   │   ├── BuyerDashboard.jsx
│   │   └── NGODashboard.jsx
│   ├── data/
│   │   └── mockData.js     # Frontend mock data
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Database Schema

### Tables
1. **users** - Stores sellers, buyers, and NGO representatives
2. **products** - Product catalog with pricing and stock
3. **orders** - Order tracking with status
4. **transactions** - Seller earnings and commission tracking
5. **courses** - Skill building courses
6. **course_enrollments** - Track user course progress
7. **platform_metrics** - Overall platform analytics

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database (Optional)
If you want to connect to a real database:
```bash
# Import the schema
mysql -u your_username -p your_database < database/schema.sql

# Import mock data
mysql -u your_username -p your_database < database/mock_data.sql
```

### 3. Run Development Server
```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Demo Credentials

### Seller Login
- **Phone**: 9876543210
- **Password**: password123
- **User**: Anjali Devi (Khajuraho, Madhya Pradesh)

### Buyer Login
- **Phone**: 9876543220
- **Password**: password123
- **User**: Neha Patel (Maharashtra)

### NGO Login
- **Phone**: 9876543230
- **Password**: password123
- **User**: Dr. Sunita Menon (Kerala)

## Features Demonstration

### Seller View
1. Login with seller credentials
2. View product catalog with prices and stock
3. Check earnings dashboard with transaction history
4. Monitor orders and their status

### Buyer View
1. Login with buyer credentials
2. Browse available products
3. Place orders with custom quantities
4. Fill delivery information

### NGO View
1. Login with NGO credentials
2. View comprehensive dashboard with key metrics
3. Monitor all orders across platform
4. Analyze seller performance and earnings

## Mock Data Summary

- **5 Sellers** from different states in India
- **5 Buyers** from various locations
- **10 Products** across categories (reusable pads, menstrual cups, underwear)
- **10 Orders** with different statuses
- **10 Transactions** tracking seller earnings
- **6 Skill-building Courses**

## Color Palette

- **Primary**: #FF9A7B (Coral/Peach)
- **Secondary**: #FF7B5F (Deep Coral)
- **Background**: #FFE5E0 (Light Peach)
- **Success**: #4CAF50
- **Info**: #2196F3
- **Warning**: #FFC107
- **Text**: #2C2C2C

## Future Enhancements

- Real-time order tracking
- Payment integration
- SMS notifications for sellers
- Mobile app version
- Multi-language support (Hindi, Tamil, etc.)
- Course completion certificates
- Seller rating system
- Inventory management tools
- Analytics export for NGOs

## Impact

This platform empowers rural women in India by:
- Providing economic opportunities
- Promoting menstrual hygiene awareness
- Offering skill-building resources
- Creating sustainable livelihoods
- Supporting social enterprises

## License

MIT License - Feel free to use this project for social good!

## Support

For questions or support, please contact the NGO representatives through the platform.

