import { Box, CircularProgress, Typography, Stack } from "@mui/material";

interface Props {
  message?: string;
  minHeight?: string | number;
}

const Loading = ({ message = "Loading...", minHeight = "80vh" }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <Stack alignItems="center" spacing={2}>
        <CircularProgress size={40} thickness={4} sx={{ color: "#0052cc" }} />
        <Typography variant="body2" color="text.secondary" fontWeight="medium">
          {message}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Loading;