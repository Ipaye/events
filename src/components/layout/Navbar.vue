<template>
  <header id="header-container" class="container">
    <div class="header__wrapper">
      <div class="header">
        <div class="header__logo">
          <router-link role="link" to="/"><Logo title="Flutterwave, Africa payments" /> </router-link>
        </div>
        <nav class="header__menu" role="navigation">
          <div class="header__menu-controls">
            <span @click="hamburgerIcon = true" :class="[hamburgerIcon ? 'hidden' : '']" class="header__menu-icon">
              <svg width="25" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#333333" d="M0 0h25v2H0zM0 6h25v2H0z" />
              </svg>
            </span>
            <span @click="hamburgerIcon = false" :class="[hamburgerIcon ? '' : 'hidden']" class="header__menu-icon">
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#333333" d="M2.065.454l13.89 13.89-1.112 1.11L.954 1.565z" />
                <path fill="#333333" d="M.954 14.343L14.844.454l1.11 1.11-13.889 13.89z" />
              </svg>
            </span>
          </div>
          <ul class="header__menu-links" id="menu" role="navigation" :class="[hamburgerIcon ? 'mobile' : '']">
            <li class="header__menu-link">
              <router-link role="link" to="/">I didn’t get my tickets</router-link>
            </li>
            <li class="header__menu-link">
              <router-link to="/" class="button-normal">
                <span> CREATE YOUR OWN EVENT </span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "./Logo";
export default {
  components: {
    Logo,
  },
  data() {
    return {
      hamburgerIcon: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.header__wrapper {
  padding: 1.4rem 4.5rem 0;

  @include small-mobile {
    padding: 1rem 1rem 0;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__menu {
    &-icon {
      z-index: 5;
    }
    &-controls {
      display: none;

      @include little-desktop {
        display: flex;
        justify-content: center;
      }
    }
    &-links {
      display: none;

      @include desktop {
        display: flex;
      }
      @include thirteen {
        display: flex;
      }

      @include little-desktop {
        display: none;

        &.mobile {
          display: flex;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: white;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          & > :first-child {
            margin-bottom: 40px;
          }
        }
      }
    }
    &-link {
      margin-left: 20px;

      @include tablet {
        margin-left: 0;
      }
    }
  }
}
</style>
