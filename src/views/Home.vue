<template>
  <div class="home container">
    <Navbar />
    <main id="events">
      <h1 class="primary-heading">The best events happening now.</h1>
      <section id="happening-events" class="events__page-listing">
        <EventCard />
        <EventCard />
        <EventCard />
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";

export default {
  name: "Home",
  components: {
    EventCard,
  },
};
</script>

<style lang="scss" scoped>
#events {
  padding: 125px 20px;
}

.events__page {
  &-listing {
    width: 100%;
    display: grid;
    margin-bottom: 3rem;
    grid-template-columns: repeat(1, 1fr);

    @include thirteen {
      grid-template-columns: repeat(3, 1fr);
      gap: 20px 20px;
    }
    @include desktop {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 20px;
    }

    @include tablet {
      grid-template-columns: repeat(1, 1fr);
      gap: 20px 20px;
    }
  }
}
</style>
