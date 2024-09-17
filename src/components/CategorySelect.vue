<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFetch } from "../composables/useFetch";
import getCategories from "../api/categories";
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const { data, error, loading } = useFetch(getCategories);
const selectedId = ref("");
const router = useRouter();
const route = useRoute();

onMounted(() => {
  selectedId.value = route.query.id ? `${route.query.id}` : "";
});

watch(selectedId, () => {
  const query = route.params;
  if (selectedId.value === "empty") {
    delete query.id;
    router.replace({
      query,
    });
  } else {
    router.replace({
      query: { ...query, id: selectedId.value },
    });
  }
});
</script>
<template>
  <Select v-model:model-value="selectedId" v-if="data">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem key="empty" :value="'empty'">Any category</SelectItem>
        <SelectItem
          :key="category.id"
          v-for="category in data.trivia_categories"
          :value="`${category.id}`"
        >
          {{ category.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <div v-if="loading" class="w-10">
    <div class="loader"></div>
  </div>
  <div v-if="error">
    <p>{{ error }}</p>
  </div>
</template>
