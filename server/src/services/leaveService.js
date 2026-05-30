import Leave from "../models/Leave.js";
import User from "../models/users.js";

import LeaveBalance from "../models/LeaveBalance.js";

import {
  LEAVE_TYPE_FIELDS,
} from "../constants/leaveTypes.js";

import {
  createNotification,
} from "./notificationService.js";

export const applyLeaveService =
  async (userId, leaveData) => {

    const {
      leaveType,
      reason,
      fromDate,
      toDate,
      acceptAdjustment,
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

    const breakdown = {
      casualLeave: 0,
      paidLeave: 0,
      sickLeave: 0,
      compOff: 0,
      unpaidLeave: 0,
    };

    let remainingDays =
      totalDays;

let leavePriority = [];

if (leaveType === "Casual Leave") {

  leavePriority = [
    {
      name: "casualLeave",
      remaining:
        leaveBalance.casualLeave.remaining,
    },
    {
      name: "paidLeave",
      remaining:
        leaveBalance.paidLeave.remaining,
    },
    {
      name: "sickLeave",
      remaining:
        leaveBalance.sickLeave.remaining,
    },
    {
      name: "compOff",
      remaining:
        leaveBalance.compOff.remaining,
    },
  ];

} else if (
  leaveType === "Paid Leave"
) {

  leavePriority = [
    {
      name: "paidLeave",
      remaining:
        leaveBalance.paidLeave.remaining,
    },
    {
      name: "casualLeave",
      remaining:
        leaveBalance.casualLeave.remaining,
    },
    {
      name: "sickLeave",
      remaining:
        leaveBalance.sickLeave.remaining,
    },
    {
      name: "compOff",
      remaining:
        leaveBalance.compOff.remaining,
    },
  ];

} else if (
  leaveType === "Sick Leave"
) {

  leavePriority = [
    {
      name: "sickLeave",
      remaining:
        leaveBalance.sickLeave.remaining,
    },
    {
      name: "casualLeave",
      remaining:
        leaveBalance.casualLeave.remaining,
    },
    {
      name: "paidLeave",
      remaining:
        leaveBalance.paidLeave.remaining,
    },
    {
      name: "compOff",
      remaining:
        leaveBalance.compOff.remaining,
    },
  ];

} else if (
  leaveType === "Comp Off"
) {

  leavePriority = [
    {
      name: "compOff",
      remaining:
        leaveBalance.compOff.remaining,
    },
    {
      name: "casualLeave",
      remaining:
        leaveBalance.casualLeave.remaining,
    },
    {
      name: "paidLeave",
      remaining:
        leaveBalance.paidLeave.remaining,
    },
    {
      name: "sickLeave",
      remaining:
        leaveBalance.sickLeave.remaining,
    },
  ];

}else if (
  leaveType === "Unpaid Leave"
) {

  leavePriority = [];

}

    for (const leave of leavePriority) {

      if (
        remainingDays <= 0
      ) {
        break;
      }

      const usableDays =
        Math.min(
          leave.remaining,
          remainingDays
        );

      breakdown[
        leave.name
      ] = usableDays;

      remainingDays -=
        usableDays;
    }

    if (
      remainingDays > 0
    ) {

      breakdown.unpaidLeave =
        remainingDays;

    }

    const selectedField =
{
  "Casual Leave":
    "casualLeave",
  "Paid Leave":
    "paidLeave",
  "Sick Leave":
    "sickLeave",
  "Comp Off":
    "compOff",
}[leaveType];

const usedLeaveTypes =
  Object.keys(breakdown)
    .filter(
      (key) =>
        breakdown[key] > 0 &&
        key !== "unpaidLeave"
    );

const hasAdjustment =
  breakdown.unpaidLeave > 0 ||
  usedLeaveTypes.length > 1 ||
  (
    usedLeaveTypes.length === 1 &&
    usedLeaveTypes[0] !== selectedField
  );
console.log(
  "LEAVE TYPE:",
  leaveType
);

console.log(
  "TOTAL DAYS:",
  totalDays
);

console.log(
  "BREAKDOWN:",
  breakdown
);

console.log(
  "HAS ADJUSTMENT:",
  hasAdjustment
);

console.log(
  "ACCEPT ADJUSTMENT:",
  acceptAdjustment
);
    if (
  hasAdjustment &&
  !acceptAdjustment
) {

  const unpaidDays =
    breakdown.unpaidLeave || 0;

  const recommendationText =
    Object.entries(breakdown)
      .filter(
        ([, value]) => value > 0
      )
      .map(
        ([key, value]) => {

          const formatted =
            key
              .replace(
                /([A-Z])/g,
                " $1"
              )
              .replace(
                /^./,
                (str) =>
                  str.toUpperCase()
              );

          return `${formatted}: ${value} day(s)`;
        }
      )
      .join(", ");

  const error =
    new Error(
      unpaidDays > 0
        ? `Insufficient balance. ${unpaidDays} day(s) will become unpaid leave.`
        : "Leave adjustment required"
    );

  error.requiresConfirmation =
    true;

  error.breakdown =
    breakdown;

  error.recommendation =
    recommendationText;

  error.unpaidDays =
    unpaidDays;

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

        leaveBreakdown:
          breakdown,

        isUnpaidLeave:
          breakdown.unpaidLeave >
          0,
      });

    const employee =
      await User.findById(
        userId
      );

    const breakdownText =
      Object.entries(
        breakdown
      )
        .filter(
          ([, value]) =>
            value > 0
        )
        .map(
          ([key, value]) =>
            `${key}: ${value}`
        )
        .join(", ");

    await createNotification({
      user: userId,

      title:
        "Leave Request Submitted",

      message: `Leave Breakdown → ${breakdownText}`,

      type: "leave",
    });

    const admins =
      await User.find({
        role: "admin",
      });

    for (const admin of admins) {

      await createNotification({
        user: admin._id,

        title:
          "New Leave Request",

        message:
          breakdown.unpaidLeave >
          0
            ? `${employee.name} applied leave with unpaid leave days`
            : `${employee.name} applied for leave`,

        type: "leave",
      });

    }

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

    const breakdownText =
      Object.entries(
        leave.leaveBreakdown
      )
        .filter(
          ([, value]) =>
            value > 0
        )
        .map(
          ([key, value]) =>
            `${key}: ${value}`
        )
        .join(", ");

    await createNotification({
      user: leave.employee,

      title: `Leave ${status}`,

      message:
        status === "Approved"
          ? `Approved Leave → ${breakdownText}`
          : `Rejected Leave Request`,

      type: "leave",
    });

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

      const breakdown =
        leave.leaveBreakdown || {
          casualLeave: 0,
          paidLeave: 0,
          sickLeave: 0,
          compOff: 0,
        };

      if (
        !leave.leaveBreakdown
      ) {

        const leaveField =
          LEAVE_TYPE_FIELDS[
            leave.leaveType
          ];

        breakdown[
          leaveField
        ] = leave.totalDays;
      }

      const updateLeave =
        (
          field,
          days
        ) => {

          if (days > 0) {

            leaveBalance[
              field
            ].used += days;

            leaveBalance[
              field
            ].remaining -=
              days;
          }
        };

      updateLeave(
        "casualLeave",
        breakdown.casualLeave
      );

      updateLeave(
        "paidLeave",
        breakdown.paidLeave
      );

      updateLeave(
        "sickLeave",
        breakdown.sickLeave
      );

      updateLeave(
        "compOff",
        breakdown.compOff
      );
      await leaveBalance.save();
    }

    return leave;
  };

export const revokeLeaveService =
  async (
    leaveId,
    userId
  ) => {

    const leave =
      await Leave.findById(
        leaveId
      );

    if (!leave) {

      throw new Error(
        "Leave not found"
      );

    }

    if (
      leave.status ===
      "Revoked"
    ) {

      throw new Error(
        "Leave already revoked"
      );

    }

    const currentYear =
      new Date().getFullYear();

    const leaveBalance =
      await LeaveBalance.findOne({
        employee:
          leave.employee,
        year: currentYear,
      });

    if (
      leave.status ===
        "Approved" &&
      leaveBalance
    ) {

      const breakdown =
        leave.leaveBreakdown;

      const restoreLeave =
        (
          field,
          days
        ) => {

          if (days > 0) {

            leaveBalance[
              field
            ].used -= days;

            leaveBalance[
              field
            ].remaining +=
              days;
          }
        };

      restoreLeave(
        "casualLeave",
        breakdown.casualLeave
      );

      restoreLeave(
        "paidLeave",
        breakdown.paidLeave
      );

      restoreLeave(
        "sickLeave",
        breakdown.sickLeave
      );

      restoreLeave(
        "compOff",
        breakdown.compOff
      );

      await leaveBalance.save();
    }

    leave.status =
      "Revoked";

    await leave.save();

    await createNotification({
      user: leave.employee,

      title:
        "Leave Revoked",

      message:
        "Your leave was revoked and balance restored",

      type: "leave",
    });

    const employee =
      await User.findById(
        leave.employee
      );

    const admins =
      await User.find({
        role: "admin",
      });

    for (const admin of admins) {

      await createNotification({
        user: admin._id,

        title:
          "Leave Revoked",

        message: `${employee.name} revoked a leave request`,

        type: "leave",
      });

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

    const balances =
      await LeaveBalance.find()
        .populate(
          "employee",
          "name email"
        );

    return balances;
  };

export const grantCompOffService =
  async (
    employeeId,
    days,
    reason
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

    await createNotification({
      user: employeeId,

      title:
        "Comp Off Granted",

      message: `${days} Comp Off day(s) granted. Reason: ${reason}`,

      type: "leave",
    });

    return leaveBalance;
  };