<template>
  <button class="toggle" @click="$emit('increment', id)">
    <img :src="require('@/assets/images/add.png')" alt="increment icon" lazy />
  </button>
</template>
<script>
export default {
  props: ["id"],
};
</script>
