<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <div class="footer__wrapper-copyright">
        <router-link to="/" aria-label="Copyright 2021. Flutterwave inc" class="footer__wrapper-copyright-link">
          Copyright 2021. Flutterwave inc
        </router-link>
      </div>
      <ul class="footer__wrapper-info">
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  &__wrapper {
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    font-family: $secondary-font;
    font-weight: 500;
    color: $footer-color;
    padding: 0 3rem 3rem;
    letter-spacing: 0.0028px;

    @include weird-medium {
      flex-direction: column;
      padding: 1rem 1rem 2rem;
    }
    @include phablet {
      padding: 1rem 1rem 2rem;
    }
    @include mobile {
      padding: 1rem 1rem 2rem;
    }

    &-info {
      display: flex;
      align-items: center;
      font-size: 0.85rem;

      @include weird-medium {
        justify-content: space-between;
        font-family: $secondary-font;
        font-weight: 500;
        margin-top: 0.8rem;
      }
      @include small-mobile {
        flex-direction: column;
        align-items: flex-start;
        margin-top: 0.8rem;
      }

      & > li:first-child {
        margin-right: 2.8rem;

        @include small-mobile {
          margin-right: 0;
          margin-bottom: 0.8rem;
        }
      }
    }
    &-copyright {
      &-link {
        color: $tertiary-color;
        font-family: $secondary-font;
        font-weight: 500;
      }
    }
  }
}
</style>
