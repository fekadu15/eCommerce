import { Box, Typography, Stack, Avatar } from "@mui/material";

interface ItemProps {
  name: string;
  qty: number;
  variant: string;
  image: string;
}

const OrderProductItem = ({ name, qty, variant, image }: ItemProps) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ bgcolor: "#f8fafc", p: 1, borderRadius: 2, width: "fit-content" }}>
    <Avatar variant="rounded" src={image} sx={{ width: 40, height: 40, borderRadius: 1.5 }} />
    <Box>
      <Typography variant="caption" fontWeight="900" display="block" sx={{ lineHeight: 1.1 }}>{name}</Typography>
      <Typography variant="caption" color="text.secondary" fontWeight="700">
        Qty: {qty} • {variant}
      </Typography>
    </Box>
  </Stack>
);

export default OrderProductItem;