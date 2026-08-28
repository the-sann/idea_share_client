import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { followUnfollow } from "@/services/follow.service";

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => {
      return followUnfollow(username);
    },

    onSuccess: (data, username) => {
      // Update public profile
      queryClient.setQueryData(
        ["users", "profile", username],
        (oldUser: any) => {
          if (!oldUser) return oldUser;

          return {
            ...oldUser,
            followers_count: data.followers,
            is_following: data.is_following,
          };
        },
      );

      // Update post detail
      queryClient.setQueriesData(
        {
          queryKey: ["posts", "detail"],
        },
        (oldPost: any) => {
          if (!oldPost) return oldPost;

          if (oldPost.author?.username !== username) {
            return oldPost;
          }

          return {
            ...oldPost,

            author: {
              ...oldPost.author,

              followers_count: data.followers,

              is_following: data.is_following,
            },
          };
        },
      );
    },
  });
};
