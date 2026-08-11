import { useMutation } from "@tanstack/vue-query";
import { followUnfollow } from "@/services/follow.service";

export function useFollow() {
  return useMutation({
    mutationFn: (username: string) => followUnfollow(username),
  });
}
