<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { X, SquarePen, RouteIcon } from "lucide-vue-next";

const baseUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const authStore = useAuthStore();

const props = defineProps<{
  showDrawer: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
const handleLogout = () => {
  authStore.logout();
  router.push({ name: "home" });
};
const goToEditProfile = () => {
  router.push({ name: "edit-profile" });
};
const goToProfile = () => {
  if (!authStore.user?.username) return;

  router.push({
    name: "public-profile",
    params: {
      username: authStore.user.username,
    },
  });

  emit("close");
};
</script>

<template>
  <!-- backdrop -->
  <div
    v-if="showDrawer"
    class="fixed inset-0 z-40 bg-black/40"
    @click="emit('close')"
  />
  <!-- drawer -->
  <aside
    class="fixed top-0 right-0 z-50 h-screen w-full md:w-96 flex flex-col transform bg-white shadow-xl transition-transform duration-300"
    :class="showDrawer ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b p-4">
      <h2 class="text-lg font-semibold">User Details</h2>

      <button @click="emit('close')">
        <X class="h-6 w-6" />
      </button>
    </div>

    <!-- Content -->
    <div class="overflow-y-auto p-4 flex-1">
      <div class="flow-root">
        <dl class="-my-3 divide-y divide-gray-200 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Avatar</dt>
            <img
              alt=""
              :src="`${baseUrl}/storage/${authStore.user?.profile?.profile_image}`"
              class="size-20 rounded object-cover border"
            />
            <button
              class="flex items-center gap-2 py-4 font-medium text-gray-900"
              @click="goToProfile"
            >
              <RouteIcon :size="18" />
              View Profile
            </button>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Name</dt>
            <dd class="text-gray-700">{{ authStore.user?.name }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">User Name</dt>
            <dd class="text-gray-700">{{ authStore.user?.username }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Email</dt>
            <dd class="text-gray-700">{{ authStore.user?.email }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Bio</dt>
            <dd class="text-gray-700">{{ authStore.user?.profile?.bio }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Career</dt>
            <dd class="text-gray-700">
              {{ authStore.user?.profile?.career }}
            </dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Location</dt>
            <dd class="text-gray-700">
              {{ authStore.user?.profile?.location }}
            </dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Website</dt>

            <dd>
              <a
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 underline hover:text-blue-800"
              >
                {{ authStore.user?.profile?.website }}
              </a>
            </dd>
          </div>
          <div class="grid grid-cols-1 gap-1 py-3">
            <dt class="font-medium text-gray-900">Birthday</dt>
            <dd class="text-gray-700">
              {{ authStore.user?.profile?.birthday }}
            </dd>
          </div>

          <div class="flex justify-start gap-4">
            <button class="font-medium text-red-900 py-4" @click="handleLogout">
              Logout
            </button>
            <button
              class="flex items-center gap-2 py-4 font-medium text-gray-900"
              @click="goToEditProfile"
            >
              <SquarePen :size="18" />
              Edit Profile
            </button>
          </div>
        </dl>
      </div>
    </div>
  </aside>
</template>
