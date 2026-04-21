import { Box, Pagination } from "@mui/material";

const PaginationBar = () => {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Pagination count={5} shape="rounded" color="primary" />
    </Box>
  );
};

export default PaginationBar;