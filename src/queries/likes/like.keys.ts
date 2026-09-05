export const postKeys = {
  all: ["posts"] as const,

  lists: () => [...postKeys.all, "list"] as const,

  list: (categoryId: number | null = null) =>
    [...postKeys.lists(), { categoryId }] as const,

  details: () => [...postKeys.all, "detail"] as const,

  detail: (username: string, slug: string) =>
    [...postKeys.details(), username, slug] as const,
};
