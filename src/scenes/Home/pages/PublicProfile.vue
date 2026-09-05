<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Loading from "@/components/App/loading.vue";
import PublicContent from "./PublicContent.vue";

import AppLayout from "@/components/App/layout.vue";
import GuestLayout from "@/components/App/guest-layout.vue";

import { usePublicProfile } from "@/composables/usePublicProfile";

const route = useRoute();
const authStore = useAuthStore();

const username = computed(() => route.params.username as string);

const { user, profileLoading, profileError, profileErrorMessage } =
  usePublicProfile(username);
</script>

<template>
  <component :is="authStore.isAuthenticated ? AppLayout : GuestLayout">
    <Loading v-if="profileLoading" />

    <div v-else-if="profileError">
      Failed to load profile.

      <p class="text-sm text-red-500">
        {{ profileErrorMessage }}
      </p>
    </div>

    <div v-else-if="!user">User not found.</div>

    <template v-else>
      <PublicContent :user="user" :posts="user.posts ?? []" />
    </template>
  </component>
</template>
