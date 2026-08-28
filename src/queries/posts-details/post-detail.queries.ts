import { getPostBySlug } from "@/services/post.service";

export const postDetailQuery = (username: string, slug: string) => ({
  queryKey: ["posts", "detail", username, slug],

  queryFn: () => getPostBySlug(username, slug),

  staleTime: 1000 * 60 * 5,
});
