import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

// Layout & Protected Route
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import SellerLayout from "../components/layout/SellerLayout"; 

// Public & Customer Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart"; 
import Checkout from "../pages/orders/Checkout";
import OrderHistory from "../pages/orders/OrderHistory";
import SuccessPage from "../pages/orders/SuccessPage";
import AccountPage from "../pages/Account";

// Seller Pages
import InventoryManagement from "../pages/seller/InventoryManagement";
import OrderManagement from "../pages/seller/OrderManagement";
import EditProduct from "../pages/seller/EditProduct";
import SellerDashboard from "../pages/seller/SellerDashboard";

const AppRoutes = () => {
  const location = useLocation();
  
  // This logic handles the "Context Switch"
  // When true: The main Navbar/Footer are removed so the SellerLayout can take over.
  const isSellerPortal = location.pathname.startsWith("/seller");

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Universal Navbar (Hidden for Sellers) */}
      {!isSellerPortal && <Navbar />}

      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* --- CUSTOMER PROTECTED ROUTES --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<AccountPage />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/order/myorders" element={<OrderHistory/>} /> 
            <Route path="/order/checkout" element={<Checkout />} /> 
            <Route path="/order/success" element={<SuccessPage />} />
          </Route>

          {/* --- SELLER PORTAL (Wrapped in SellerLayout) --- */}
          <Route element={<ProtectedRoute allowedRoles={["seller", "admin"]} />}>
            <Route element={<SellerLayout />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/inventory" element={<InventoryManagement />} />
              <Route path="/seller/inventory/:id" element={<InventoryManagement />} />
              <Route path="/seller/orders" element={<OrderManagement />} />
              <Route path="/seller/edit-product" element={<EditProduct />} />
              <Route path="/seller/edit-product/:id" element={<EditProduct />} /> 
            </Route>
          </Route>

          {/* --- ADMIN ONLY ROUTES --- */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/users" element={<div>Admin User Management</div>} />
          </Route>
        </Routes>
      </Box>

      {/* 2. Universal Footer (Hidden for Sellers) */}
      {!isSellerPortal && <Footer />}
    </Box>
  );
};

export default AppRoutes;