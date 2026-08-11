import { queryOptions } from "@tanstack/vue-query";
import { getCategories } from "@/services/category.service";
import { categoryKeys } from "./category.keys";

export const categoriesQuery = () =>
  queryOptions({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
