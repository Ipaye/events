<template>
  <main class="event-checkout">
    <section class="cart__details">
      <button class="cart__details-button" @click.prevent="$router.go(-1)">
        <SvgSelector :name="'close-icon'" />
        <span>Close</span>
      </button>
      <h1 class="cart__details-event-name">{{ event.name }}</h1>
      <span class="cart__details-event-date"> {{ shortDate(event.start_time) }}</span>
      <div class="cart__details-list">
        <div class="cart__details-list-items" v-for="(ticket, index) in tickets" :key="index">
          <p class="cart__details-list-items-type">{{ ticket.name }}</p>
          <p class="cart__details-list-items-amount">₦ {{ toCurrency(ticket.price) }}</p>
          <div class="cart__details-list-items-quantity">
            <DecrementButton :id="ticket.id" @decrement="decrement" />
            <span> {{ ticket.count }} </span>
            <IncrementButton @increment="increment" :id="ticket.id" />
          </div>
        </div>
        <p class="cart__details-ticket-info">
          Ticket sales ends on 22nd November 2019
        </p>
      </div>
    </section>
    <section class="cart__checkout">
      <h3 class="cart__checkout-header">
        <span v-if="currentTabComponent !== 'CheckoutForm'"> Order summary </span>
        <span v-else class="with-icon" @click="currentTabComponent = ''">
          <svgSelector :name="'back-icon'" />
          <span> Go back</span>
        </span>
      </h3>
      <div v-if="currentTabComponent === 'CheckoutForm'">
        <keep-alive>
          <CheckoutForm
            :total="total"
            :vat="vat"
            :subtotal="subtotal"
            :id="event.id"
            :is="currentTabComponent"
          ></CheckoutForm>
        </keep-alive>
      </div>
      <div class="" v-if="currentTabComponent !== 'CheckoutForm'">
        <div class="cart__checkout-order-wrapper">
          <div class="cart__checkout-order" v-for="(ticket, index) in tickets" :key="index">
            <p class="order-name">{{ ticket.count }} - {{ ticket.name }}</p>
            <p class="order-total">₦ {{ toCurrency(ticket.price) }}</p>
          </div>
        </div>
        <div class="cart__checkout-payment">
          <div class="cart__checkout-payment-subtotal">
            <p class="name">Sub-total</p>
            <p class="total">₦ {{ toCurrency(subtotal) }}</p>
          </div>
          <div class="cart__checkout-payment-breakdown">
            <p class="name">VAT</p>
            <p class="total">₦ 1000</p>
          </div>
          <div class="cart__checkout-payment-breakdown">
            <p class="name">Total payment</p>
            <p class=" large">₦ {{ toCurrency(total) }}</p>
          </div>
          <div class="button-wrapper">
            <button class="button-large" @click="currentTabComponent = 'CheckoutForm'" :disabled="chosen">
              Continue
            </button>
          </div>
        </div>
      </div>

      <div class="info-wrapper">
        <SvgSelector name="money-back" />
        <div class="info-content">
          <p>100% customer protection</p>
          <span>Money back guarantee</span>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SvgSelector from "@/components/SvgSelector.vue";
import IncrementButton from "@/components/IncrementButton.vue";
import DecrementButton from "@/components/DecrementButton.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";

export default {
  name: "EventCheckout",
  components: {
    SvgSelector,
    IncrementButton,
    DecrementButton,
    CheckoutForm,
  },
  props: ["id"],
  data() {
    return {
      currentTabComponent: "",
      event: {},
    };
  },
  computed: {
    ...mapGetters(["tickets", "events"]),
    subtotal: function() {
      let total = 0;
      this.tickets.forEach(t => {
        total = total + t.count * t.price;
      });
      return total;
    },
    vat: function() {
      const vat = this.subtotal * (5 / 100);
      return vat;
    },
    total: function() {
      const total = this.vat + this.subtotal;
      return total;
    },
    chosen: function() {
      const value = this.tickets.some(t => t.count >= 1);
      return !value;
    },
  },
  methods: {
    ...mapActions(["incrementTicket", "decrementTicket", "setTickets"]),
    increment: function(e) {
      this.incrementTicket(e);
    },
    decrement: function(e) {
      this.decrementTicket(e);
    },
  },
  created() {
    const id = this.$route.params.id;
    const event = this.events.find(e => parseInt(e.id) === parseInt(id));
    this.setTickets(event.tickets);
    this.event = { ...event };
  },
};
</script>

<style lang="scss" scoped>
.event-checkout {
  position: relative;
  display: flex;

  @include tablet {
    flex-direction: column;
  }
}
.cart__details {
  padding: 60px 160px;
  width: 60%;
  min-height: 100vh;

  @include tablet {
    width: 100%;
    min-height: 100%;
  }

  @include laptops {
    padding: 60px 40px;
  }
  @include desktop {
    padding: 60px 40px;
  }

  @include tablet {
    min-height: 100%;
  }
  &-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 124px;
    height: 49px;
    background: #ffffff;
    border-radius: 60px;
    border: none;
    filter: drop-shadow(-1px 2px 4px rgba(0, 0, 0, 0.25));

    span:last-of-type {
      font-family: $secondary-font;
      line-height: 24px;
      font-size: 18px;
    }
  }

  &-event-name {
    font-family: $main-font;
    font-size: 36px;
    line-height: 40px;
    margin-top: 40px;
    color: #12122c;

    @include tablet {
      font-size: 26px;
    }
  }

  &-event-date {
    font-family: $tertiary-font;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    color: #4f4f4f;

    @include tablet {
      font-size: 16px;
    }
  }

  &-list {
    margin-top: 80px;

    &-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.5rem;
      margin-bottom: 1.6rem;
      border-bottom: 1px solid #bdbdbd;

      &-type {
        font-family: $main-font;
        font-size: 24px;

        @include tablet {
          font-size: 18px;
        }
        line-height: 24px;
        color: #333333;
        width: 25%;
      }
      &-amount {
        font-family: $main-font;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.5px;
        font-weight: bold;
        color: #333333;
        width: 35%;

        @include tablet {
          font-size: 16px;
        }
      }
      &-quantity {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 86px;
        font-family: Flutterwave;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.5px;
        color: #333333;

        @include tablet {
          font-size: 16px;
          width: 60px;
        }

        .toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: inherit;
          border: 0;
          background: #ffffff;
          width: 1rem;
          height: 1rem;
          border-radius: 100%;
          filter: drop-shadow(-1px 1px 2px rgba(0, 0, 0, 0.25));
          box-sizing: border-box;
          padding: 0;
        }
      }
    }
  }

  &-ticket-info {
    font-family: $main-font;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: 0.5px;
    color: #828282;
  }
}

.cart__checkout {
  position: absolute;
  right: 0;
  width: 40%;
  background: #ffffff;
  padding: 60px 80px;
  min-height: 100vh;

  @include desktop {
    padding: 20px 40px;
  }

  @include tablet {
    width: 100%;
    position: relative;
    min-height: 100%;
  }
  &-header {
    font-family: $main-font;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.065em;
    color: #333333;
    border-bottom: 1px solid #bdbdbd;

    padding-bottom: 30px;
    margin-bottom: 30px;

    @include tablet {
      font-size: 16px;
    }

    @include tablet {
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .with-icon {
      display: flex;
      align-items: center;

      span:last-of-type {
        margin-left: 10px;
      }
    }
  }

  &-order-wrapper {
    padding-bottom: 150px;
    border-bottom: 1px solid #bdbdbd;
    margin-bottom: 30px;

    @include tablet {
      padding-bottom: 30px;
    }
  }
  &-order {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .order-name {
      @include checkoutKey;
    }
    .order-total {
      @include checkoutValue;
    }
  }

  .large {
    font-family: Flutterwave;
    font-size: 24px;
    line-height: 29px;
    text-align: right;
    color: #333333;
  }

  &-payment {
    &-subtotal {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .name {
        @include checkoutKey;
      }
      .total {
        @include checkoutValue;
      }
    }
    &-breakdown {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .name {
        @include checkoutKey;
      }
      .total {
        @include checkoutValue;
      }
    }

    .button-wrapper button {
      border: none;
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .info-wrapper {
    padding-top: 20px;
    display: flex;
    flex-direction: row;

    .info-content {
      margin-left: 10px;
      display: flex;
      flex-direction: column;

      p {
        font-family: $main-font;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        letter-spacing: 0.5px;
        font-weight: bold;
        color: #333333;
      }

      span {
        font-family: $main-font;
        font-size: 13px;
        line-height: 14px;
        margin-left: 1px;
        letter-spacing: 0.5px;
        color: #828282;
      }
    }
  }
}
</style>
