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