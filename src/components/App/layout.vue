<script setup lang="ts">
import { ref } from "vue";
import UserDrawer from "./UserDrawer.vue";
import Navbar from "./navbar.vue";

const showDrawer = ref(false);

const openDrawer = () => {
  showDrawer.value = true;
};

const closeDrawer = () => {
  showDrawer.value = false;
};
</script>

<template>
  <div class="mx-auto w-full max-w-7xl py-5">
    <!-- Navbar -->
    <Navbar @open-drawer="openDrawer" />

    <!-- Page Content -->
    <main>
      <slot />
    </main>

    <UserDrawer :showDrawer="showDrawer" @close="closeDrawer" />
  </div>
</template>
