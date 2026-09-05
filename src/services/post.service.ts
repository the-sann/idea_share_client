// services/post.service.ts

import type { Post } from "@/types/types";
import api from "../utils/axios";

export interface CreatePostData {
  title: string;
  body: string;
  image?: string | null;
  category_id: number;
}

export interface CreatePostResponse {
  data: Post;
  message?: string;
}

export const createPost = async (
  postData: FormData,
): Promise<CreatePostResponse> => {
  const response = await api.post("/v1/posts", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPosts = async (
  categoryId: number | null = null,
): Promise<Post[]> => {
  const response = await api.get("/v1/posts", {
    params:
      categoryId !== null
        ? {
            category_id: categoryId,
          }
        : undefined,
  });

  return response.data.data;
};

export const getPostBySlug = async (
  username: string,
  slug: string,
): Promise<Post> => {
  const response = await api.get(`/v1/@${username}/${slug}`);

  return response.data.data;
};
<<<<<<< HEAD
export const getPostByCategory = async (
  categoryId: number,
): Promise<Post[]> => {
=======

export const getPostByCategory = async (categoryId: number): Promise<Post[]> => {
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
  const response = await api.get(`/v1/category/${categoryId}`);
  return response.data.data;
};
