import type { ReactNode } from "react";
import { Box, Container } from "@mui/material";


interface Props {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

const ProductLayout = ({ children, maxWidth = "lg" }: Props) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth={maxWidth} sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>

    </Box>
  );
};

export default ProductLayout;