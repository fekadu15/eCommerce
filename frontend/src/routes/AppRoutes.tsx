import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart"; 
import Checkout from "../pages/orders/Checkout";
import OrderHistory from "../pages/orders/OrderHistory";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Box } from "@mui/material";

const AppRoutes = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<div>User Profile Page</div>} />
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/order/myorders" element={<OrderHistory/>} /> 
              <Route path="/order/checkout" element={<Checkout />} /> 
            </Route>

            
            <Route element={<ProtectedRoute allowedRoles={["seller", "admin"]} />}>
              <Route path="/seller/dashboard" element={<div>Seller Dashboard</div>} />
              <Route path="/product/create" element={<div>Add New Product</div>} />
            </Route>

           
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/users" element={<div>Admin User Management</div>} />
            </Route>
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AppRoutes;