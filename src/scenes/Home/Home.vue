<script setup lang="ts">
import { getUser } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import { Menu, SquarePen, X } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getCategories } from "@/services/category.service";
import type { Category, Post } from "@/types/types";
import { getPosts } from "@/services/post.service";
import PostCard from "./PostCard.vue";

const showDrawer = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const posts = ref<Post[]>([]);
const loading = ref(false);

const categories = ref<Category[]>([]);
const selectedCategory = ref<number | null>(null);

const fetchCategories = async () => {
  try {
    const response = await getCategories();

    categories.value = response.data.data;

    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0].id;
    }
  } catch (error) {
    console.error(error);
  }
};
const fetchUser = async () => {
  try {
    const response = await getUser();
    authStore.setUser(response.data.user);
  } catch (error) {
    console.error(error);
  }
};
const fetchPosts = async () => {
  try {
    loading.value = true;

    posts.value = await getPosts();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
  fetchUser();
  fetchPosts();
});

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
};
const handleLogout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
const goToEditProfile = () => {
  showDrawer.value = false;
  router.push({ name: "edit-profile" });
};
const goToPostForm = () => {
  router.push({ name: "post-form" });
};
</script>
<template>
  <main class="w-full max-w-7xl mx-auto py-5 min-h-screen">
    <nav class="flex items-center justify-between mb-8">
      <img src="@/assets/logo.png" alt="" class="h-15" />
      <button @click="toggleDrawer" class="px-4">
        <Menu :size="32" />
      </button>
    </nav>
    <div class="flex justify-between px-4 mb-8">
      <h1 class="text-2xl">What you want to share Today?</h1>
      <button
        @click="goToPostForm"
        class="rounded-lg bg-black px-6 flex-1 w-full text-white disabled:opacity-50"
      >
        ADD
      </button>
    </div>
    <div class="">
      <div
        role="tablist"
        class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <button
          v-for="category in categories"
          :key="category.id"
          role="tab"
          @click="selectedCategory = category.id"
          :class="[
            'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50',
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <div class="mt-16">
      <div class="flex items-start gap-4">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160"
          class="size-20 rounded object-cover"
        />

        <div>
          <h3 class="font-medium text-gray-900 sm:text-lg">Title goes here</h3>

          <p class="mt-0.5 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            voluptas distinctio nesciunt quas non animi.
          </p>
          <dl class="mt-4 mb-4 flex gap-3 lg:gap-6">
            <div class="flex items-center gap-2">
              <dt class="text-gray-700">
                <span class="sr-only"> Published on </span>

                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </dt>

              <dd class="text-xs text-gray-700">31/06/2025</dd>
            </div>

            <div class="flex items-center gap-2">
              <dt class="text-gray-700">
                <span class="sr-only"> Reading time </span>

                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </dt>

              <dd class="text-xs text-gray-700">12 minutes</dd>
            </div>

            <div class="flex items-center gap-2">
              <dt class="text-gray-700">
                <span class="sr-only"> Reading time </span>

                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </dt>

              <dd class="text-xs text-gray-700 hover:text-blue-700">
                View More
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <img
        alt=""
        src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1160"
        class="h-64 w-full object-cover sm:h-80 lg:h-96"
      />
    </div>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </main>

  <!-- backdrop -->
  <div
    v-if="showDrawer"
    class="fixed inset-0 z-40 bg-black/40"
    @click="showDrawer = false"
  />
  <!-- drawer -->
  <aside
    class="fixed top-0 right-0 z-50 h-screen w-full md:w-96 flex flex-col transform bg-white shadow-xl transition-transform duration-300"
    :class="showDrawer ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b p-4">
      <h2 class="text-lg font-semibold">User Details</h2>

      <button @click="showDrawer = false">
        <X class="h-6 w-6" />
      </button>
    </div>

    <!-- Content -->
    <div class="overflow-y-auto p-4 flex-1">
      <div class="flow-root">
        <dl class="-my-3 divide-y divide-gray-200 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Avatar</dt>
            <img
              alt=""
              :src="`http://localhost:8000/storage/${authStore.user?.profile?.profile_image}`"
              class="size-20 rounded object-cover border"
            />
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Name</dt>
            <dd class="text-gray-700">{{ authStore.user?.name }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Email</dt>
            <dd class="text-gray-700">{{ authStore.user?.email }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Bio</dt>
            <dd class="text-gray-700">{{ authStore.user?.profile?.bio }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Career</dt>
            <dd class="text-gray-700">{{ authStore.user?.profile?.career }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Location</dt>
            <dd class="text-gray-700">
              {{ authStore.user?.profile?.location }}
            </dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Website</dt>

            <dd>
              <a
                :href="authStore.user?.profile?.website"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 underline hover:text-blue-800"
              >
                {{ authStore.user?.profile?.website }}
              </a>
            </dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Birthday</dt>
            <dd class="text-gray-700">
              {{ authStore.user?.profile?.birthday }}
            </dd>
          </div>

          <div class="flex justify-start gap-4">
            <button class="font-medium text-red-900 py-4" @click="handleLogout">
              Logout
            </button>
            <button
              class="flex items-center gap-2 py-4 font-medium text-gray-900"
              @click="goToEditProfile"
            >
              <SquarePen :size="18" />
              Edit Profile
            </button>
          </div>
        </dl>
      </div>
    </div>
  </aside>
</template>
