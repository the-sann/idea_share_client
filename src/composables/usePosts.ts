import { computed, type Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { postsQuery } from "@/queries/posts/post.queries";

export function usePosts(selectedCategory: Ref<number | null>) {
  const query = useQuery(computed(() => postsQuery(selectedCategory.value)));

  return {
    posts: query.data,

    postsLoading: query.isPending,
    postsError: query.isError,
    postsFetching: query.isFetching,

    postsErrorMessage: query.error,

    refetchPosts: query.refetch,
  };
}
