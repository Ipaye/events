<template>
  <div class="event__card">
    <figure class="event__card-image">
      <img v-if="event.image" class="event__card-image-item" :src="event.image" :alt="`${event.name} event`" />
      <img
        v-else
        class="event__card-image-item"
        :src="require('@/assets/images/placeholder.png')"
        :alt="`${event.name} event`"
      />
    </figure>
    <p class="event__card-date">{{ shortDate(event.start_time) }}</p>
    <h3 class="event__card-name">{{ event.name }}</h3>
    <p class="event__card-price">
      <span class="free" v-if="event.is_free || event.tickets.length === 0">
        Free
      </span>
      <span class="sold" v-else-if="event.is_sold_out">Sold out</span>
      <span v-else> {{ getMinMaxPrice(event.tickets) }}</span>
    </p>
  </div>
</template>
<script>
export default {
  props: ["event"],
};
</script>
<style lang="scss" scoped>
.event__card {
  cursor: pointer;
  margin-bottom: 3rem;

  &-image {
    margin-bottom: 1.2rem;
    &-item {
      height: 231px;
      border-radius: 6px;
      width: 100vw;
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.306764));
      object-fit: cover;
    }
  }
  &-date {
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    font-family: $secondary-font;
    font-weight: 500;
    color: $secondary-color;
  }
  &-name {
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    margin-top: 0.5rem;
    color: $text-color;
  }
  &-price {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
    color: $secondary-color;
    .free {
      color: $green;
      font-weight: bold;
    }
    .sold {
      color: $red;
      font-weight: bold;
    }
  }
}
</style>
