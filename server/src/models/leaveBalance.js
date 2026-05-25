import mongoose from "mongoose";

const leaveCategorySchema =
  new mongoose.Schema(
    {
      total: {
        type: Number,
        default: 0,
      },

      used: {
        type: Number,
        default: 0,
      },

      remaining: {
        type: Number,
        default: 0,
      },
    },
    { _id: false }
  );

const leaveBalanceSchema =
  new mongoose.Schema(
    {
      employee: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      year: {
        type: Number,
        required: true,
      },

      sickLeave:
        leaveCategorySchema,

      casualLeave:
        leaveCategorySchema,

      paidLeave:
        leaveCategorySchema,

      compOff:
        leaveCategorySchema,
    },
    {
      timestamps: true,
    }
  );

const LeaveBalance =
  mongoose.model(
    "LeaveBalance",
    leaveBalanceSchema
  );

export default LeaveBalance;