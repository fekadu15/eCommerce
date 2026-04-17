
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<div>User Profile Page</div>} />
        </Route>

       
        <Route element={<ProtectedRoute allowedRoles={["seller", "admin"]} />}>
          <Route path="/seller/dashboard" element={<div>Seller Dashboard</div>} />
          <Route path="/product/create" element={<div>Add New Product</div>} />
        </Route>

        
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/users" element={<div>Admin User Management</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;