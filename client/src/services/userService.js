import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};

export const deactivateUser = async (id) => {
  const response = await api.put(
    `/users/${id}/deactivate`
  );

  return response.data;
};