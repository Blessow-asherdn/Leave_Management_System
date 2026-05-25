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

    if (password.length < 8) {
      throw new Error(
        "Password must contain at least 8 characters"
      );
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error(
        "At least one uppercase letter is required"
      );
    }

    if (!/[a-z]/.test(password)) {
      throw new Error(
        "At least one lowercase letter is required"
      );
    }

    if (!/[0-9]/.test(password)) {
      throw new Error(
        "At least one number is required"
      );
    }

    if (
      !/[@$!%*?&]/.test(password)
    ) {
      throw new Error(
        "At least one special character is required"
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

        sickLeave: {
          total: 10,
          used: 0,
          remaining: 10,
        },

        casualLeave: {
          total: 5,
          used: 0,
          remaining: 5,
        },

        paidLeave: {
          total: 12,
          used: 0,
          remaining: 12,
        },

        compOff: {
          total: 0,
          used: 0,
          remaining: 0,
        },
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