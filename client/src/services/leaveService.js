import api from "./api";

export const applyLeave =
  async (data) => {

    const response =
      await api.post(
        "/leaves/apply",
        data
      );

    return response.data;
  };

export const getMyLeaves =
  async () => {

    const response =
      await api.get(
        "/leaves/my"
      );

    return response.data;
  };

export const getAllLeaves =
  async () => {

    const response =
      await api.get(
        "/leaves"
      );

    return response.data;
  };

export const updateLeaveStatus =
  async (
    id,
    status,
    adminComment
  ) => {

    const response =
      await api.put(
        `/leaves/${id}/status`,
        {
          status,
          adminComment,
        }
      );

    return response.data;
  };

export const grantCompOff =
  async (
    employeeId,
    data
  ) => {

    const response =
      await api.patch(
        `/leaves/comp-off/${employeeId}`,
        data
      );

    return response.data;
  };

export const getAllLeaveBalances =
  async () => {

    const response =
      await api.get(
        "/leaves/balances"
      );

    return response.data;
  };

export const updateLeaveBalance =
  async (
    employeeId,
    data
  ) => {

    const response =
      await api.patch(
        `/leaves/balance/${employeeId}`,
        data
      );

    return response.data;
  };

export const getMyLeaveBalance =
  async () => {

    return await api.get(
      "/leaves/balance"
    );
  };

export const revokeLeave =
  async (leaveId) => {

    const response =
      await api.patch(
        `/leaves/${leaveId}/revoke`
      );

    return response.data;
  };