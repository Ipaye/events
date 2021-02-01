<template>
  <form class="form">
    <div class="form__group">
      <label class="form__group-label" for="name">Full name</label>
      <input
        class="form__group-input"
        type="text"
        v-model="userDetails.name"
        :class="{ 'form__group-input-error': $v.userDetails.name.$error }"
        @input="$v.userDetails.name.$touch()"
      />
      <div v-if="$v.userDetails.name.$error" class="form__group-error">
        Name is required.
      </div>
    </div>
    <div class="form__group">
      <label class="form__group-label" for="email"> Email address</label>
      <input
        class="form__group-input"
        type="email"
        v-model.trim="userDetails.email"
        :class="{ 'form__group-input-error': $v.userDetails.email.$error }"
        @input="$v.userDetails.email.$touch()"
      />
      <div v-if="$v.userDetails.email.$error" class="form__group-error">
        Email is required and should be a valid email.
      </div>
    </div>
    <div class="form__group">
      <label class="form__group-label" for="number">Phone number</label>
      <input
        type="text"
        class="form__group-input"
        v-model.trim="userDetails.phone"
        :class="{ 'form__group-input-error': $v.userDetails.phone.$error }"
        @input="$v.userDetails.phone.$touch()"
      />
      <div v-if="$v.userDetails.phone.$error" class="form__group-error">
        Phone number is required.
      </div>
    </div>

    <div class="checkout-wrapper">
      <p class="label">Total payment</p>
      <p class="amount">N{{ toCurrency(total) }}</p>
    </div>
    <div class="button-wrapper">
      <button class="button-normal" @click.prevent="MakePayment" :disabled="$v.$error || $v.$invalid">
        PAY N{{ toCurrency(total) }}
      </button>
    </div>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import axios from "axios";

export default {
  name: "CheckoutForm",
  mixins: [validationMixin],
  props: ["total", "vat", "subtotal", "id"],
  data() {
    return {
      userDetails: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  validations: {
    userDetails: {
      name: { required },
      email: { required, email },
      phone: { required },
    },
  },
  methods: {
    MakePayment: function() {
      const tickets = {};
      this.tickets.map(t => {
        if (t.count >= 1) {
          tickets[t.id] = t.count;
        }
      });
      const data = {
        ...this.data,
        base_amount: this.total,
        value_added_tax: this.vat,
        event_id: parseInt(this.id),
        tickets_bought: tickets,
      };

      const apiKey = process.env.VUE_APP_FLUTTERWAVE_TEST_KEY;
      window.FlutterwaveCheckout({
        public_key: apiKey,
        tx_ref: "ticket-master-fw" + new Date(),
        amount: this.total,
        currency: "NGN",
        country: "NG",
        payment_options: "card",

        customer: {
          email: this.userDetails.email,
          phone_number: this.userDetails.phone,
          name: this.userDetails.name,
        },

        callback: function() {
          axios
            .post("orders", data)
            .then(response => {
              console.log("response", response);
              localStorage.setItem("payment", response.data.status);
              this.$toast.success(response.data.status, "", this.notificationSystem.options.success);
              this.$store.dispatch("clear");
              window.href = "/";
            })
            .catch(err => console.error(err));
        },
        onclose: function() {
          console.log("here >>:");
        },
        customizations: {
          title: "Ticket Master",
          description: "Payment for Ticket master",
        },
      });
    },
  },
  computed: {
    ...mapGetters(["tickets"]),
  },
  created() {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  },
};
</script>
<style lang="scss" scoped>
.checkout-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 45px;

  .label {
    font-family: $main-font;
    font-size: 14px;
    line-height: 17px;
    text-transform: uppercase;
  }
  .amount {
    font-family: $main-font;
    font-size: 24px;
    line-height: 29px;
    text-align: right;
    color: #333333;
  }
}

.button-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    border: none;
    margin-top: 20px;
    width: 100%;
  }
}
</style>
