<template>
  <transition name="modal">
    <div class="spinner-backdrop">
      <div class="spinner-wrapper">
        <div class="spinner"></div>
        <p class="spinner-content">Please wait...</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Spinner",
  props: ["mode"],
};
</script>
<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner-backdrop {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-content {
  color: white;
}

.spinner {
  height: 25px;
  width: 25px;
  border-radius: 100%;
  margin: 0 auto;
  border: 0.2rem solid $primary-color;
  border-top: 0.2rem solid $white;
  animation: spin 2s linear infinite;
}
</style>
