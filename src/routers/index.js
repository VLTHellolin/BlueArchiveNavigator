import { createRouter, createWebHashHistory } from "vue-router";

const PageHome = () => import("../components/PageHome.vue");
const PageTasks = () => import("../components/PageTasks.vue");
const PageStudents = () => import("../components/PageStudents.vue");
const PageSettings = () => import("../components/PageSettings.vue");
const MenuRoutes = [
  { path: "/", component: PageHome },
  { path: "/tasks", component: PageTasks },
  { path: "/students", component: PageStudents },
  { path: "/settings", component: PageSettings }
];
export default createRouter({
  history: createWebHashHistory(),
  routes: MenuRoutes
});
