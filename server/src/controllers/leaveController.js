import {
  applyLeaveService,
  getMyLeavesService,
  getAllLeavesService,
  updateLeaveStatusService,
  getMyLeaveBalanceService,
  updateLeaveBalanceService,
  getAllLeaveBalancesService,
  grantCompOffService,
  revokeLeaveService,
} from "../services/leaveService.js";

export const applyLeave = async (
  req,
  res
) => {

  try {

    const leave =
      await applyLeaveService(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Leave applied successfully",
      data: leave,
    });

  } catch (error) {

    res.status(400).json({
      success: false,

      message:
        error.message,

      requiresConfirmation:
        error.requiresConfirmation ||
        false,

      breakdown:
        error.breakdown || {},

      recommendation:
        error.recommendation || "",

      unpaidDays:
        error.unpaidDays || 0,
    });

  }

};

export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await getMyLeavesService(req.user.id);

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await getAllLeavesService();

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLeaveStatus =
  async (req, res) => {
    try {
      const {
        status,
        adminComment,
      } = req.body;

      const leave =
        await updateLeaveStatusService(
          req.params.id,
          status,
          adminComment
        );

      res.status(200).json({
        message:
          "Leave status updated successfully",
        leave,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getMyLeaveBalance =
  async (req, res) => {

    try {

      console.log(
        "REQ USER:",
        req.user
      );

      if (!req.user) {

        return res
          .status(401)
          .json({
            message:
              "Unauthorized",
          });

      }

      const balance =
        await getMyLeaveBalanceService(
          req.user.id
        );

      if (!balance) {

        return res
          .status(404)
          .json({
            message:
              "Leave balance not found",
          });

      }

      res.status(200).json(
        balance
      );

    } catch (error) {

      console.log(
        "BALANCE ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const revokeLeave =
  async (req, res) => {

    try {

      const leave =
        await revokeLeaveService(
          req.params.id,
          req.user.id
        );

      res.status(200).json({
        success: true,
        message:
          "Leave revoked successfully",
        data: leave,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message:
          error.message,
      });

    }
  };

export const updateLeaveBalance =
  async (req, res) => {
    try {
      const updatedBalance =
        await updateLeaveBalanceService(
          req.params.employeeId,
          req.body
        );

      res.status(200).json({
        message:
          "Leave balance updated successfully",
        updatedBalance,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getAllLeaveBalances =
  async (req, res) => {
    try {
      const balances =
        await getAllLeaveBalancesService();

      res.status(200).json(
        balances
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const grantCompOff =
  async (req, res) => {
    try {
      const updatedBalance =
        await grantCompOffService(
          req.params.employeeId,
          req.body.days
        );

      res.status(200).json({
        message:
          "Comp Off granted successfully",
        updatedBalance,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };