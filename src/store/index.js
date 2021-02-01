import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    eventsData: {
      events: [],
      pageDetails: {},
    },
    tickets: [],
    loading: false,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_EVENTS(state, payload) {
      state.eventsData.events.push(...payload);
    },
    SET_PAGE_DATA(state, payload) {
      Vue.set(state.eventsData, "pageDetails", payload);
    },
    CLEAR(state) {
      state.tickets = "";
      window.href("/");
    },
    INCREMENT_TICKET(state, payload) {
      const ticket = state.tickets.find(t => t.id === payload);
      const indexOfTicket = state.tickets.indexOf(ticket);
      ticket.count++;
      if (ticket.count >= ticket.qty_available) {
        ticket.count = ticket.qty_available;
      }
      state.tickets.splice(indexOfTicket, 1, ticket);
    },
    DECREMENT_TICKET(state, payload) {
      const ticket = state.tickets.find(t => t.id === payload);
      const indexOfTicket = state.tickets.indexOf(ticket);
      ticket.count--;
      if (ticket.count <= 0) {
        ticket.count = 0;
      }
      state.tickets.splice(indexOfTicket, 1, ticket);
    },
    SET_TICKETS(state, payload) {
      state.tickets = [...payload];
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("SET_LOADING", payload);
    },
    clear({ commit }) {
      commit("CLEAR ");
    },
    async getEvents({ commit }, page) {
      commit("SET_LOADING", true);
      try {
        const { data } = await axios.get(`events?page${page}`);
        const events = await Promise.all(
          data.data.events.map(async event => {
            const { data } = await axios.get(`ticket-types/events/${event.id}`);
            event.tickets = data.data;
            return event;
          }),
        );
        commit("SET_EVENTS", events);
        commit("SET_PAGE_DATA", data.data.pageDetails);
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
      }
    },
    registerFree(_, { id, userDetails }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`events/${id}/register`, userDetails)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    incrementTicket({ commit }, id) {
      commit("INCREMENT_TICKET", id);
    },
    decrementTicket({ commit }, id) {
      commit("DECREMENT_TICKET", id);
    },
    setTickets({ commit }, tickets) {
      const newTickets = tickets.map(event => {
        event.count = 0;
        return event;
      });
      commit("SET_TICKETS", newTickets);
    },
  },
  getters: {
    events: state => state.eventsData.events,
    loading: state => state.loading,
    pageDetails: state => state.eventsData.pageDetails,
    tickets: state => state.tickets,
  },
  plugins: [vuexLocal.plugin],
});
