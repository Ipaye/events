import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueIziToast from "vue-izitoast";

// Global components
import Navbar from "@/components/layout/Navbar";
import Spinner from "@/components/Spinner";
import Footer from "@/components/layout/Footer";

import "izitoast/dist/css/iziToast.min.css";
axios.defaults.baseURL = "https://eventsflw.herokuapp.com/v1";

// Component registration
Vue.component("Navbar", Navbar);
Vue.component("Footer", Footer);
Vue.component("Spinner", Spinner);

Vue.use(VueIziToast);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
