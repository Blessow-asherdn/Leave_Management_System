import { createUserService,getAllUsersService,updateUserService,toggleUserStatusService } from "../services/userService.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleUserStatus =
  async (req, res) => {
    try {
      const user =
        await toggleUserStatusService(
          req.params.id
        );

      res.status(200).json({
        message:
          user.isActive
            ? "User activated successfully"
            : "User deactivated successfully",
        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };