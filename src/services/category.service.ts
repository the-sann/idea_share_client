import api from "../utils/axios";

const getCategories = () => {
  return api.get("/v1/categories");
};

export { getCategories };
