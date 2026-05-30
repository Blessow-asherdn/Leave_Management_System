import express from "express";

import {
  protect,
  adminOnly,
} from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getMyLeaveBalance,
  updateLeaveBalance,
  getAllLeaveBalances,
  grantCompOff,
  revokeLeave,
} from "../controllers/leaveController.js";

const router =
  express.Router();

router.get(
  "/my",
  protect,
  roleMiddleware("employee"),
  getMyLeaves
);

router.get(
  "/",
  protect,
  roleMiddleware("admin"),
  getAllLeaves
);

router.get(
  "/balance",
  protect,
  getMyLeaveBalance
);

router.get(
  "/balances",
  protect,
  adminOnly,
  getAllLeaveBalances
);

router.post(
  "/apply",
  protect,
  roleMiddleware("employee"),
  applyLeave
);

router.put(
  "/:id/status",
  protect,
  roleMiddleware("admin"),
  updateLeaveStatus
);

router.patch(
  "/balance/:employeeId",
  protect,
  adminOnly,
  updateLeaveBalance
);

router.patch(
  "/comp-off/:employeeId",
  protect,
  adminOnly,
  grantCompOff
);

router.patch(
  "/:id/revoke",
  protect,
  revokeLeave
);

export default router;