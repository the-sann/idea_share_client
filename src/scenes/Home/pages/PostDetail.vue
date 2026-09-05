<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeft,
  Heart,
  MessagesSquare,
  Share2,
  ThumbsUp,
} from "lucide-vue-next";

import Loading from "@/components/App/loading.vue";

import { useFollow } from "@/composables/useFollow";
import { usePost } from "@/composables/usePostDetail";
import { useLike } from "@/composables/useLike";

const route = useRoute();
const username = computed(() => route.params.username as string);
const slug = computed(() => route.params.slug as string);
const assetBaseUrl = import.meta.env.VITE_API_URL;
// Post query
const { post, postLoading, postError, postFetching } = usePost(username, slug);
// Like
const likeMutation = useLike();
const likesCount = ref(0);
watch(
  () => post.value?.likes_count,
  (newCount) => {
    if (newCount !== undefined) {
      likesCount.value = newCount;
    }
  },
);
const handleLike = () => {
  if (!post.value) return;
  likeMutation.mutate(post.value.id, {
    onSuccess: (response) => {
      likesCount.value = response.data.likes_count;
    },
  });
};

// Follow mutation
const followMutation = useFollow();
const handleFollow = () => {
  if (!post.value?.author) return;

  followMutation.mutate(post.value.author.username, {
    onSuccess: (response) => {
      if (!post.value?.author) return;

      post.value.author.is_following = response.is_following;
      post.value.author.followers_count = response.followers;
    },
  });
};
</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <!-- Back -->
    <button
      @click="$router.back()"
      class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm transition hover:bg-gray-100 hover:shadow"
    >
      <ArrowLeft class="h-5 w-5" />

      <span class="text-sm font-medium px-2"> Back </span>
    </button>

    <!-- Loading -->
    <Loading v-if="postLoading" />

    <!-- Error -->
    <div v-else-if="postError">Failed to load post.</div>

    <!-- Post not found -->
    <div v-else-if="!post">Post not found.</div>

    <!-- Post -->
    <div v-else>
      <!-- Background refetch -->
      <div v-if="postFetching" class="mt-2 text-sm text-gray-500">
        Refreshing...
      </div>

      <!-- Image -->
      <img
        v-if="post.image"
        :src="`${assetBaseUrl}/storage/${post.image}`"
        :alt="post.title"
        class="mt-6 mb-6 w-full h-64 object-cover"
      />

      <p class="text-xl px-2">Article</p>

      <div class="pl-2 sm:pl-8">
        <!-- Author -->
        <div class="flex gap-8 mt-8 items-center mb-4">
          <p class="text-xl">
            {{ post.author?.name }}
          </p>

          <p class="text-sm text-gray-500">
            {{ post.author?.profile?.career || "No career information" }}
          </p>

          <p class="text-sm text-gray-500">2min read</p>
        </div>
        <!-- FOLLOW / ENGAGEMENT -->
        <div class="mb-6 flex items-center border-b border-gray-100 pb-5">
          <!-- Followers + Follow -->
          <div class="flex items-center gap-5">
            <!-- Follow Button -->
            <button
              type="button"
              :disabled="followMutation.isPending.value"
              @click="handleFollow"
              :class="
                post.author?.is_following
                  ? 'inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60'
                  : 'inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60'
              "
            >
              {{ post.author?.is_following ? "Following" : "Follow" }}
            </button>
          </div>

          <!-- Likes -->
          <button
            type="button"
            :disabled="likeMutation.isPending.value"
            @click="handleLike"
            class="ml-auto inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ThumbsUp class="h-5 w-5" />

            <span class="text-sm font-semibold text-gray-800">
              {{ likesCount }}
            </span>
          </button>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold mt-6 mb-4">
          {{ post.title }}
        </h1>

        <!-- Body -->
        <p class="text-gray-700 mb-6 text-xl break-all whitespace-pre-wrap">
          {{ post.body }}
        </p>
      </div>

      <!-- Actions -->
      <div
        class="flex items-center justify-start gap-4 mt-4 px-2 sm:px-8 cursor-pointer"
      >
        <MessagesSquare />
        <Heart />
        <Share2 />
      </div>
    </div>
  </div>
</template>
