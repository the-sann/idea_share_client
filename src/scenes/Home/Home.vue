<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";

<<<<<<< HEAD
<<<<<<< HEAD
import AppLayout from "@/components/App/layout.vue";
import GuestLayout from "@/components/App/guest-layout.vue";
=======
import Layout from "@/components/App/layout.vue";
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
import Layout from "@/components/App/layout.vue";
>>>>>>> origin/main
import Loading from "@/components/App/loading.vue";
import PostCard from "./PostCard.vue";

import { postsQuery } from "@/queries/posts/post.queries";
<<<<<<< HEAD
<<<<<<< HEAD
import { useCategories } from "@/composables/useCategories";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
=======
=======
>>>>>>> origin/main

import { useCategories } from "@/composables/useCategories.ts";

const router = useRouter();
const route = useRoute();

<<<<<<< HEAD
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
>>>>>>> origin/main
const { categories } = useCategories();

const showScrollTop = ref(false);

/*
|--------------------------------------------------------------------------
| Category from URL
|--------------------------------------------------------------------------
|
<<<<<<< HEAD
<<<<<<< HEAD
| /                -> null
| /category/1      -> 1
| /category/2      -> 2
=======
| /home                    -> null
| /home/category/1         -> 1
| /home/category/2         -> 2
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
| /home                    -> null
| /home/category/1         -> 1
| /home/category/2         -> 2
>>>>>>> origin/main
|
*/
const categoryId = computed<number | null>(() => {
  const value = route.params.categoryId;

<<<<<<< HEAD
<<<<<<< HEAD
  if (!value) return null;

  const id = Number(value);
  return Number.isNaN(id) ? null : id;
});

=======
=======
>>>>>>> origin/main
  if (!value) {
    return null;
  }

  const id = Number(value);

  return Number.isNaN(id) ? null : id;
});

/*
|--------------------------------------------------------------------------
| Posts query
|--------------------------------------------------------------------------
*/

<<<<<<< HEAD
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
>>>>>>> origin/main
const query = computed(() => postsQuery(categoryId.value));

const {
  data: posts,
  isPending: postsLoading,
  isError: postsError,
  isFetching: postsFetching,
  refetch: refetchPosts,
} = useQuery(query);

<<<<<<< HEAD
<<<<<<< HEAD
const goToCategory = (id: number) => {
  router.push({
    name: "home-category",
    params: { categoryId: id },
=======
=======
>>>>>>> origin/main
/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

const goToCategory = (id: number) => {
  router.push({
    name: "home-category",
    params: {
      categoryId: id,
    },
<<<<<<< HEAD
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
>>>>>>> origin/main
  });
};

const goToAllPosts = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  router.push({ name: "home" });
};

const goToPostForm = () => {
  router.push({ name: "post-form" });
};
=======
=======
>>>>>>> origin/main
  router.push({
    name: "home",
  });
};

const goToPostForm = () => {
  router.push({
    name: "post-form",
  });
};

/*
|--------------------------------------------------------------------------
| Scroll
|--------------------------------------------------------------------------
*/
<<<<<<< HEAD
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
>>>>>>> origin/main

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <component :is="authStore.isAuthenticated ? AppLayout : GuestLayout">
    <div>
      <!-- Header -->
      <div class="mb-8 flex justify-between px-2 sm:px-0">
        <h1 class="text-2xl">Share Your Idea Now!</h1>

<<<<<<< HEAD
<<<<<<< HEAD
        <!-- Only show Add button when logged in -->
=======
>>>>>>> 9cbf995ecf03db4d448b5a04f2898d4c94f2e7ab
=======
>>>>>>> origin/main
        <button
          v-if="authStore.isAuthenticated"
          @click="goToPostForm"
          class="rounded-lg bg-black px-6 py-2 text-white transition hover:bg-gray-800"
        >
          ADD
        </button>
      </div>

      <!-- Categories -->
      <div class="mb-8">
        <div
          role="tablist"
          class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <!-- All -->
          <button
            role="tab"
            :aria-selected="categoryId === null"
            @click="goToAllPosts"
            :class="[
              'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              categoryId === null
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50',
            ]"
          >
            All
          </button>

          <!-- Categories -->
<<<<<<< HEAD
          <button
            role="tab"
            :aria-selected="categoryId === null"
            @click="goToAllPosts"
            :class="[
              'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              categoryId === null
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50',
            ]"
          >
            All
          </button>

=======
>>>>>>> origin/main
          <button
            v-for="category in categories"
            :key="category.id"
            role="tab"
            :aria-selected="categoryId === category.id"
            @click="goToCategory(category.id)"
            :class="[
              'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              categoryId === category.id
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50',
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <Loading v-if="postsLoading" />

      <!-- Error -->
      <div v-else-if="postsError" class="py-10 text-center">
        <p>Failed to load posts.</p>

        <button
          @click="refetchPosts()"
          class="mt-3 rounded bg-black px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>

      <!-- Empty -->
      <div
        v-else-if="posts?.length === 0"
        class="py-10 text-center text-gray-500"
      >
        No posts found.
      </div>

      <!-- Posts -->
      <template v-else>
        <PostCard v-for="post in posts" :key="post.id" :post="post" />

        <p v-if="postsFetching" class="py-2 text-center text-sm text-gray-500">
          Updating...
        </p>
      </template>
    </div>

    <!-- Scroll to top -->
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-4 z-40 rounded-full bg-black p-3 text-white shadow-lg transition hover:scale-110"
    >
      <ArrowUp :size="20" />
    </button>
  </component>
</template>
