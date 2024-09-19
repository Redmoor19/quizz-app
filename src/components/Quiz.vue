<script lang="ts" setup>
import useQuizStore from "@/store/quizStore";
import Button from "./ui/button/Button.vue";
import Game from "./Game.vue";
import { computed } from "vue";

const store = useQuizStore();

const currentQuestion = computed(() => store.currentQuestion);
const results = computed(() => store.results);
const active = computed(() => store.activeQuestion + 1);

const percent = 100 / store.totalQuestions;
</script>
<template>
  <div class="p-10 flex justify-center items-center h-screen">
    <div
      v-if="store.status === 'ready'"
      class="flex flex-col items-center gap-7"
    >
      <h1 class="text-center text-4xl">
        Your have {{ store.totalQuestions }} questions!
      </h1>
      <Button @click="store.startGame">Start quiz!</Button>
    </div>
    <div v-if="store.status === 'game'" class="space-y-5 w-1/2">
      <Game
        :active-question="active"
        :total="store.totalQuestions"
        :question="currentQuestion"
        @next="store.nextQuestion"
        @answer="store.answerCurrent"
      />
      <div class="flex w-full border border-border h-3 rounded">
        <div
          v-for="result in results"
          class="rounded-full"
          :class="[result ? 'bg-green-500' : 'bg-red-500', `w-[${percent}%]`]"
        ></div>
      </div>
    </div>
  </div>
</template>
