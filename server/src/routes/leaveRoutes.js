import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

import { applyLeave,getMyLeaves,getAllLeaves,updateLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("employee"),
  getMyLeaves
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllLeaves
);

router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("employee"),
  applyLeave
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateLeaveStatus
);

export default router;