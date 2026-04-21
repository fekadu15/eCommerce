import { Box, Typography, Paper, Avatar, Stack } from "@mui/material";
import Grid from '@mui/material/Grid';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
        p: 3
      }}
    >
      <Paper
        elevation={20}
        sx={{
          width: "100%",
          maxWidth: 900,
          minHeight: 580,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.05)"
        }}
      >
        <Grid container>
          <Grid
            size={{ xs: 0, md: 5 }}
            sx={{
              background: "linear-gradient(135deg, #163a70 0%, #2a5298 100%)",
              color: "white",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
              p: 5
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="900" letterSpacing={1}>
                ARCHITECT
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                The Architectural Curator
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" fontWeight="bold" mb={2} lineHeight={1.2}>
                Experience the art of curated living.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>
                Access our exclusive collections of modernist furniture and architectural masterpieces.
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar 
                  src="https://i.pravatar.cc/150?u=julian" 
                  sx={{ width: 40, height: 40, border: "2px solid rgba(255,255,255,0.3)" }} 
                />
                <Box>
                  <Typography variant="caption" fontWeight="bold" sx={{ display: "block" }}>
                    Fike Argeta
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6, fontSize: "0.7rem" }}>
                    Lead Curator
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "white",
              p: { xs: 3, md: 6 }
            }}
          >
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%" }}>
                {children}
              </Box>
            </Box>

            <Box sx={{ textAlign: "center", pt: 3 }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  bgcolor: "#fff5f2", 
                  color: "#a35233", 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 5, 
                  fontWeight: "800",
                  fontSize: "0.6rem",
                  letterSpacing: 0.5
                }}
              >
                ● LIMITED CURATOR ACCESS OPEN
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AuthLayout;