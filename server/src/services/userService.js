import bcrypt from "bcryptjs";
import User from "../models/users.js";

export const createUserService = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");

  return users;
};

export const updateUserService = async (
  userId,
  updateData
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deactivateUserService = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      isActive: false,
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};