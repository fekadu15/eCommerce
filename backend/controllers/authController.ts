import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { RegisterBody, LoginBody } from "../types/auth";

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction
) => {

  try {
    
    const { name, email, password } = req.body;

    const emailRegex =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    if (!name || !password || !email) {
      return res
        .status(400).json({ message: "Please provide all required fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400).json({ message: "User already exists try log in" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  
  
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "has no an account create one" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      addresses: user.addresses || [],
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    next(error);
  }
};
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id.toString()),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const addUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(req.body);
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const removeUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.id
    );

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.find(
      (addr) => addr._id.toString() === req.params.id
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (req.body.isDefault) {
      user.addresses.forEach((a) => {
        a.isDefault = false;
      });
    }

    Object.assign(address, req.body);

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};