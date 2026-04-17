export interface CreateProductBody {
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

export interface UpdateProductBody {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
}