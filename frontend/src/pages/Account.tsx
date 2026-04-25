import { Container, Box, Typography } from "@mui/material";
import AccountSidebar from "../components/account/AccountSidebar";
import RecentOrders from "../components/account/RecentOrders";
import ProfileSettings from "../components/account/ProfileSettings";
import AddressBook from "../components/account/AddressBook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMyOrders } from "../features/order/orderSlice";
import type { AppDispatch } from "../app/store";
import Grid from "@mui/material/Grid2";

const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
       
        <Grid size={{ xs: 12, md: 2.5 }}>
          <AccountSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 6.5 }}>
          <Box mb={6}>
            <Typography variant="h3" fontWeight="900" gutterBottom>My Account</Typography>
            <Typography color="text.secondary">
              Manage your curation, orders, and architectural preferences.
            </Typography>
          </Box>

          <RecentOrders />

          <Box mt={6}>
             <AddressBook/>
          </Box>
        </Grid>

     
        <Grid size={{ xs: 12, md: 3 }}>
          <ProfileSettings />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountPage;