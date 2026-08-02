import type { User } from "@/types/types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

function getStoredUser(): User | null {
  const storedUser = localStorage.getItem("user");

  if (!storedUser || storedUser === "undefined") {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}
export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const user = ref<User | null>(getStoredUser());
  const isAuthenticated = computed(() => !!token.value);
  function setAuth(newToken: string, newUser: User) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
    setUser(newUser);
  }
  function setUser(newUser: User) {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }
  function logout() {
    token.value = "";
    user.value = null;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    token,
    isAuthenticated,
    user,
    setAuth,
    setUser,
    logout,
  };
});
