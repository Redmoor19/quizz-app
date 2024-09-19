<script lang="ts" setup>
import { Question } from "@/types/questions";
import Button from "./ui/button/Button.vue";
import { computed, ref, watch } from "vue";
import shuffleArray from "@/utils/shuffleArray";

const { question } = defineProps<{
  question: Question;
  activeQuestion: number;
  total: number;
}>();
const emit = defineEmits<{
  (e: "answer", isCorrect: boolean): void;
  (e: "next"): void;
}>();

const options = computed(() =>
  shuffleArray([question.correct_answer, ...question.incorrect_answers])
);
const answer = ref("");

function buttonVariant(option: string) {
  if (option === answer.value && option === question.correct_answer) {
    return "correct";
  }
  if (option === answer.value && option !== question.correct_answer) {
    return "destructive";
  }
  if (answer.value !== "" && option == question.correct_answer) {
    return "correct";
  }

  return "outline";
}

watch(
  () => answer.value,
  (value) => {
    if (value !== "") emit("answer", value === question.correct_answer);
  }
);

function nextQuestion() {
  answer.value = "";
  emit("next");
}
</script>
<template>
  <div class="flex flex-col gap-7">
    <h1 v-html="`(${activeQuestion}/${total}) ${question.question}`"></h1>
    <div class="grid grid-cols-2 gap-5 justify-center items-center">
      <Button
        v-for="option in options"
        :variant="buttonVariant(option)"
        @click="answer = option"
        :disabled="answer !== ''"
        :class="answer === option && 'ring-2 ring-yellow-500 ring-offset-2'"
        v-html="option"
      >
      </Button>
    </div>
    <Button v-if="answer !== ''" @click="nextQuestion">Next question</Button>
  </div>
</template>
