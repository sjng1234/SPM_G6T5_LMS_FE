import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import MyClass from "@/views/MyClass.vue";
import Inbox from "@/views/Inbox.vue";
import Login from "@/views/Login.vue";
import CreateCourse from "@/views/CreateCourse.vue";
import CreateClass from "@/views/CreateClass.vue";
import CreateQuiz from "@/views/CreateQuiz.vue";
import CreateChapter from "@/views/CreateChapter.vue";
import CourseAdmin from "@/views/CourseAdmin.vue";
import ClassAdmin from "@/views/ClassAdmin.vue";
import ChapterAdmin from "@/views/ChapterAdmin.vue";
import Class from "@/views/Class.vue";
import Quiz from "@/views/Quiz.vue";
import Materials from "@/views/Materials.vue";

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
    path: "/CreateQuiz/:id",
    name: "CreateQuiz",
    component: CreateQuiz,
    props: true,
  },
  {
    path: "/CreateChapter/:id",
    name: "CreateChapter",
    component: CreateChapter,
    props: true,
  },
  {
    path: "/ChapterAdmin/:id",
    name: "ChapterAdmin",
    component: ChapterAdmin,
    props: true,
  },
  {
    path: "/Quiz/:id",
    name: "Quiz",
    component: Quiz,
    props: true,
  },
  {
    path: "/Class/:course_id",
    name: "Class",
    component: Class,
    props: true,
  },
  {
    path: "/Materials/:course_id",
    name: "Materials",
    component: Materials,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
