import api from "@/utils/axios";

export interface FollowResponse {
  followers: number;
  is_following: boolean;
}

export const followUnfollow = async (
  username: string,
): Promise<FollowResponse> => {
  const response = await api.post(`/v1/follow/${username}`);

  return response.data;
};
