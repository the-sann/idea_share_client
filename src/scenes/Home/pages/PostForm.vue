<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { X } from "lucide-vue-next";
import { createPost } from "@/services/post.service";

const router = useRouter();

const title = ref("");
const body = ref("");
const categoryId = ref<number | null>(null);

const image = ref<File | null>(null);

const loading = ref(false);
const message = ref("");

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    image.value = target.files[0];
  }
};

const save = async () => {
  try {
    loading.value = true;
    message.value = "";

    const formData = new FormData();

    formData.append("title", title.value);
    formData.append("body", body.value);

    if (categoryId.value) {
      formData.append("category_id", String(categoryId.value));
    }

    if (image.value) {
      formData.append("image", image.value);
    }

    await createPost(formData);

    message.value = "Post created successfully";

    router.push({ name: "home" });
  } catch (error: any) {
    console.log(error.response?.data);
    message.value = "Failed to create post";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto max-w-xl space-y-5 p-4">
    <X
      @click="router.push({ name: 'home' })"
      class="size-6 cursor-pointer text-gray-700 hover:text-black"
    />

    <!-- Image -->
    <label
      for="image"
      class="block rounded border border-gray-300 p-4 shadow-sm"
    >
      <div class="flex justify-center gap-3">
        <span class="font-medium"> Upload Post Image </span>

        <svg
          class="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75"
          />
        </svg>
      </div>

      <input
        id="image"
        type="file"
        class="sr-only"
        @change="handleImageChange"
      />
    </label>

    <!-- Title -->
    <div>
      <label class="mb-1 block font-medium"> Title </label>

      <input
        v-model="title"
        type="text"
        placeholder="Post title"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Body -->
    <div>
      <label class="mb-1 block font-medium"> Content </label>

      <textarea
        v-model="body"
        rows="6"
        placeholder="Write your post..."
        class="w-full resize-none rounded-lg border p-3 outline-none focus:border-black"
      ></textarea>
    </div>

    <!-- Category -->
    <div>
      <label class="mb-1 block font-medium"> Category ID </label>

      <input
        v-model.number="categoryId"
        type="number"
        placeholder="1"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Buttons -->
    <div class="flex gap-4">
      <button
        @click="save"
        :disabled="loading"
        class="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {{ loading ? "Saving..." : "Create" }}
      </button>

      <button
        @click="router.push({ name: 'home' })"
        class="rounded-lg border px-6 py-3 hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>

    <p v-if="message" class="text-sm text-green-600">
      {{ message }}
    </p>
  </div>
</template>
