import express from "express";

import {
  createUser,
  getAllUsers,
  updateUser,
  toggleUserStatus,
} from "../controllers/userController.js";

import {
  protect,
} from "../middlewares/authMiddleware.js";

import roleMiddleware from "../middlewares/roleMiddleware.js";

const router =
  express.Router();

router.get(
  "/",
  protect,
  roleMiddleware("admin"),
  getAllUsers
);

router.post(
  "/",
  protect,
  roleMiddleware("admin"),
  createUser
);

router.put(
  "/:id",
  protect,
  roleMiddleware("admin"),
  updateUser
);

router.patch(
  "/toggle-status/:id",
  protect,
  roleMiddleware("admin"),
  toggleUserStatus
);

export default router;