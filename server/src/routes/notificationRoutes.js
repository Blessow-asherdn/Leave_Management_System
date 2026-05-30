import express from "express";

import {
  fetchNotifications,
  readNotification,
} from "../controllers/notificationController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/",
  protect,
  fetchNotifications
);

router.patch(
  "/:id/read",
  protect,
  readNotification
);

export default router;