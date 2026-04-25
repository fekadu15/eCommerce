import Grid from "@mui/material/Grid2";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <Grid container spacing={3} alignItems="stretch">
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;