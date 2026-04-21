import { Box, Typography, Stack, Container, Divider, IconButton } from "@mui/material";
import { Instagram, Twitter, Facebook, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "white",
        pt: 10,
        pb: 6,
        borderTop: "1px solid #eee",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={6}
        >
          {/* Brand Section */}
          <Box sx={{ maxWidth: "300px" }}>
            <Typography
              variant="h5"
              fontWeight="900"
              sx={{ letterSpacing: -1.5, textTransform: "uppercase", mb: 2 }}
            >
              Curator
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              A strictly curated collection of modern objects. We prioritize 
              craftsmanship, utility, and the lasting beauty of essential forms.
            </Typography>
          </Box>

          {/* Links Section */}
          <Stack direction="row" spacing={{ xs: 4, sm: 10 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight="900">COLLECTION</Typography>
              <Typography variant="body2" sx={footerLink} onClick={() => navigate("/")}>All Objects</Typography>
              <Typography variant="body2" sx={footerLink} onClick={() => navigate("/products?cat=new")}>New Arrivals</Typography>
              <Typography variant="body2" sx={footerLink} onClick={() => navigate("/products?cat=limited")}>Limited Edition</Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight="900">COMPANY</Typography>
              <Typography variant="body2" sx={footerLink} onClick={() => navigate("/about")}>Our Story</Typography>
              <Typography variant="body2" sx={footerLink} onClick={() => navigate("/journal")}>Journal</Typography>
              <Typography variant="body2" sx={footerLink} onClick={() => navigate("/contact")}>Contact</Typography>
            </Stack>
          </Stack>

          {/* Social Section */}
          <Stack spacing={2}>
            <Typography variant="subtitle2" fontWeight="900">FOLLOW US</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: "black" }}><Instagram fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "black" }}><Twitter fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "black" }}><Facebook fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "black" }}><LinkedIn fontSize="small" /></IconButton>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 6 }} />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} CURATOR. ALL RIGHTS RESERVED.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" color="text.secondary" sx={footerLink}>Privacy Policy</Typography>
            <Typography variant="caption" color="text.secondary" sx={footerLink}>Terms of Service</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

const footerLink = {
  cursor: "pointer",
  color: "text.secondary",
  transition: "0.2s",
  "&:hover": { color: "black" },
};

export default Footer;