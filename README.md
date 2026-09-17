# NEXORA FINAL COMPLETE E-COMMERCE

## Stack
React + Vite + React Router + Node.js + Express + MongoDB + Mongoose

## Included
- Home, category, product and separate detail pages
- Search and category filtering
- Real product photography URLs
- Wishlist with browser persistence
- Multi-item cart with quantity controls and persistence
- Signup/login with bcrypt password hashing + JWT
- Account page + logout
- Checkout with address, phone and payment-method selection
- MongoDB order creation
- Order success screen
- My Orders loaded from MongoDB
- Black/red/white/gold premium theme
- Responsive UI
- Empty/loading states
- API health endpoint
- Product seed script

## MongoDB setup
Start MongoDB locally:
mongodb://127.0.0.1:27017

## Backend
```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```
PowerShell:
```powershell
Copy-Item .env.example .env
```

## Frontend
Open a second terminal in the project root:
```bash
npm install
npm run dev
```

Backend API: http://localhost:5000
Health check: http://localhost:5000/api/health

## MongoDB collections
users
products
orders

## Important
Payment methods in this academic/demo project are UI selections; no real money is charged. For production payments, connect a payment gateway such as Razorpay/Stripe and add server-side webhook verification. Product image URLs are demo/licensed-source placeholders; replace them with images you have rights to use.
