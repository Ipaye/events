<template>
  <transition name="modal">
    <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal-item" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["show"],
  data: function() {
    return {};
  },
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode === 27) {
        this.$emit("close");
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.45);
  transition: opacity 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}

.modal-item {
  max-height: 80vh;
  height: 100%;

  width: 310px;
  height: 310px;
  margin: -10rem auto 0;
  padding-bottom: 2.8rem;
  border-radius: 15px;
  background-color: $white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  padding: 0 2rem;

  @include small-mobile {
    max-height: 90vh !important;
  }

  @include little-desktop {
    padding: 5rem 5.1rem 2rem;
    width: 470px;
    height: 584px;
  }

  @include tablet {
    width: 315px;
    height: 100%;
    min-height: 50vh;
    max-height: 65vh;
    padding-top: 2.5rem;
  }
}
</style>
