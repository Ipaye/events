import Vue from "vue";
import VueRouter from "vue-router";

// component imports
const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");
const SingleEvent = () => import(/* webpackChunkName: "event" */ "@/views/SingleEvent.vue");
const NoTickets = () => import(/* webpackChunkName: "no-ticket" */ "@/views/NoTickets.vue");
const EventCheckout = () => import(/* webpackChunkName: "register" */ "@/views/EventCheckout.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/didnt-get-ticket",
    name: "NoTickets",
    component: NoTickets,
  },
  {
    path: "/event/:id",
    name: "SingleEventView",
    component: SingleEvent,
    props: true,
  },
  {
    path: "/event/:id/register",
    name: "EventCheckoutView",
    component: EventCheckout,
    props: true,
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
