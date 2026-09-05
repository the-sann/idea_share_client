import { queryOptions } from "@tanstack/vue-query";
import {
  getPosts,
  getPostBySlug,
  getPostByCategory,
} from "@/services/post.service";
import { postKeys } from "./post.keys";

export const postsQuery = (categoryId: number | null = null) =>
  queryOptions({
    queryKey: postKeys.list(categoryId),
    queryFn: () =>
      categoryId === null ? getPosts() : getPostByCategory(categoryId),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });

export const postQuery = (username: string, slug: string) =>
  queryOptions({
    queryKey: postKeys.detail(username, slug),
    queryFn: () => getPostBySlug(username, slug),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
export const postByCategoryQuery = (categoryId: number) =>
  queryOptions({
    queryKey: postKeys.category(categoryId),
    queryFn: () => getPostByCategory(categoryId),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
