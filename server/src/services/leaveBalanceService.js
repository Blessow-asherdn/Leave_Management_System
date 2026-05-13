import LeaveBalance from "../models/LeaveBalance.js";

export const assignLeaveBalanceService = async (
  employee,
  totalLeaves
) => {
  const currentYear = new Date().getFullYear();

  const existingBalance = await LeaveBalance.findOne({
    employee,
    year: currentYear,
  });

  if (existingBalance) {
    throw new Error("Leave balance already assigned");
  }

  const leaveBalance = await LeaveBalance.create({
    employee,
    year: currentYear,
    totalLeaves,
    usedLeaves: 0,
    remainingLeaves: totalLeaves,
  });

  return leaveBalance;
};

export const getMyLeaveBalanceService = async (userId) => {
  const currentYear = new Date().getFullYear();

  const balance = await LeaveBalance.findOne({
    employee: userId,
    year: currentYear,
  });

  if (!balance) {
    throw new Error("Leave balance not found");
  }

  return balance;
};