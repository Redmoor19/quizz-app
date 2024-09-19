import getQuestions from "@/api/questions";
import { useToast } from "@/components/ui/toast";
import { Question } from "@/types/questions";
import { defineStore } from "pinia";

type Status = "idle" | "ready" | "game" | "finished";

type State = {
  status: Status;
  questions: Question[];
  activeQuestion: number;
  totalQuestions: number;
  results: boolean[];
};

const { toast } = useToast();

const useQuizStore = defineStore("quiz", {
  state: (): State => ({
    status: "idle",
    questions: [],
    activeQuestion: 0,
    totalQuestions: 0,
    results: [],
  }),
  getters: {
    currentQuestion: (state) => state.questions[state.activeQuestion],
    correct: (state) =>
      state.results.reduce((acc, curr) => (curr ? (acc += 1) : acc), 0),
    incorrect: (state) =>
      state.results.reduce((acc, curr) => (!curr ? (acc += 1) : acc), 0),
  },
  actions: {
    async fetchQuestions(params: { [key: string]: string }) {
      const res = await getQuestions(params);
      if ("error" in res) {
        toast({
          variant: "destructive",
          title: res.error,
        });
        return false;
      } else {
        this.status = "ready";
        this.questions = res.results;
        this.totalQuestions = res.results.length;
        return true;
      }
    },
    startGame() {
      this.status = "game";
    },
    answerCurrent(isCorrect: boolean) {
      this.results[this.activeQuestion] = isCorrect;
    },
    nextQuestion() {
      if (this.activeQuestion < this.totalQuestions) this.activeQuestion++;
    },
    finishGame() {
      this.status = "finished";
    },
    reset() {
      this.$reset();
    },
  },
});

export default useQuizStore;
