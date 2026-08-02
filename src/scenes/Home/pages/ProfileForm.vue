<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { updateProfile } from "@/services/auth.service";
import { useRouter } from "vue-router";
import { X } from "lucide-vue-next";

const authStore = useAuthStore();
const router = useRouter();

const name = ref(authStore.user?.name ?? "");
const email = ref(authStore.user?.email ?? "");

const bio = ref(authStore.user?.profile?.bio ?? "");
const career = ref(authStore.user?.profile?.career ?? "");
const location = ref(authStore.user?.profile?.location ?? "");
const website = ref(authStore.user?.profile?.website ?? "");
const birthday = ref(authStore.user?.profile?.birthday ?? "");

const loading = ref(false);
const message = ref("");

const profileImage = ref<File | null>(null);

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    profileImage.value = target.files[0];
  }
};

const save = async () => {
  try {
    loading.value = true;
    message.value = "";

    const formData = new FormData();

    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("bio", bio.value);
    formData.append("career", career.value);
    formData.append("location", location.value);
    formData.append("website", website.value);
    formData.append("birthday", birthday.value);

    if (profileImage.value) {
      formData.append("profile_image", profileImage.value);
    }

    const response = await updateProfile(formData);

    authStore.setAuth(authStore.token, response.data.user);

    message.value = "Profile updated successfully";
    router.push({ name: "home" });
  } catch (error) {
    console.error(error);
    message.value = "Failed to update profile";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto max-w-xl space-y-5 p-4">
    <X
      @click="router.push({ name: 'home' })"
      class="size-6 cursor-pointer text-gray-700 transition hover:text-black"
    />
    <!-- Avatar -->
    <label
      for="File"
      class="block rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6"
    >
      <div class="flex items-center justify-center gap-4">
        <span class="font-medium"> Upload your Profile image </span>

        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
          />
        </svg>
      </div>

      <input
        multiple
        type="file"
        id="File"
        class="sr-only"
        @change="handleImageChange"
      />
    </label>
    <!-- Name -->
    <div>
      <label class="mb-1 block font-medium"> Name </label>

      <input
        v-model="name"
        type="text"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Email -->
    <div>
      <label class="mb-1 block font-medium"> Email </label>

      <input
        v-model="email"
        type="email"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Bio -->
    <div>
      <label class="mb-1 block font-medium"> Bio </label>

      <textarea
        v-model="bio"
        rows="4"
        placeholder="Tell us about yourself..."
        class="w-full resize-none rounded-lg border p-3 outline-none focus:border-black"
      ></textarea>
    </div>

    <!-- Career -->
    <div>
      <label class="mb-1 block font-medium"> Career </label>

      <input
        v-model="career"
        type="text"
        placeholder="Software Developer"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Location -->
    <div>
      <label class="mb-1 block font-medium"> Location </label>

      <input
        v-model="location"
        type="text"
        placeholder="Cambodia"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Website -->
    <div>
      <label class="mb-1 block font-medium"> Website </label>

      <input
        v-model="website"
        type="url"
        placeholder="https://example.com"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Birthday -->
    <div>
      <label class="mb-1 block font-medium"> Birthday </label>

      <input
        v-model="birthday"
        type="date"
        class="w-full rounded-lg border p-3 outline-none focus:border-black"
      />
    </div>

    <!-- Buttons -->
    <div class="flex gap-4">
      <button
        @click="save"
        :disabled="loading"
        class="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {{ loading ? "Saving..." : "Save" }}
      </button>

      <button
        @click="router.push({ name: 'home' })"
        class="rounded-lg border bg-white px-6 py-3 text-black transition hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>

    <p v-if="message" class="text-sm text-green-600">
      {{ message }}
    </p>
  </div>
</template>
