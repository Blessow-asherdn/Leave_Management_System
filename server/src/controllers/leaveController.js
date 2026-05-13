import { applyLeaveService,getMyLeavesService,getAllLeavesService,updateLeaveStatusService} from "../services/leaveService.js";

export const applyLeave = async (req, res) => {
  try {
    const leave = await applyLeaveService(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
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

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await updateLeaveStatusService(
      req.params.id,
      status
    );

    res.status(200).json({
      success: true,
      message: `Leave ${status.toLowerCase()} successfully`,
      data: leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};