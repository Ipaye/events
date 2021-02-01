<template>
  <div class="home container">
    <Navbar />
    <main id="events">
      <h1 class="primary-heading">The best events happening now.</h1>
      <Spinner v-if="loading" />
      <section id="happening-events" class="events__page-listing" v-else>
        <router-link
          v-for="(event, index) in events"
          :key="index"
          role="link"
          :to="{
            name: 'SingleEventView',
            params: { id: event.id },
          }"
        >
          <EventCard :event="event" />
        </router-link>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    EventCard,
  },
  data() {
    return {
      pageNumber: 1,
    };
  },
  methods: {
    ...mapActions(["getEvents"]),
    loadMore: function() {
      this.getEvents(this.page + 1);
    },
  },
  computed: {
    ...mapGetters(["events", "pageDetails", "loading"]),
  },
  created() {
    if (this.events.length <= 1) {
      setTimeout(() => {
        this.getEvents(this.pageNumber);
      }, 2000);
    }
  },
};
</script>

<style lang="scss" scoped>
#events {
  padding: 125px 20px 0px;

  @include desktop {
    padding: 65px 20px 0px;
  }

  @include tablet {
    padding: 65px 20px 0px;
  }
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
