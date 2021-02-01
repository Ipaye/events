<template>
  <button class="toggle" @click="$emit('decrement', id)">
    <img :src="require('@/assets/images/minus.png')" alt="decrement icon" />
  </button>
</template>
<script>
export default {
  props: ["id"],
};
</script>
