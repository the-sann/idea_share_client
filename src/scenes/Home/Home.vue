<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";

import PostCard from "./PostCard.vue";
import { useRouter } from "vue-router";
import Layout from "@/components/App/layout.vue";
import Loading from "@/components/App/loading.vue";
import { useQuery } from "@tanstack/vue-query";
import { postsQuery } from "@/queries/posts/post.queries";
import { useCategories } from "@/composables/useCategories.ts";

const router = useRouter();

const showScrollTop = ref(false);
const { categories, selectedCategory } = useCategories();

const {
  data: posts,
  isPending: postsLoading,
  isError: postsError,
  isFetching: postsFetching,
  refetch: refetchPosts,
} = useQuery(postsQuery());

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const goToPostForm = () => {
  router.push({ name: "post-form" });
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Layout>
    <div>
      <div class="flex justify-between mb-8 px-2 sm:px-0">
        <h1 class="text-2xl">Share Your Idea Now !</h1>
        <button
          @click="goToPostForm"
          class="rounded-lg bg-black px-6 text-white disabled:opacity-50"
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

      <!-- Initial loading -->
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

        <!-- Background refetch -->
        <p v-if="postsFetching" class="py-2 text-center text-sm text-gray-500">
          Updating...
        </p>
      </template>
    </div>

    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-4 z-40 rounded-full bg-black p-3 text-white shadow-lg transition hover:scale-110"
    >
      <ArrowUp :size="20" />
    </button>
  </Layout>
</template>
