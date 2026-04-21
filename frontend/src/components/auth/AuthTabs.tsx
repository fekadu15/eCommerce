import { Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const AuthTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const value = location.pathname.includes("register") ? 1 : 0;

  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => {
        navigate(newValue === 0 ? "/login" : "/register");
      }}
      sx={{ mb: 2 }}
    >
      <Tab label="Sign In" />
      <Tab label="Register" />
    </Tabs>
  );
};

export default AuthTabs;