import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Quiz from "./components/Quiz.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/quiz", component: Quiz },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
