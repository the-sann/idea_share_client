<script setup lang="ts">
import GuestNavbar from "./guest-navbar.vue";
</script>

<template>
  <div class="mx-auto w-full max-w-7xl py-5">
    <GuestNavbar />
    <main class="mx-auto max-w-7xl px-4 py-5">
      <slot />
    </main>
  </div>
</template>
