<script setup lang="ts">
import { login } from "@/services/auth.service";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const errorMessage = ref("");
const emailError = ref("");
const passwordError = ref("");
const usernameError = ref("");

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const handleLogin = async () => {
  isLoading.value = true;

  // Clear previous errors
  errorMessage.value = "";
  emailError.value = "";
  passwordError.value = "";

  try {
    const response = await login({
      email: email.value,
      password: password.value,
    });
    authStore.setAuth(response.data.token, response.data.user);

    const redirect = route.query.redirect as string | undefined;

    router.push(redirect || "/");
  } catch (error: any) {
    console.log(error.response?.data);

    const errors = error.response?.data?.errors;

    if (errors?.email) {
      emailError.value = errors.email[0];
    }

    if (errors?.password) {
      passwordError.value = errors.password[0];
    }

    if (errors?.username) {
      usernameError.value = errors.username[0];
    }

    // General error
    if (!errors) {
      errorMessage.value =
        error.response?.data?.message ?? "Unable to sign in.";
    }
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
        <img src="@/assets/logo.png" alt="Logo" class="mx-auto h-20" />
      </div>

      <!-- General Error -->
      <div
        v-if="errorMessage"
        class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
      >
        {{ errorMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :class="[
              'w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2',
              emailError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-gray-500 focus:ring-gray-200',
            ]"
          />
          <p v-if="emailError" class="mt-1 text-sm text-red-500">
            {{ emailError }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <div class="mb-2 flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700"> Password </label>

            <a href="#" class="text-sm text-black hover:underline">
              Forgot Password?
            </a>
          </div>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :class="[
              'w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2',
              passwordError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-gray-500 focus:ring-gray-200',
            ]"
          />

          <p v-if="passwordError" class="mt-1 text-sm text-red-500">
            {{ passwordError }}
          </p>
        </div>

        <!-- Remember -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
            Remember me
          </label>
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
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

          {{ isLoading ? "Signing In..." : "Sign In" }}
        </button>
      </form>

      <!-- Footer -->
      <p class="mt-6 text-center text-sm text-gray-500">
        Don't have an account?

        <router-link
          to="/register"
          class="font-medium text-gray-900 hover:underline"
        >
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>
