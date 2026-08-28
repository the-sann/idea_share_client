import { computed, type Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { publicProfileQuery } from "@/queries/profiles/profile.queries";

export function usePublicProfile(username: Ref<string>) {
  const query = useQuery(computed(() => publicProfileQuery(username.value)));

  return {
    user: query.data,

    profileLoading: query.isPending,
    profileError: query.isError,
    profileFetching: query.isFetching,

    profileErrorMessage: query.error,

    refetchProfile: query.refetch,
  };
}
