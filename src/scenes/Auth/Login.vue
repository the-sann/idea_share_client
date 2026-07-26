<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log({
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <!-- Logo -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p class="mt-2 text-gray-500">Sign in to continue to your account</p>
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
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <!-- Password -->
        <div>
          <div class="mb-2 flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700"> Password </label>

            <a href="#" class="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
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
          class="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>

      <!-- Footer -->
      <p class="mt-6 text-center text-sm text-gray-500">
        Don't have an account?
        <a href="#" class="font-medium text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  </div>
</template>
