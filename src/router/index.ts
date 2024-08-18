import { createRouter, createWebHashHistory } from 'vue-router';

const HomePage = () => import('@/pages/HomePage.vue');
const TasksPage = () => import('@/pages/TasksPage.vue');
const StudentsPage = () => import('@/pages/StudentsPage.vue');
const SettingsPage = () => import('@/pages/SettingsPage.vue');
const MenuRoutes = [
  { path: '/', component: HomePage },
  { path: '/tasks', component: TasksPage },
  { path: '/students', component: StudentsPage },
  { path: '/settings', component: SettingsPage },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: MenuRoutes,
});
