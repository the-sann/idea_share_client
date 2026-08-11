// category.service.ts

import api from "@/utils/axios";
import type { Category } from "@/types/types";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/v1/categories");

  return response.data.data;
};
