<script setup lang="ts">
import { useRouter } from "vue-router";
import Toaster from "./components/ui/toast/Toaster.vue";
import useQuizStore from "./store/quizStore";

const store = useQuizStore();
const router = useRouter();

router.beforeEach((to) => {
  if (store.status !== "ready" && to.path === "/quiz") {
    return { path: "/" };
  }
});
</script>

<template>
  <main class="w-screen h-screen">
    <RouterView />
    <Toaster />
  </main>
</template>
