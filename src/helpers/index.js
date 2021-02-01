import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

export default {
  data() {
    return {
      notificationSystem: {
        options: {
          ballon: {
            position: "topRight",
          },
          info: {
            position: "topRight",
          },
          success: {
            position: "topRight",
          },
          warning: {
            position: "topRight",
          },
          error: {
            position: "topRight",
          },
        },
      },
    };
  },
  created() {
    dayjs.extend(advancedFormat);
  },
  methods: {
    // get minimum and maximum of a price
    getMinMaxPrice(ticketData) {
      const price = [];

      // get the totalprices
      ticketData.map(ticket => {
        price.push(ticket.price);
      });

      // get price minimum and maximum
      const min = Math.min(...price);
      const max = Math.max(...price);

      let minMax;
      max === min
        ? (minMax = `₦ ${max.toLocaleString()}`)
        : (minMax = `₦ ${min.toLocaleString()} - ₦ ${max.toLocaleString()}`);
      return minMax;
    },
    toCurrency(price) {
      return price.toLocaleString();
    },
    shortDate(date) {
      return dayjs(date).format("Do MMMM YYYY");
    },

    longDate(date) {
      return dayjs(date).format("dddd, MMMM Do YYYY, h:mm A");
    },

    handleError(error) {
      if (error === "Network Error") {
        this.$toast.error(
          "Connection not established, please check your internet connection",
          "",
          this.notificationSystem.options.error,
        );
      } else {
        this.$toast.error(error.response.data.message, "", this.notificationSystem.options.error);
      }
    },
  },
  filters: {},
};
