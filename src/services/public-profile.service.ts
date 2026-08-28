import api from "@/utils/axios";
import type { User } from "@/types/types";

const getPublicProfile = async (username: string): Promise<User> => {
  const response = await api.get(`/v1/@${username}`);

  console.log("API RESPONSE:", response.data);

  return response.data;
};

export { getPublicProfile };
