import api from "./api";

export const getMyLeaveBalance =
  async () => {
    const response = await api.get(
      "/leave-balances/my"
    );

    return response.data;
};