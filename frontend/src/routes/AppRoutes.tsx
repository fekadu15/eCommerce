import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";


import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";

import Cart from "../pages/Cart"; 
import Checkout from "../pages/orders/Checkout";
import OrderHistory from "../pages/orders/OrderHistory";
import SuccessPage from "../pages/orders/SuccessPage";
import AccountPage from "../pages/Account";

import InventoryManagement from "../pages/seller/InventoryManagement";
import OrderManagement from "../pages/seller/OrderManagement";
import EditProduct from "../pages/seller/EditProduct";
import SellerDashboard from "../pages/seller/SellerDashboard";

import SellerSidebar from "../components/layout/SellerSidebar";

const AppRoutes = () => {
  const location = useLocation();

 
  const isSellerPortal = location.pathname.startsWith("/seller");

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: isSellerPortal ? 'row' : 'column', 
        minHeight: '100vh',
        bgcolor: isSellerPortal ? "#f8f9fa" : "background.default" 
      }}
    >
     
      {isSellerPortal && <SellerSidebar />}

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
     
        {!isSellerPortal && <Navbar />}

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            width: "100%" 
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<AccountPage />} />
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/order/myorders" element={<OrderHistory/>} /> 
              <Route path="/order/checkout" element={<Checkout />} /> 
              <Route path="/order/success" element={<SuccessPage />} />
            </Route>

      
            <Route element={<ProtectedRoute allowedRoles={["seller", "admin"]} />}>
            <Route path="/seller/inventory" element={<InventoryManagement />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
             
              <Route path="/seller/orders" element={<OrderManagement />} />
              
              <Route path="/seller/edit-product" element={<EditProduct />} />
              <Route path="/seller/edit-product/:id" element={<EditProduct />} /> 
            </Route>

     
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/users" element={<div>Admin User Management</div>} />
            </Route>

          </Routes>
        </Box>

        {!isSellerPortal && <Footer />}
      </Box>
    </Box>
  );
};

export default AppRoutes;