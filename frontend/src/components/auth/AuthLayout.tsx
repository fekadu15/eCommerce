import { Box, Typography, Paper, Avatar, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh", 
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
        p: 2 
      }}
    >
      <Paper
        elevation={12} 
        sx={{
          width: "100%",
          maxWidth: 620, 
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.05)",
          
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
              p: 2
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="700" letterSpacing={0.4}>
                ARCHITECT
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: "0.65rem" }}>
                The Architectural Curator
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight="600" mb={1} lineHeight={1.3}>
                Experience the art of curated living.
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, mb: 1.5, display: "block" }}>
                Access our exclusive collections of modernist furniture and architectural masterpieces.
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src="https://i.pravatar.cc/150?u=julian"
                  sx={{
                    width: 28,
                    height: 28,
                    border: "2px solid rgba(255,255,255,0.3)"
                  }}
                />
                <Box>
                  <Typography variant="caption" fontWeight="600" sx={{ display: "block" }}>
                    Fike Argeta
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6, fontSize: "0.6rem" }}>
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
              p: { xs: 2, md: 3 } 
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%" }}>
                {children}
              </Box>
            </Box>

            <Box sx={{ textAlign: "center", pt: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "#fff5f2",
                  color: "#a35233",
                  px: 1,
                  py: 0.3,
                  borderRadius: 5,
                  fontWeight: "600",
                  fontSize: "0.5rem",
                  letterSpacing: 0.3
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