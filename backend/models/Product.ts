import mongoose, { Schema, Document, Model } from "mongoose";

interface IReview {
  _id: mongoose.Types.ObjectId;
  name: string;
  rating: number;
  title: string;   
  comment: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date; 
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;      
  rating: number;
  numReviews: number;
  reviews: IReview[]; 
  image: string;
  seller: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true }, 
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true } 
);

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, unique: true, sparse: true }, 
    category: { type: String, required: true, default: "Uncategorized" }, 
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { 
      type: String, 
      default: "https://via.placeholder.com/150" 
    },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema], 
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;