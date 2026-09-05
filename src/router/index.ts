import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Home from "@/scenes/Home/Home.vue";
import Login from "@/scenes/Auth/Login.vue";
import Register from "@/scenes/Auth/Register.vue";

import ProfileForm from "@/scenes/Home/pages/ProfileForm.vue";
import PostForm from "@/scenes/Home/pages/PostForm.vue";
import PostDetail from "@/scenes/Home/pages/PostDetail.vue";
import PublicProfile from "@/scenes/Home/pages/PublicProfile.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/category/:categoryId",
      name: "home-category",
      component: Home,
      props: true,
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },

    {
      path: "/home/category/:categoryId",
      name: "home-category",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/home/category/:categoryId",
      name: "home-category",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/editprofile",
      name: "edit-profile",
      component: ProfileForm,
      meta: { requiresAuth: true },
    },
    {
      path: "/postform",
      name: "post-form",
      component: PostForm,
      meta: { requiresAuth: true },
    },

    {
      path: "/@:username/:slug",
      name: "post-show",
      component: PostDetail,
    },
    {
      path: "/@:username",
      name: "public-profile",
      component: PublicProfile,
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }
});

export default router;
