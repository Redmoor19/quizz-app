<script lang="ts" setup>
import { useRouter } from "vue-router";
import Input from "./ui/input/Input.vue";
import { ref } from "vue";

const router = useRouter();
const questions = ref(9);

function navigate() {
  router.push({
    path: "/quiz",
    replace: false,
  });
}
</script>
<template>
  <h1>Hello</h1>
  <Input v-model:model-value="questions" type="number" />
  <CategorySelect />
  <button @click="navigate">Go</button>
</template>
