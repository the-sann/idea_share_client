<script setup lang="ts">
import type { User, Post } from "@/types/types";
import PostCard from "../PostCard.vue";
import { useFollow } from "@/composables/useFollow";
import { useAuthStore } from "@/stores/auth.ts";
import router from "@/router/index.ts";

const props = defineProps<{
  user: User | null;
  posts: Post[];
}>();

const followMutation = useFollow();

const assetBaseUrl = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();

const handleFollow = () => {
  // User is not logged in
  if (!authStore.isAuthenticated) {
    router.push({
      name: "login",
      query: {
        redirect: router.currentRoute.value.fullPath,
      },
    });

    return;
  }

  if (!props.user) return;

  followMutation.mutate(props.user.username);
};
</script>

<template>
  <div class="space-y-6">
    <!-- User Profile -->
    <article
      v-if="props.user"
      class="bg-white p-4 ring-2 ring-indigo-50 sm:p-6"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <!-- Avatar -->
        <img
          v-if="props.user.profile?.profile_image"
          :src="`${assetBaseUrl}/storage/${props.user.profile.profile_image}`"
          :alt="props.user.name"
          class="size-16 rounded-full object-cover sm:size-20"
        />

        <!-- Default avatar if user has no image -->
        <div
          v-else
          class="flex size-16 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-600 sm:size-20"
        >
          {{ props.user.name?.charAt(0).toUpperCase() }}
        </div>

        <!-- User information -->
        <div class="min-w-0 flex-1">
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <!-- Name and username -->
            <div class="min-w-0">
              <h2 class="truncate text-xl font-bold">
                {{ props.user.name }}
              </h2>

              <!-- Username + Career -->
              <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <p class="text-sm text-gray-500">@{{ props.user.username }}</p>

                <span
                  v-if="props.user.profile?.career"
                  class="text-sm text-gray-600"
                >
                  {{ props.user.profile.career }}
                </span>
              </div>

              <!-- Followers -->
              <div class="mt-2 flex items-baseline gap-1.5">
                <span class="text-base font-bold text-gray-900">
                  {{ props.user.followers_count ?? 0 }}
                </span>

                <span class="text-sm text-gray-500"> followers </span>
              </div>
            </div>

            <!-- Follow section -->
            <div class="flex shrink-0 items-center gap-3">
              <button
                type="button"
                :disabled="followMutation.isPending.value"
                @click="handleFollow"
                :class="
                  props.user.is_following
                    ? 'rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 disabled:opacity-50'
                    : 'rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-50'
                "
              >
                {{
                  followMutation.isPending.value
                    ? "..."
                    : props.user.is_following
                      ? "Following"
                      : "Follow"
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Posts -->
    <section>
      <div class="mb-4">
        <h2 class="text-xl font-bold">Posts</h2>

        <p class="text-sm text-gray-500">Posts by {{ props.user?.name }}</p>
      </div>

      <!-- No posts -->
      <div
        v-if="props.posts.length === 0"
        class="rounded-lg border border-gray-200 bg-white p-8 text-center"
      >
        <p class="text-gray-500">This user hasn't created any posts yet.</p>
      </div>

      <!-- Post list -->
      <div v-else class="space-y-4">
        <PostCard v-for="post in props.posts" :key="post.id" :post="post" />
      </div>
    </section>
  </div>
</template>
