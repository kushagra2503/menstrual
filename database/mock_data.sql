-- Mock Data for Menstrual Health & Hygiene Platform

-- Insert Users (Sellers from rural India)
INSERT INTO users (name, phone, password, role, village, state, status) VALUES
('Anjali Devi', '9876543210', 'password123', 'seller', 'Khajuraho', 'Madhya Pradesh', 'active'),
('Maya Kumari', '9876543211', 'password123', 'seller', 'Ranchi', 'Jharkhand', 'active'),
('Priya Singh', '9876543212', 'password123', 'seller', 'Varanasi', 'Uttar Pradesh', 'active'),
('Lakshmi Bai', '9876543213', 'password123', 'seller', 'Mysore', 'Karnataka', 'active'),
('Radha Sharma', '9876543214', 'password123', 'seller', 'Jaipur', 'Rajasthan', 'active');

-- Insert Buyers
INSERT INTO users (name, phone, password, role, village, state, status) VALUES
('Neha Patel', '9876543220', 'password123', 'buyer', NULL, 'Maharashtra', 'active'),
('Ritu Malhotra', '9876543221', 'password123', 'buyer', NULL, 'Delhi', 'active'),
('Kavita Reddy', '9876543222', 'password123', 'buyer', NULL, 'Telangana', 'active'),
('Shreya Gupta', '9876543223', 'password123', 'buyer', NULL, 'Gujarat', 'active'),
('Divya Iyer', '9876543224', 'password123', 'buyer', NULL, 'Tamil Nadu', 'active');

-- Insert NGO Representatives
INSERT INTO users (name, phone, password, role, village, state, status) VALUES
('Dr. Sunita Menon', '9876543230', 'password123', 'ngo', NULL, 'Kerala', 'active'),
('Arjun Desai', '9876543231', 'password123', 'ngo', NULL, 'Maharashtra', 'active');

-- Insert Products
INSERT INTO products (name, description, price, category, stock_quantity, seller_id, image_url) VALUES
('Reusable Pad', 'Eco-friendly cloth pad, washable and reusable for up to 2 years', 130.00, 'reusable_pad', 100, 1, '/images/reusable-pad.png'),
('Menstrual Cup', 'Medical grade silicone menstrual cup, lasts up to 10 years', 300.00, 'menstrual_cup', 50, 1, '/images/menstrual-cup.png'),
('Period Underwear', 'Leak-proof period underwear, comfortable and washable', 250.00, 'period_underwear', 75, 2, '/images/period-underwear.png'),
('Oridet Underwear', 'Premium period underwear with extra absorbency', 250.00, 'period_underwear', 60, 2, '/images/oridet-underwear.png'),
('Cotton Reusable Pad - Small', 'Small size reusable pad for light flow', 100.00, 'reusable_pad', 120, 3, '/images/pad-small.png'),
('Cotton Reusable Pad - Medium', 'Medium size reusable pad for regular flow', 120.00, 'reusable_pad', 110, 3, '/images/pad-medium.png'),
('Cotton Reusable Pad - Large', 'Large size reusable pad for heavy flow', 150.00, 'reusable_pad', 90, 4, '/images/pad-large.png'),
('Menstrual Cup - Small', 'Small size menstrual cup for light flow', 280.00, 'menstrual_cup', 45, 4, '/images/cup-small.png'),
('Premium Period Underwear', 'Ultra-comfortable period underwear with organic cotton', 350.00, 'period_underwear', 55, 5, '/images/premium-underwear.png'),
('Starter Kit', 'Complete starter kit with 3 reusable pads', 350.00, 'other', 40, 5, '/images/starter-kit.png');

-- Insert Orders
INSERT INTO orders (order_number, buyer_id, seller_id, product_id, quantity, total_amount, customer_name, delivery_address, status, order_date) VALUES
('ORD001', 6, 1, 1, 50, 6500.00, 'Neha Patel', '123 Main St, Mumbai, Maharashtra', 'delivered', '2025-10-15 10:30:00'),
('ORD002', 6, 1, 2, 20, 6000.00, 'Neha Patel', '123 Main St, Mumbai, Maharashtra', 'delivered', '2025-10-20 14:20:00'),
('ORD003', 7, 2, 3, 30, 7500.00, 'Ritu Malhotra', '456 Park Ave, Delhi', 'delivered', '2025-10-25 09:15:00'),
('ORD004', 7, 2, 4, 15, 3750.00, 'Ritu Malhotra', '456 Park Ave, Delhi', 'delivered', '2025-11-01 11:45:00'),
('ORD005', 8, 3, 5, 25, 2500.00, 'Kavita Reddy', '789 Lake View, Hyderabad, Telangana', 'delivered', '2025-11-02 16:30:00'),
('ORD006', 8, 3, 6, 20, 2400.00, 'Kavita Reddy', '789 Lake View, Hyderabad, Telangana', 'shipped', '2025-11-03 10:00:00'),
('ORD007', 9, 4, 7, 18, 2700.00, 'Shreya Gupta', '321 Garden Rd, Ahmedabad, Gujarat', 'confirmed', '2025-11-04 13:20:00'),
('ORD008', 9, 4, 8, 12, 3360.00, 'Shreya Gupta', '321 Garden Rd, Ahmedabad, Gujarat', 'pending', '2025-11-05 15:10:00'),
('ORD009', 10, 5, 9, 10, 3500.00, 'Divya Iyer', '654 Beach Rd, Chennai, Tamil Nadu', 'pending', '2025-11-06 12:00:00'),
('ORD010', 6, 1, 1, 40, 5200.00, 'Neha Patel', '123 Main St, Mumbai, Maharashtra', 'pending', '2025-11-07 09:30:00');

-- Insert Transactions (Seller Earnings)
INSERT INTO transactions (order_id, seller_id, amount, commission, net_earning, transaction_date, status) VALUES
(1, 1, 6500.00, 650.00, 5850.00, '2025-10-15 10:30:00', 'completed'),
(2, 1, 6000.00, 600.00, 5400.00, '2025-10-20 14:20:00', 'completed'),
(3, 2, 7500.00, 750.00, 6750.00, '2025-10-25 09:15:00', 'completed'),
(4, 2, 3750.00, 375.00, 3375.00, '2025-11-01 11:45:00', 'completed'),
(5, 3, 2500.00, 250.00, 2250.00, '2025-11-02 16:30:00', 'completed'),
(6, 3, 2400.00, 240.00, 2160.00, '2025-11-03 10:00:00', 'pending'),
(7, 4, 2700.00, 270.00, 2430.00, '2025-11-04 13:20:00', 'pending'),
(8, 4, 3360.00, 336.00, 3024.00, '2025-11-05 15:10:00', 'pending'),
(9, 5, 3500.00, 350.00, 3150.00, '2025-11-06 12:00:00', 'pending'),
(10, 1, 5200.00, 520.00, 4680.00, '2025-11-07 09:30:00', 'pending');

-- Insert Courses
INSERT INTO courses (title, description, category, duration_hours) VALUES
('Reusable Pads Manufacturing', 'Learn how to manufacture high-quality reusable sanitary pads', 'Manufacturing', 20),
('Social Enterprise Basics', 'Discover how to create and manage businesses for menstrual health', 'Business', 15),
('Marketing Your Products', 'Learn effective marketing strategies for menstrual health products', 'Marketing', 10),
('Business Planning', 'Create a solid business plan for your social enterprise', 'Business', 12),
('Menstrual Hygiene Education', 'Learn best practices for changing sanitary pads during menstruation', 'Health', 8),
('Quality Control Standards', 'Ensure your products meet quality and safety standards', 'Manufacturing', 6);

-- Insert Course Enrollments
INSERT INTO course_enrollments (user_id, course_id, enrollment_date, completion_status, completion_date) VALUES
(1, 1, '2025-09-01 10:00:00', 'completed', '2025-09-15 18:00:00'),
(1, 2, '2025-09-16 10:00:00', 'completed', '2025-09-28 18:00:00'),
(2, 1, '2025-09-10 10:00:00', 'in_progress', NULL),
(2, 2, '2025-09-10 10:00:00', 'completed', '2025-09-30 18:00:00'),
(3, 3, '2025-10-01 10:00:00', 'completed', '2025-10-10 18:00:00'),
(3, 4, '2025-10-11 10:00:00', 'in_progress', NULL),
(4, 1, '2025-10-05 10:00:00', 'enrolled', NULL),
(5, 2, '2025-10-15 10:00:00', 'in_progress', NULL);

-- Insert Platform Metrics
INSERT INTO platform_metrics (metric_date, total_sellers, total_buyers, total_orders, total_revenue, active_sellers, products_sold) VALUES
('2025-10-15', 5, 5, 1, 6500.00, 1, 50),
('2025-10-20', 5, 5, 2, 12500.00, 1, 70),
('2025-10-25', 5, 5, 3, 20000.00, 2, 100),
('2025-11-01', 5, 5, 4, 23750.00, 2, 115),
('2025-11-02', 5, 5, 5, 26250.00, 3, 140),
('2025-11-03', 5, 5, 6, 28650.00, 3, 160),
('2025-11-04', 5, 5, 7, 31350.00, 4, 178),
('2025-11-05', 5, 5, 8, 34710.00, 4, 190),
('2025-11-06', 5, 5, 9, 38210.00, 5, 200),
('2025-11-07', 5, 5, 10, 43410.00, 5, 240);

