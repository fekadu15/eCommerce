import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import SellerHeader from "./SellerHeader";

const SellerLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: "#f8f9fa" }}>
     
      <SellerSidebar />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <SellerHeader />
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         
          <Outlet /> 
        </Box>
      </Box>
    </Box>
  );
};

export default SellerLayout;