import type { Post } from "@/types/types";
import api from "../utils/axios";
export interface CreatePostData {
  title: string;
  body: string;
  image?: string | null;
  category_id: number;
}
const createPost = async (postData: FormData): Promise<Post> => {
  const response = await api.post("/v1/posts", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
const getPosts = async (): Promise<Post[]> => {
  const response = await api.get("/v1/posts");

  return response.data.data;
};

export { createPost, getPosts };
