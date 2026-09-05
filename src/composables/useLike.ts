import { useMutation } from "@tanstack/vue-query";
import { likePost } from "@/services/like.service";

export const useLike = () => {
  return useMutation({
    mutationFn: (postId: number) => likePost(postId),
  });
};
