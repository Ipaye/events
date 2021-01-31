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
          <div class="form" v-if="false">
            <div class="form__group">
              <label class="form__group-label" for="name">Full name</label>
              <input class="form__group-input" type="text" />
            </div>

            <div class="button-wrapper">
              <button class="button-normal form__group-button">
                REGISTER
              </button>
            </div>
          </div>

          <div class="notification">
            <div class="notification__svg">
              <svg width="137" height="137" viewBox="0 0 137 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  class="checkmark__circle"
                  d="M125.583 63.2476V68.4993C125.576 80.8089 121.59 92.7864 114.22 102.646C106.849 112.505 96.4894 119.717 84.685 123.207C72.8806 126.698 60.2642 126.278 48.7174 122.013C37.1707 117.747 27.3122 109.862 20.6124 99.5359C13.9126 89.2093 10.7303 76.9937 11.5402 64.7108C12.3502 52.4279 17.1089 40.7358 25.1067 31.3784C33.1045 22.021 43.9128 15.4996 55.9197 12.7868C67.9267 10.074 80.4889 11.3151 91.7328 16.3251"
                  stroke="#F5A623"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="checkmark__check"
                  d="M125.583 22.8335L68.5 79.9739L51.375 62.8489"
                  stroke="#F5A623"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="notification__text">
              Your tickets have been confirmed and sent to your email address at <span> ted@flutterwave.com</span>
            </div>
            <div class="button-wrapper">
              <button class="button-normal form__group-button">
                BUY MORE TICKETS
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
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

.form__group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &-label {
    padding-bottom: 10px;
  }

  &-input {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px 25px;
  }
  &-button {
    border: none;
    width: 100%;
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
  }
}
</style>
