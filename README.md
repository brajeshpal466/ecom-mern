# 🛒 Full-Stack E-Commerce Application

A full-stack e-commerce web application where users can browse products, view details, add items to cart, and place orders.

---

## 🚀 Tech Stack

### Frontend

* React (Create React App)
* Redux Toolkit (state management)
* Material UI (UI components)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### DevOps

* Docker
* Docker Compose

---

## 🧠 Why These Tech Choices?

* **React** → Component-based architecture and fast UI development
* **Redux Toolkit** → Simplified and scalable state management
* **Node.js + Express** → Lightweight and fast backend
* **MongoDB** → Flexible schema for product/order data
* **Docker** → Easy setup and consistent environment

---

## ⚙️ Setup & Run Instructions

---

### 🐳 Run with Docker (Recommended)

```bash
docker-compose up --build
```

### Access:

* Frontend → http://localhost:3000
* Backend → http://localhost:5001

---

### 💻 Run Locally

#### 1️⃣ Backend

```bash
cd backend
npm install
npm start
```

Create `.env` file:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/ecom
CORS_ORIGIN=http://localhost:3000
```

---

#### 2️⃣ Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### Products

* GET `/api/products`
* GET `/api/products/:id`

### Orders

* POST `/api/orders`
* GET `/api/orders`

---

## ✨ Features

* Product Listing Page (PLP)
* Product Detail Page (PDP)
* Add to Cart
* Cart Management
* Place Order
* Orders History Page
* Search & Category Filter
* Responsive UI

---

## ⚠️ Assumptions

* Single user system (no authentication)
* No payment gateway (order placed directly)
* Product data is pre-seeded or manually added

---

## ⚠️ Limitations

* No user login/signup
* No payment integration
* No order status tracking
* Basic UI (focused on functionality)

---

## 📸 Screenshots

*Add screenshots here*

---

## 🎥 Demo Video

*Add Loom video link here*

---

## 📂 Project Structure

```bash
ecom-app
│
├── frontend
├── backend
├── docker-compose.yml
└── README.md
```

