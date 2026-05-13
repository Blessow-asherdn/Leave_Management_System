import express from "express";
import { createUser,getAllUsers,updateUser,deactivateUser } from "../controllers/userController.js";
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

router.put(
  "/:id/deactivate",
  authMiddleware,
  roleMiddleware("admin"),
  deactivateUser
);

export default router;