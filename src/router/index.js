import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import MyClass from "@/views/MyClass.vue";
import Inbox from "@/views/Inbox.vue";
import Login from "@/views/Login.vue";
import CreateCourse from "@/views/CreateCourse.vue";
import CreateClass from "@/views/CreateClass.vue";
import CourseAdmin from "@/views/CourseAdmin.vue";
import ClassAdmin from "@/views/ClassAdmin.vue";
import Class from "@/views/Class.vue";

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
  {
    path: "/Login",
    name: "Login",
    component: Login,
    props: true,
  },
  {
    path: "/CreateCourse",
    name: "CreateCourse",
    component: CreateCourse,
    props: true,
  },
  {
    path: "/CourseAdmin",
    name: "CourseAdmin",
    component: CourseAdmin,
    props: true,
  },
  {
    path: "/ClassAdmin/:course_id",
    name: "ClassAdmin",
    component: ClassAdmin,
    props: true,
  },
  {
    path: "/CreateClass",
    name: "CreateClass",
    component: CreateClass,
    props: true,
  },
  {
    path: "/Class/:course_id",
    name: "Class",
    component: Class,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
