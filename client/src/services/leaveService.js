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

export const updateLeaveStatus = async (
  id,
  status
) => {
  const response = await api.put(
    `/leaves/${id}/status`,
    { status }
  );

  return response.data;
};