import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
=======
  baseURL: import.meta.env.VITE_API_URL,
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
