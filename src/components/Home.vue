<script lang="ts" setup>
import { computed, ref, watch } from "vue";

import { useFetch } from "../composables/useFetch";
import getCategories from "../api/categories";
import { difficulty, type } from "../data";

import Input from "./ui/input/Input.vue";
import Button from "./ui/button/Button.vue";
import CustomSelect from "./CustomSelect.vue";
import useQuizStore from "@/store/quizStore";
import { useRouter } from "vue-router";

const { data, loading } = useFetch(getCategories);
const store = useQuizStore();
const router = useRouter();

const categoryItems = computed(() =>
  data.value?.trivia_categories.map((item) => ({
    value: `${item.id}`,
    label: item.name,
  }))
);

const settings = ref<{
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}>({
  amount: 10,
  category: "",
  difficulty: "",
  type: "",
});

watch(
  () => settings.value.amount,
  (value) => {
    if (typeof value !== "number" || value < 1) {
      settings.value.amount = 1;
    }
    if (value > 50) {
      settings.value.amount = 50;
    }
  }
);

async function submitHandler() {
  const params = {
    ...settings.value,
    amount: settings.value.amount.toString(),
  };
  Object.keys(params).forEach((key) => {
    const value = params[key as keyof typeof params];

    if (value === "" || value === "empty") {
      delete params[key as keyof typeof params];
    }
  });

  const result = await store.fetchQuestions(params);
  if (result) router.push("/quiz");
}
</script>
<template>
  <section class="h-full flex justify-center items-center">
    <form @submit.prevent="submitHandler" class="w-1/3 flex flex-col gap-5">
      <Input v-model.number="settings.amount" type="number" />
      <CustomSelect
        title="category"
        v-if="categoryItems !== undefined"
        :select-items="categoryItems"
        v-model:selected="settings.category"
      />
      <div v-if="loading" class="loader h-10 w-10 self-center"></div>
      <CustomSelect
        :title="`difficulty`"
        :select-items="difficulty"
        v-model:selected="settings.difficulty"
      />
      <CustomSelect
        title="type"
        :select-items="type"
        v-model:selected="settings.type"
      />
      <Button type="submit">Get Quiz</Button>
    </form>
  </section>
</template>
