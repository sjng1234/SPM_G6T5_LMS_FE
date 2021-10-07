import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import MyClass from "@/views/MyClass.vue";
import Inbox from "@/views/Inbox.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/MyClass",
    name: "MyClass",
    component: MyClass,
  },
  {
    path: "/Inbox",
    name: "Inbox",
    component: Inbox,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
