import bcrypt from "bcryptjs";

import User from "../models/users.js";

import LeaveBalance from "../models/LeaveBalance.js";

export const createUserService =
  async (userData) => {
    const {
      name,
      email,
      password,
      role,
    } = userData;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      leaveBalance:
        role === "employee"
          ? 20
          : 0,
      isActive: true,
    });

    if (role === "employee") {
      const currentYear =
        new Date().getFullYear();

      await LeaveBalance.create({
        employee: user._id,
        year: currentYear,
        totalLeaves: 20,
        usedLeaves: 0,
        remainingLeaves: 20,
      });
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      leaveBalance:
        user.leaveBalance,
      isActive: user.isActive,
    };
  };

export const getAllUsersService =
  async () => {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return users;
  };

export const updateUserService =
  async (
    userId,
    updateData
  ) => {
    const user =
      await User.findByIdAndUpdate(
        userId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    return user;
  };

export const toggleUserStatusService =
  async (userId) => {
    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    user.isActive =
      !user.isActive;

    await user.save();

    return user;
  };