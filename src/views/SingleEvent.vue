<template>
  <div class=" container">
    <Navbar />
    <main class="single-event">
      <div class="single-event__top">
        <div class="single-event__event-description">
          <p class="single-event__event-description--date">8th February 2019</p>
          <h4 class="single-event__event-description--heading">The Nathan Cole Experience</h4>
          <p class="single-event__event-description--info">
            Two-Time Grammy Award winner, Nathaniel Cole, who’s also <br />
            just released an album, <strong>Into The Wild,</strong> will be having his first <br />
            concert in Lagos, Nigeria! <br />
            Fans have waited so long for this announcement, and it promises to be everything anyone has imagined.
          </p>
          <p class="single-event__event-description--price">
            N5000 – N2,000,000
          </p>
          <button class="event-button button-large">BUY TICKETS</button>
        </div>
        <div class="single-event__image">
          <figure>
            <img :src="require('@/assets/images/placeholder.png')" alt="" />
          </figure>
        </div>
      </div>

      <div class="single-event__bottom">
        <div class="single-event__event-venue">
          <p class="single-event__event-venue--heading">Venue</p>
          <p class="single-event__event-venue--location">
            Eko Atlantic Beach, Off Ahmadu Bello way, Victoria Island, Lagos.
          </p>
          <p class="single-event__event-venue--map">
            <span class="map-icon">
              <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g
                  clip-path="url(#clip0)"
                  stroke="#F5A623"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M.75 4.5v12l5.25-3 6 3 5.25-3v-12L12 4.5l-6-3-5.25 3zM6 1.5v12M12 4.5v12" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <path fill="#fff" d="M0 0h18v18H0z" />
                  </clipPath>
                </defs></svg
            ></span>
            View map for directions
          </p>
        </div>
        <div class="single-event__links">
          <p class="single-event__links--heading">DATE AND TIME</p>
          <p class="single-event__links--date">Friday, February 8th 2019, 10:00pm</p>
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
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
      font-family: Flutterwave;
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
      font-family: Flutterwave;
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
      font-family: Flutterwave;
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.5px;
      color: #333333;
      margin-bottom: 20px;
    }
    .event-button {
      cursor: pointer;
      border: none;
      width: 348px;

      @include desktop {
        width: 200px;
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
      font-family: Flutterwave;
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
      font-family: Flutterwave;
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
      font-family: Flutterwave;
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
      font-family: Flutterwave;
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
