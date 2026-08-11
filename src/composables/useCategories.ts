import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { categoriesQuery } from "@/queries/categories/category.queries";

export function useCategories() {
  const selectedCategory = ref<number | null>(null);

  const {
    data: categories,
    isLoading: categoriesLoading,
    isPending: categoriesPending,
    isError: categoriesError,
    error: categoriesErrorMessage,
    isFetching: categoriesFetching,
    refetch: refetchCategories,
  } = useQuery(categoriesQuery());

  return {
    categories,
    selectedCategory,
    categoriesLoading,
    categoriesPending,
    categoriesError,
    categoriesErrorMessage,
    categoriesFetching,

    refetchCategories,
  };
}
