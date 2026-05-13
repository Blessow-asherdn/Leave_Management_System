import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

import { assignLeaveBalance,getMyLeaveBalance } from "../controllers/leaveBalanceController.js";

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("employee"),
  getMyLeaveBalance
);

router.post(
  "/assign",
  authMiddleware,
  roleMiddleware("admin"),
  assignLeaveBalance
);

export default router;