import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
  ],
});
export default router;
