<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<style lang="scss" scoped>
/* @import "@/assets/scss/main.scss"; */

#app {
  margin: 0;
  padding: 0;
}
</style>
