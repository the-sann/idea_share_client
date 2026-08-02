import type { LoginPayload } from "@/types/types";
import api from "../utils/axios";

const login = (data: LoginPayload) => {
  return api.post("/login", data);
};

const register = (data: any) => {
  return api.post("/register", data);
};

const updateProfile = (data: FormData) => {
  return api.put("/user", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getUser = () => {
  return api.get("/user");
};

export { login, register, updateProfile, getUser };
