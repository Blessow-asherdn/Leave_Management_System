import express from "express";

import {
  protect,
} from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
  assignLeaveBalance,
  getMyLeaveBalance,
} from "../controllers/leaveBalanceController.js";

const router =
  express.Router();

router.get(
  "/my",
  protect,
  roleMiddleware("employee"),
  getMyLeaveBalance
);

router.post(
  "/assign",
  protect,
  roleMiddleware("admin"),
  assignLeaveBalance
);

export default router;