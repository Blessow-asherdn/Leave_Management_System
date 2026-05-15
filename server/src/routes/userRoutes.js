import express from "express";
import { createUser,getAllUsers,updateUser,toggleUserStatus } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createUser
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUser
);


router.patch(
  "/toggle-status/:id",
  toggleUserStatus
);

export default router;