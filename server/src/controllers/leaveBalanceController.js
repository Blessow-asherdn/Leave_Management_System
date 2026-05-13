import { assignLeaveBalanceService,getMyLeaveBalanceService} from "../services/leaveBalanceService.js";

export const assignLeaveBalance = async (req, res) => {
  try {
    const { employee, totalLeaves } = req.body;

    const balance = await assignLeaveBalanceService(
      employee,
      totalLeaves
    );

    res.status(201).json({
      success: true,
      message: "Leave balance assigned successfully",
      data: balance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyLeaveBalance = async (req, res) => {
  try {
    const balance = await getMyLeaveBalanceService(req.user.id);

    res.status(200).json({
      success: true,
      data: balance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};