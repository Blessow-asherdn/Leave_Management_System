import Leave from "../models/Leave.js";

import LeaveBalance from "../models/LeaveBalance.js";

import {
  LEAVE_TYPE_FIELDS,
} from "../constants/leaveTypes.js";

export const applyLeaveService =
  async (userId, leaveData) => {
    const {
      leaveType,
      reason,
      fromDate,
      toDate,
    } = leaveData;

    const start =
      new Date(fromDate);

    const end =
      new Date(toDate);

    const totalDays =
      Math.ceil(
        (end - start) /
          (1000 *
            60 *
            60 *
            24)
      ) + 1;

    if (totalDays <= 0) {
      throw new Error(
        "Invalid leave dates"
      );
    }

    const currentYear =
      new Date().getFullYear();

    const leaveBalance =
      await LeaveBalance.findOne({
        employee: userId,
        year: currentYear,
      });

      if (!leaveBalance) {
        throw new Error(
          "Leave balance not assigned"
        );
      }

      const leaveField =
        LEAVE_TYPE_FIELDS[
          leaveType
        ];

      if (!leaveField) {
        throw new Error(
          "Invalid leave type"
        );
      }

      const selectedLeave =
    leaveBalance[
      leaveField
    ];

  if (
    selectedLeave.remaining <
    totalDays
  ) {

    const alternatives = [];

    if (
      leaveType !==
        "Paid Leave" &&
      leaveBalance.paidLeave
        .remaining >=
        totalDays
    ) {
      alternatives.push(
        "Paid Leave"
      );
    }

    if (
      leaveType !==
        "Comp Off" &&
      leaveBalance.compOff
        .remaining >=
        totalDays
    ) {
      alternatives.push(
        "Comp Off"
      );
    }

    if (
      leaveType !==
        "Casual Leave" &&
      leaveBalance.casualLeave
        .remaining >=
        totalDays
    ) {
      alternatives.push(
        "Casual Leave"
      );
    }

    if (
      leaveType !==
        "Sick Leave" &&
      leaveBalance.sickLeave
        .remaining >=
        totalDays
    ) {
      alternatives.push(
        "Sick Leave"
      );
    }

    const error =
      new Error(
        `${leaveType} balance is insufficient`
      );

    error.suggestedLeaves =
      alternatives;

    throw error;
  }

    const leave =
      await Leave.create({
        employee: userId,
        leaveType,
        reason,
        fromDate,
        toDate,
        totalDays,
      });

    return leave;
  };

export const getMyLeavesService =
  async (userId) => {
    const leaves =
      await Leave.find({
        employee: userId,
      }).sort({
        createdAt: -1,
      });

    return leaves;
  };

export const getAllLeavesService =
  async () => {
    const leaves =
      await Leave.find()
        .populate(
          "employee",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    return leaves;
  };

export const updateLeaveStatusService =
  async (
    leaveId,
    status,
    adminComment
  ) => {
    const leave =
      await Leave.findById(
        leaveId
      );

    if (!leave) {
      throw new Error(
        "Leave request not found"
      );
    }

    if (
      leave.status !==
      "Pending"
    ) {
      throw new Error(
        "Leave already processed"
      );
    }

    leave.status = status;

    leave.adminComment =
      adminComment || "";

    await leave.save();

    if (status === "Approved") {
      const currentYear =
        new Date().getFullYear();

      const leaveBalance =
        await LeaveBalance.findOne(
          {
            employee:
              leave.employee,
            year: currentYear,
          }
        );

      if (!leaveBalance) {
        throw new Error(
          "Leave balance not found"
        );
      }

      const leaveField =
        LEAVE_TYPE_FIELDS[
          leave.leaveType
        ];

      leaveBalance[
        leaveField
      ].used +=
        leave.totalDays;

      leaveBalance[
        leaveField
      ].remaining -=
        leave.totalDays;

      await leaveBalance.save();
    }

    return leave;
  };

  export const getMyLeaveBalanceService =
  async (userId) => {
    const currentYear =
      new Date().getFullYear();

    const leaveBalance =
      await LeaveBalance.findOne({
        employee: userId,
        year: currentYear,
      });

    if (!leaveBalance) {
      throw new Error(
        "Leave balance not found"
      );
    }

    return leaveBalance;
  };

export const updateLeaveBalanceService =
  async (
    employeeId,
    balanceData
  ) => {
    const currentYear =
      new Date().getFullYear();

    const leaveBalance =
      await LeaveBalance.findOne({
        employee: employeeId,
        year: currentYear,
      });

    if (!leaveBalance) {
      throw new Error(
        "Leave balance not found"
      );
    }

    const updateCategory = (
      category,
      newTotal
    ) => {
      const used =
        leaveBalance[
          category
        ].used;

      leaveBalance[
        category
      ].total = newTotal;

      leaveBalance[
        category
      ].remaining =
        newTotal - used;
    };

    if (
      balanceData.sickLeave !==
      undefined
    ) {
      updateCategory(
        "sickLeave",
        balanceData.sickLeave
      );
    }

    if (
      balanceData.casualLeave !==
      undefined
    ) {
      updateCategory(
        "casualLeave",
        balanceData.casualLeave
      );
    }

    if (
      balanceData.paidLeave !==
      undefined
    ) {
      updateCategory(
        "paidLeave",
        balanceData.paidLeave
      );
    }

    if (
      balanceData.compOff !==
      undefined
    ) {
      updateCategory(
        "compOff",
        balanceData.compOff
      );
    }

    await leaveBalance.save();

    return leaveBalance;
  };

export const getAllLeaveBalancesService =
  async () => {
    const currentYear =
      new Date().getFullYear();

    const balances =
      await LeaveBalance.find({
        year: currentYear,
      }).populate(
        "employee",
        "name email"
      );

    return balances.filter(
      (balance) =>
        balance.employee
    );
  };

export const grantCompOffService =
  async (
    employeeId,
    days
  ) => {
    const currentYear =
      new Date().getFullYear();

    const leaveBalance =
      await LeaveBalance.findOne({
        employee: employeeId,
        year: currentYear,
      });

    if (!leaveBalance) {
      throw new Error(
        "Leave balance not found"
      );
    }

    if (
      !days ||
      days <= 0
    ) {
      throw new Error(
        "Invalid comp off days"
      );
    }

    leaveBalance.compOff.total +=
      Number(days);

    leaveBalance.compOff.remaining +=
      Number(days);

    await leaveBalance.save();

    return leaveBalance;
  };