<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getPostBySlug } from "@/services/post.service";
import type { Post } from "@/types/types";
import { ArrowLeft, Heart, MessagesSquare, Share2 } from "lucide-vue-next";
import Loading from "@/components/App/loading.vue";

const route = useRoute();

const post = ref<Post | null>(null);
const loading = ref(false);
const baseUrl = import.meta.env.VITE_API_URL;

const fetchPost = async () => {
  try {
    loading.value = true;
    const username = route.params.username as string;
    const slug = route.params.slug as string;
    const response = await getPostBySlug(username, slug);
    post.value = response;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <button
      @click="$router.back()"
      class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm transition hover:bg-gray-100 hover:shadow"
    >
      <ArrowLeft class="h-5 w-5" />
      <span class="text-sm font-medium px-2">Back</span>
    </button>
    <Loading v-if="loading" />
    <div v-else-if="post">
      <img
        v-if="post.image"
        :src="`${baseUrl}/storage/${post.image}`"
        class="mt-6 mb-6 w-full h-64 object-cover"
      />
      <p class="text-xl px-2">Article</p>
      <div class="pl-2 sm:pl-8">
        <div class="flex gap-8 mt-8 items-center mb-4">
          <p class="text-xl">
            {{ post.author?.name }}
          </p>
          <p class="text-sm text-gray-500">
            {{ post.author?.profile?.career || "No career information" }}
          </p>
          <p class="text-sm text-gray-500">2min read</p>
        </div>
        <div class="flex gap-4 items-center mb-4">
          <p>{{ post.author.followers_count || 0 }} followers</p>
          <button
            class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-4 focus-visible:ring-slate-200 focus-visible:outline-none"
          >
            Follow
          </button>
        </div>
        <h1 class="text-3xl font-bold mt-6 mb-4">{{ post.title }}</h1>
        <p class="text-gray-700 mb-6 text-xl break-all whitespace-pre-wrap">
          {{ post.body }}
        </p>
      </div>
      <div
        class="flex items-center justify-start gap-4 mt-4 px-2 sm:px-8 cursor-pointer"
      >
        <MessagesSquare />
        <Heart />
        <Share2 />
      </div>
    </div>
    <div v-else>Post not found.</div>
  </div>
</template>
