<script setup lang="ts"></script>

<template>
  <nav class="mb-8 flex items-center justify-between gap-4 p-1">
    <RouterLink :to="{ name: 'home' }">
      <img src="@/assets/logo.png" alt="Logo" class="h-15" />
    </RouterLink>

    <div class="flex items-center gap-2 sm:gap-4">
      <RouterLink
        :to="{ name: 'login' }"
        class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Login
      </RouterLink>

      <RouterLink
        :to="{ name: 'register' }"
        class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Register
      </RouterLink>
    </div>
  </nav>
</template>
