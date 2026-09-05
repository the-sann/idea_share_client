import api from "@/utils/axios";
export const likePost = (postId: number) => {
  return api.post(`/v1/like/${postId}`);
};
