<script lang="ts" setup>
import useQuizStore from "@/store/quizStore";
import Button from "./ui/button/Button.vue";
import Game from "./Game.vue";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

const store = useQuizStore();
const router = useRouter();

const currentQuestion = computed(() => store.currentQuestion);
const results = computed(() => store.results);
const active = computed(() => store.activeQuestion + 1);
const over = computed(() => results.value.length === store.totalQuestions);

watch(
  () => store.status,
  (value) => {
    if (value === "idle") router.push("/");
  }
);

const percent = 100 / store.totalQuestions;
</script>
<template>
  <div class="p-10 flex justify-center items-center h-screen">
    <div
      v-if="store.status === 'ready'"
      class="flex flex-col items-center gap-7"
    >
      <h2 class="text-center text-4xl">
        You have {{ store.totalQuestions }} questions to answer
      </h2>
      <Button @click="store.startGame">Start quiz!</Button>
    </div>
    <div v-if="store.status === 'game'" class="space-y-5 w-1/2">
      <h3 class="text-2xl text-bold">
        {{ active }} question out of {{ store.totalQuestions }}
      </h3>

      <div v-if="results.length > 0">
        <div class="flex w-full border border-border h-3 rounded">
          <div
            v-for="result in results"
            class="rounded-full"
            :class="[result ? 'bg-green-500' : 'bg-red-500', `w-[${percent}%]`]"
          ></div>
        </div>
        <p class="text-right text-2xl tracking-wide">
          <span class="text-green-500">{{ store.correct }}</span> :
          <span class="text-red-500">{{ store.incorrect }}</span>
        </p>
      </div>
      <Game
        :active-question="active"
        :over="over"
        :question="currentQuestion"
        @next="store.nextQuestion"
        @answer="store.answerCurrent"
        @finish="store.finishGame"
      />
    </div>
    <div v-if="store.status === 'finished'" class="text-center space-y-6">
      <h3 class="text-5xl tracking-wide">Congratulations!</h3>
      <p class="text-xl">
        Your result if {{ store.correct }} out of
        {{ store.totalQuestions }} questions
      </p>
      <Button @click="store.$reset()">Start over</Button>
    </div>
  </div>
</template>
