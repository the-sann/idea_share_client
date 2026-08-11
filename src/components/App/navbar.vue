<script setup lang="ts">
import { Menu } from "lucide-vue-next";
const emit = defineEmits<{
  (e: "open-drawer"): void;
}>();
</script>

<template>
  <nav class="flex items-center justify-between mb-8 px-2 sm:px-0 py-4">
    <RouterLink :to="{ name: 'home' }">
      <img src="@/assets/logo.png" alt="Logo" class="h-15" />
    </RouterLink>

    <button @click="emit('open-drawer')">
      <Menu :size="32" />
    </button>
  </nav>
</template>
