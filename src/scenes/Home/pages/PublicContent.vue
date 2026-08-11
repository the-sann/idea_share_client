<script setup lang="ts">
import type { User, Post } from "@/types/types";
import PostCard from "../PostCard.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useFollow } from "@/composables/useFollow.ts";
defineProps<{
  user: User | null;
  posts: Post[];
}>();

const router = useRouter();
const authStore = useAuthStore();
const isFollowing = ref(false);
</script>
<template>
  <article class="bg-white p-4 ring-2 ring-indigo-50 sm:p-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <!-- Avatar -->
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160"
        class="size-16 rounded-full object-cover sm:size-20"
        alt=""
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div
          class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="min-w-0">
            <h3 class="text-lg font-semibold truncate">
              Some Interesting Podcast Title
            </h3>

            <p class="mt-2 text-sm text-gray-700 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <p class="text-sm text-gray-600 whitespace-nowrap">
              <span class="font-semibold">{{
                user?.followers_count ?? 0
              }}</span>
              Followers
            </p>

            <button
              type="button"
              @click=""
              :class="
                isFollowing
                  ? 'rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300'
                  : 'rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600'
              "
            >
              {{ isFollowing ? "Following" : "Follow" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
  <PostCard v-for="post in posts" :key="post.id" :post="post" />
</template>
