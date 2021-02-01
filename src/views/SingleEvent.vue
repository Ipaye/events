<template>
  <div class="container with-background">
    <Navbar />
    <main class="single-event">
      <div class="single-event__top">
        <div class="single-event__event-description">
          <p class="single-event__event-description--date">{{ shortDate(event.start_time) }}</p>
          <h4 class="single-event__event-description--heading">{{ event.name }}</h4>
          <p class="single-event__event-description--info">
            Two-Time Grammy Award winner, Nathaniel Cole, who’s also <br />
            just released an album, <strong>Into The Wild,</strong> will be having his first <br />
            concert in Lagos, Nigeria! <br />
            Fans have waited so long for this announcement, and it promises to be everything anyone has imagined.
          </p>
          <p v-if="event.tickets.length >= 1" class="single-event__event-description--price">
            {{ getMinMaxPrice(event.tickets) }}
          </p>
          <button v-if="event.tickets.length === 0" @click="isModalOpen = true" class="event-button button-large">
            REGISTER FOR FREE
          </button>
          <router-link
            v-else
            :to="{
              name: 'EventCheckoutView',
              params: { id: event.id, event: event },
            }"
            class="event-button button-large"
          >
            BUY TICKETS
          </router-link>
        </div>
        <div class="single-event__image">
          <figure>
            <img v-if="event.image" class="event__details-image" :src="event.image" :alt="`${event.name} event`" />
            <img v-else :src="require('@/assets/images/placeholder.png')" alt="" />
          </figure>
        </div>
      </div>

      <div class="single-event__bottom">
        <div class="single-event__event-venue">
          <p class="single-event__event-venue--heading">Venue</p>
          <p class="single-event__event-venue--location">{{ event.venue }}</p>
          <p class="single-event__event-venue--map">
            <span class="map-icon">
              <SvgSelector :name="'map-icon'" />
            </span>
            View map for directions
          </p>
        </div>
        <div class="single-event__links">
          <p class="single-event__links--heading">DATE AND TIME</p>
          <p class="single-event__links--date">{{ longDate(event.start_time) }}</p>
          <p class="single-event__links--link-title">SOCIAL LINKS</p>
          <router-link to="https://twitter.com/nathanielcole" class="single-event__links--external-links"
            >https://twitter.com/nathanielcole</router-link
          >
          <router-link to="https://twitter.com/nathanielcole" class="single-event__links--external-links"
            >https://twitter.com/nathanielcole</router-link
          >
          <router-link to="https://twitter.com/nathanielcole" class="single-event__links--external-links"
            >https://twitter.com/nathanielcole</router-link
          >
        </div>
      </div>
    </main>
    <Footer />

    <ModalWrapper :show="isModalOpen" v-if="isModalOpen" @close="isModalOpen = false" class="modal-container">
      <div v-if="hasRegistered == false">
        <div class="modal-header">
          <h4 class="heading">REGISTER FOR FREE</h4>
          <button @click="closeModal">
            <SvgSelector :name="'close-icon'" />
          </button>
        </div>
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
              type="number"
              class="form__group-input"
              v-model.trim="userDetails.phone"
              :class="{ 'form__group-input-error': $v.userDetails.phone.$error }"
              @input="$v.userDetails.phone.$touch()"
            />
            <div v-if="$v.userDetails.phone.$error" class="form__group-error">
              Phone number is required.
            </div>
          </div>
          <div class="button-wrapper">
            <button
              class="button-normal form__group-button"
              @click.prevent="registerForFree"
              :disabled="$v.$error || $v.$invalid"
            >
              {{ isRegisering ? "Please wait..." : "Register" }}
            </button>
          </div>
        </form>
      </div>
      <div class="success__notification" v-if="hasRegistered">
        <div class="success__notification-header">
          <button @click.prevent="closeModal">
            <SvgSelector :name="'close-icon'" />
          </button>
        </div>
        <div class="success__notification-check">
          <div class="success__notification-check-icon">
            <SvgSelector :name="'notification-icon'" />
          </div>
        </div>
        <div class="success__notification-text">You have successfully registered for {{ event.name }}</div>
      </div>
    </ModalWrapper>
  </div>
</template>

<script>
import ModalWrapper from "@/components/ModalWrapper.vue";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

import SvgSelector from "@/components/SvgSelector.vue";
export default {
  name: "SingleEvent",
  props: ["id"],
  components: {
    ModalWrapper,
    SvgSelector,
  },
  data() {
    return {
      userDetails: {
        name: "",
        email: "",
        phone: "",
      },
      event: {},
      isModalOpen: false,
      hasRegistered: false,
      isRegisering: false,
      isSuccessModalOpen: false,
    };
  },
  computed: {
    ...mapGetters(["events", "loading"]),
  },
  mixins: [validationMixin],
  validations: {
    userDetails: {
      name: { required },
      email: { required, email },
      phone: { required },
    },
  },
  methods: {
    ...mapActions(["getEvents", "registerFree"]),
    registerForFree() {
      this.isRegisering = true;
      this.registerFree({ userDetails: this.userDetails, id: this.id })
        .then(response => {
          let { data } = response;
          this.$toast.success("Registered Successfully", data.status, this.notificationSystem.options.success);
          this.isRegisering = false;
          this.hasRegistered = true;

          this.userDetails.name = "";
          this.userDetails.email = "";
          this.userDetails.phone = "";
        })
        .catch(error => this.handleError(error));
    },
    closeModal() {
      this.hasRegistered = false;
      this.isModalOpen = false;
    },
  },

  created() {
    const eventID = this.$route.params.id;
    this.event = this.events.find(current => parseInt(current.id) === parseInt(eventID));
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
/* Modal styles */
.modal-header {
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #bdbdbd;

  .heading {
    font-family: $main-font;
    text-transform: uppercase;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.065em;
    text-transform: uppercase;
    color: #333333;
  }

  button {
    appearance: none;
    border: none;
    background: none;
  }
}

.success__notification {
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    justify-content: flex-end;

    button {
      justify-content: flex-end;
      appearance: none;
      border: none;
      background: none;
    }
  }

  &-check {
    display: flex;
    padding: 20px 0px;
    justify-content: center;
  }

  &-text {
    display: flex;
    font-family: $main-font;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.065em;

    justify-content: center;
    margin-bottom: 40px;
  }
}

/* Single Event */
.single-event {
  padding: 40px 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  margin: 0 auto;

  @include laptops {
    padding: 40px 0px;
  }

  &__top {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-bottom: 40px;
    border-bottom: 1px solid #ccb7b1;

    @include little-desktop {
      flex-direction: column-reverse;
    }
  }

  &__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-bottom: 40px;
    padding-top: 60px;

    @include little-desktop {
      flex-direction: column;
    }
  }

  &__event-description {
    width: 50%;

    @include little-desktop {
      width: 100%;
    }

    &--date {
      font-family: "SF Display";
      font-size: 18px;
      line-height: 24px;
      text-transform: uppercase;
      color: #12122c;
      margin-bottom: 15px;

      @include desktop {
        font-size: 16px;
      }

      @include little-desktop {
        margin-top: 15px;
        margin-bottom: 5px;
      }
    }
    &--heading {
      font-family: $main-font;
      font-size: 36px;
      line-height: 40px;
      color: #12122c;
      margin-bottom: 30px;
      max-width: 280px;
      width: 100%;

      @include desktop {
        font-size: 26px;
        max-width: 100%;
        width: 100%;
      }

      @include little-desktop {
        margin-bottom: 5px;
      }
    }
    &--info {
      font-family: $main-font;
      font-size: 18px;
      line-height: 28px;
      font-style: italic;
      color: #4a4a4a;
      margin-bottom: 30px;
      padding-right: 15px;

      @include desktop {
        font-size: 16px;
        padding-right: 5px;
      }
    }
    &--price {
      font-family: $main-font;
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.5px;
      color: #333333;
      margin-bottom: 20px;
    }
    .event-button {
      display: flex;
      justify-content: center;
      cursor: pointer;
      border: none;
      width: 348px;

      @include desktop {
        width: 300px;
      }
      @include mobile {
        width: 100%;
      }
    }
  }

  &__event-venue {
    width: 50%;

    @include little-desktop {
      width: 100%;
    }

    &--heading {
      font-family: "SF Display";
      font-weight: 500;
      text-transform: uppercase;
      font-size: 18px;
      line-height: 24px;
      color: #333333;
      margin-bottom: 20px;

      @include desktop {
        font-size: 16px;
      }

      @include little-desktop {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
    &--location {
      font-family: $main-font;
      font-size: 24px;
      line-height: 32px;
      color: #333333;
      max-width: 440px;
      margin-bottom: 30px;

      @include desktop {
        font-size: 20px;
      }

      @include little-desktop {
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
    &--map {
      font-family: $main-font;
      display: flex;
      font-size: 16px;
      line-height: 18px;
      color: #f5a623;

      @include desktop {
        font-size: 14px;
      }

      .map-icon {
        margin-right: 10px;
      }
    }
  }
  &__links {
    width: 50%;

    @include little-desktop {
      width: 100%;
    }

    &--heading {
      font-family: "SF Display";
      font-weight: 500;
      text-transform: uppercase;
      font-size: 18px;
      line-height: 24px;
      color: #333333;
      margin-bottom: 20px;

      @include desktop {
        font-size: 16px;
      }

      @include little-desktop {
        font-size: 18px;
        font-weight: bold;
        margin-top: 25px;
        margin-bottom: 5px;
      }
    }
    &--date {
      font-family: $main-font;
      font-size: 24px;
      line-height: 32px;
      color: #333333;
      margin-bottom: 20px;

      @include desktop {
        font-size: 20px;
      }

      @include little-desktop {
        font-size: 16px;
      }
    }
    &--link-title {
      font-family: "SF Display";
      font-size: 16px;
      line-height: 16px;
      color: #333333;
      margin-bottom: 10px;

      @include desktop {
        font-size: 15px;
      }
    }
    &--external-links {
      font-family: $main-font;
      display: flex;
      font-style: "normal";
      font-size: 14px;
      line-height: 20px;
      color: #12122c;
      margin-bottom: 5px;
    }
  }

  &__image {
    width: 50%;

    @include desktop {
      width: 40%;
    }
    @include little-desktop {
      width: 100%;
    }

    figure {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 460px;
        height: 430px;
        object-fit: cover;
        border-radius: 6px;

        @include little-desktop {
          width: 100%;
        }
      }
    }
  }
}
</style>
