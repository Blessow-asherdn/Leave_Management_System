import Leave from "../models/Leave.js";
import LeaveBalance from "../models/LeaveBalance.js";

export const applyLeaveService = async (userId, leaveData) => {
  const { leaveType, reason, fromDate, toDate } = leaveData;

  const start = new Date(fromDate);
  const end = new Date(toDate);

  const totalDays =
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (totalDays <= 0) {
    throw new Error("Invalid leave dates");
  }

  const currentYear = new Date().getFullYear();

  const leaveBalance = await LeaveBalance.findOne({
    employee: userId,
    year: currentYear,
  });

  if (!leaveBalance) {
    throw new Error("Leave balance not assigned");
  }

  if (leaveBalance.remainingLeaves < totalDays) {
    throw new Error("Insufficient leave balance");
  }

  const leave = await Leave.create({
    employee: userId,
    leaveType,
    reason,
    fromDate,
    toDate,
    totalDays,
  });

  return leave;
};

export const getMyLeavesService = async (userId) => {
  const leaves = await Leave.find({
    employee: userId,
  }).sort({ createdAt: -1 });

  return leaves;
};

export const getAllLeavesService = async () => {
  const leaves = await Leave.find()
    .populate("employee", "name email")
    .sort({ createdAt: -1 });

  return leaves;
};

export const updateLeaveStatusService = async (
  leaveId,
  status
) => {
  const leave = await Leave.findById(leaveId);

  if (!leave) {
    throw new Error("Leave request not found");
  }

  if (leave.status !== "Pending") {
    throw new Error("Leave already processed");
  }

  leave.status = status;

  await leave.save();

  if (status === "Approved") {
    const currentYear = new Date().getFullYear();

    const leaveBalance = await LeaveBalance.findOne({
      employee: leave.employee,
      year: currentYear,
    });

    if (!leaveBalance) {
      throw new Error("Leave balance not found");
    }

    leaveBalance.usedLeaves += leave.totalDays;

    leaveBalance.remainingLeaves -= leave.totalDays;

    await leaveBalance.save();
  }

  return leave;
};