import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import AppHeader from "./components/AppHeader";
import LazyWrapper from "./components/LazyWrapper";

const ProductListPage = lazy(() => import("./pages/ProductListPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader title="Ecom Store" />
        <main className="app-main">
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <LazyWrapper>
              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </LazyWrapper>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;