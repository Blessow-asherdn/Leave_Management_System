import api from "./api";

export const applyLeave = async (data) => {
  const response = await api.post(
    "/leaves/apply",
    data
  );

  return response.data;
};

export const getMyLeaves = async () => {
  const response = await api.get(
    "/leaves/my"
  );

  return response.data;
};

export const getAllLeaves = async () => {
  const response = await api.get("/leaves");

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
  (employeeId, days) => {
    return api.patch(
      `/leaves/comp-off/${employeeId}`,
      { days }
    );
  };

export const getAllLeaveBalances =
  () => {
    return api.get(
      "/leaves/balances"
    );
  };

export const updateLeaveBalance =
  (employeeId, data) => {
    return api.patch(
      `/leaves/balance/${employeeId}`,
      data
    );
  };

  export const getMyLeaveBalance =
  () => {
    return api.get(
      "/leaves/balance"
    );
  };