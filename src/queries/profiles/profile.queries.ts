import { getPublicProfile } from "@/services/public-profile.service";

export const publicProfileQuery = (username: string) => ({
  queryKey: ["users", "profile", username],

  queryFn: () => getPublicProfile(username),

  staleTime: 1000 * 60 * 5,
});
