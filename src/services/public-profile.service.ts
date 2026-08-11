import api from "../utils/axios";

const getPublicProfile = (username: string) => {
  return api.get(`/v1/@${username}`);
};

export { getPublicProfile };
