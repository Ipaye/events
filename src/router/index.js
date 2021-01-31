import Vue from "vue";
import VueRouter from "vue-router";

// component imports
const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");
const SingleEvent = () => import(/* webpackChunkName: "event" */ "@/views/SingleEvent.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/event/:id",
    name: "SingleEventView",
    component: SingleEvent,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
