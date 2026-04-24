import mongoose, { Schema, Document, Model } from "mongoose";
export interface IAddress {
  _id: mongoose.Types.ObjectId;
  label: string; 
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "seller" | "admin";
  addresses: IAddress[]; 
  createdAt: Date;
  updatedAt: Date;
}


const addressSchema = new Schema<IAddress>({
  label: { 
    type: String,
    required: true 
  },
  street: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  state: {
     type: String, 
     required: true
     },
  zipCode: {
     type: String,
      required: true 
    },
  country: { 
    type: String, 
    required: true 
  },
  isDefault: { 
    type: Boolean, 
    default: false 
  }
});

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer"
    },
    
    addresses: [addressSchema] 
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;