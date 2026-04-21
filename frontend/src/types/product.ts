export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface Review {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number; 
  image: string; 
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  category?: string;
  reviews: Review[]; 
  rating: number;
  numReviews: number;
  createdAt: string;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}