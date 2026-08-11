<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPublicProfile } from "@/services/public-profile.service";
import { useAuthStore } from "@/stores/auth";
import Loading from "@/components/App/loading.vue";

import type { User, Post } from "@/types/types";
import PublicContent from "./PublicContent.vue";
import AppLayout from "@/components/App/layout.vue";
import guestLayout from "@/components/App/guest-layout.vue";

const route = useRoute();
const authStore = useAuthStore();

const user = ref<User | null>(null);
const posts = ref<Post[]>([]);
const loading = ref(false);

const fetchProfile = async () => {
  loading.value = true;
  const username = route.params.username as string;
  const { data } = await getPublicProfile(username);
  user.value = data;
  posts.value = data.posts ?? [];
  loading.value = false;
};

watch(() => route.params.username, fetchProfile, { immediate: true });
</script>

<template>
  <component :is="authStore.isAuthenticated ? AppLayout : guestLayout">
    <Loading v-if="loading" />

    <PublicContent v-else :user="user" :posts="posts" />
  </component>
</template>
