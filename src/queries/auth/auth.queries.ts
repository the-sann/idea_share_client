import { queryOptions } from "@tanstack/vue-query";
import { getUser } from "@/services/auth.service";
import { authKeys } from "./auth.keys";

export const userQuery = () =>
  queryOptions({
    queryKey: authKeys.user(),

    queryFn: async () => {
      const response = await getUser();
      return response.data;
    },

    staleTime: 5 * 60 * 1000,
  });
