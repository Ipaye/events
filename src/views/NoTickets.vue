<template>
  <div class="container with-background">
    <Navbar />

    <main class="no-tickets">
      <div class="wrapper">
        <h4 class="content-heading">
          Enter your email and we’ll send <br />
          your tickets right away!
        </h4>

        <div class="card">
          <div class="form" v-if="didntGetTicket">
            <div class="form__group">
              <label class="form__group-label" for="email">Email Address</label>
              <input
                name="email"
                class="form__group-input"
                type="text"
                v-model.trim="userDetails.email"
                :class="{ 'form__group-input-error': $v.userDetails.email.$error }"
                @input="$v.userDetails.email.$touch()"
              />
              <div v-if="$v.userDetails.email.$error" class="form__group-error">
                Email is required and should be a valid email.
              </div>
            </div>

            <div class="button-wrapper">
              <button
                @click.prevent="mockRequest"
                :disabled="$v.$error || $v.$invalid"
                class="button-normal form__group-button"
              >
                CONFIRM AND SEND TICKET
              </button>
            </div>
          </div>

          <div class="notification" v-if="notificationView">
            <div class="notification__svg">
              <SvgSelector :name="'notification-icon'" />
            </div>
            <div class="notification__text">
              Your tickets have been confirmed and sent to your email address at <span> ted@flutterwave.com</span>
            </div>
            <div class="button-wrapper">
              <router-link to="/" class="button-normal form__group-button">
                BUY MORE TICKETS
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

import SvgSelector from "@/components/SvgSelector.vue";
export default {
  name: "NoTicket",
  components: { SvgSelector },
  mixins: [validationMixin],
  validations: {
    userDetails: {
      email: { required, email },
    },
  },
  data() {
    return {
      userDetails: {
        email: "",
      },
      didntGetTicket: true,
      notificationView: false,
    };
  },
  methods: {
    mockRequest() {
      this.$toast.success("Mail sent successfully", "success", this.notificationSystem.options.success);
      this.didntGetTicket = false;
      this.notificationView = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.with-background {
  width: 100%;
  margin: 0px !important;
  top: 0;
  right: 0;
  min-height: 100vh;
  background-image: url("../assets/images/bg.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.wrapper {
  width: 470px;
  margin: 0 auto;

  @include mobile {
    width: 100%;
    margin: 0 auto;
  }

  h4 {
    font-family: Flutterwave;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: #333333;
    margin-bottom: 10px;

    @include mobile {
      font-size: 18px;
    }
  }
}

.no-tickets {
  margin: 150px 0 0;
  height: 65vh;
}

.card {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 40px;

  @include mobile {
    padding: 20px;
  }
}

.notification {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &__text {
    margin: 30px;
    text-align: center;

    span {
      display: inline;
      color: rgba(111, 111, 220, 0.809);
    }
  }

  .button-wrapper {
    width: 100%;
    margin-bottom: 40px;

    a {
      width: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
    }
  }
}
</style>
