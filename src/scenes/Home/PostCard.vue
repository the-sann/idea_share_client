<script setup lang="ts">
import type { Post } from "@/types/types";
import { MoveRight } from "lucide-vue-next";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: Post;
}>();
const router = useRouter();
const baseUrl = import.meta.env.VITE_API_URL;
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const viewPost = () => {
  router.push({
    name: "post-show",
    params: {
      username: props.post.author.username,
      slug: props.post.slug,
    },
  });
};
const viewProfile = () => {
  router.push({
    name: "public-profile",
    params: {
      username: props.post.author.username,
    },
  });
};
</script>

<template>
  <div class="mt-16">
    <div class="flex items-start gap-4">
      <!-- Author Avatar -->
      <img
        @click="viewProfile"
        :src="
          post.author?.profile?.profile_image
            ? `${baseUrl}/storage/${post.author.profile.profile_image}`
            : `https://ui-avatars.com/api/?name=${post.author?.name}`
        "
        :alt="post.author?.name"
        class="size-20 rounded object-cover cursor-pointer"
      />

      <div>
        <h3
          @click="viewProfile"
          class="font-medium text-blue-600 hover:underline cursor-pointer sm:text-lg"
        >
          {{ post.author?.name }}
        </h3>
        <h2 class="font-medium text-gray-900 sm:text-lg">
          {{ post.title }}
        </h2>
        <p class="mt-0.5 text-gray-700 line-clamp-2 sm:text-sm">
          {{ post.body }}
        </p>

        <dl class="mt-4 mb-4 flex gap-3 lg:gap-4">
          <!-- Published -->
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

            <dd class="text-xs text-gray-700">
              {{ formatDate(post.created_at) }}
            </dd>
          </div>

          <!-- Category -->
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

            <dd class="text-xs text-gray-700">
              {{ post.category?.name }}
            </dd>
          </div>

          <!-- View -->
          <div class="flex items-center gap-2">
            <dd
              @click="viewPost"
              class="cursor-pointer text-xs text-gray-700 hover:text-blue-700"
            >
              <MoveRight class="inline-block size-4" />
              View More
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Post Image -->
    <img
      v-if="post.image"
      :src="`http://localhost:8000/storage/${post.image}`"
      :alt="post.title"
      class="h-64 w-full object-cover sm:h-80 lg:h-96"
    />
  </div>
</template>
