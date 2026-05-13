import mongoose from "mongoose";

const leaveBalanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    totalLeaves: {
      type: Number,
      default: 20,
    },

    usedLeaves: {
      type: Number,
      default: 0,
    },

    remainingLeaves: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

const LeaveBalance = mongoose.model(
  "LeaveBalance",
  leaveBalanceSchema
);

export default LeaveBalance;