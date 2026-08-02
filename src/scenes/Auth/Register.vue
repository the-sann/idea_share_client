<script setup lang="ts">
import { register } from "@/services/auth.service";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  isLoading.value = true;

  try {
    const response = await register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });
    authStore.setAuth(response.data.token, response.data.user);
    router.push({ name: "home" });
  } catch (error: any) {
    console.log(error.response?.data);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <!-- Logo -->
      <div class="mb-8 text-center">
        <img src="@/assets/logo.png" alt="" class="h-20 mx-auto" />
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Name -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Name
          </label>

          <input
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <svg
            v-if="isLoading"
            class="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          {{ isLoading ? "Creating Account..." : "Register" }}
        </button>
      </form>

      <!-- Footer -->
      <p class="mt-6 text-center text-sm text-gray-500">
        Already have an account?
        <router-link to="/" class="font-medium text-gray-900 hover:underline">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>
