import { computed, type Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { postDetailQuery } from "@/queries/posts-details/post-detail.queries";

export function usePost(username: Ref<string>, slug: Ref<string>) {
  const query = useQuery(
    computed(() => postDetailQuery(username.value, slug.value)),
  );

  return {
    post: query.data,
    postLoading: query.isPending,
    postError: query.isError,
    postFetching: query.isFetching,
    postErrorMessage: query.error,
    refetchPost: query.refetch,
  };
}
