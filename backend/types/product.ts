export interface Review {
  _id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  user: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
  reviews: Review[];
  image: string;
  seller: string;
}

export interface CreateReviewBody {
  rating: number;
  title: string;
  comment: string;
}

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