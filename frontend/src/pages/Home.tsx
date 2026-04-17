
import { Container, Typography, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Container>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Store
        </Typography>
        {user ? (
          <Typography variant="h5" color="textSecondary">
            Happy shopping, {user.name}!
          </Typography>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Please login to start adding items to your cart.
            </Typography>
            <Button variant="contained" component={Link} to="/login" sx={{ mt: 2 }}>
              Go to Login
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;