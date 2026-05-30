import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    leaveType: {
      type: String,
      enum: [
        "Sick Leave",
        "Casual Leave",
        "Paid Leave",
        "Comp Off",
        "Unpaid Leave",
      ],
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
  "Pending",
  "Approved",
  "Rejected",
  "Revoked",
],
      default: "Pending",
    },

    adminComment: {
      type: String,
      default: "",
    },
    leaveBreakdown: {
      casualLeave: {
        type: Number,
        default: 0,
      },

      paidLeave: {
        type: Number,
        default: 0,
      },

      sickLeave: {
        type: Number,
        default: 0,
      },

      compOff: {
        type: Number,
        default: 0,
      },

      unpaidLeave: {
        type: Number,
        default: 0,
      },
    },

    isUnpaidLeave: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;