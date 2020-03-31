<template>
  <div>
    <nav><app-time v-for="time in times" :time="time"></app-time></nav>
    <div class="row">
      <app-stock v-for="stock in stocks" :stock="stock"></app-stock>
    </div>
  </div>
</template>

<script>
import Stock from './Stock.vue';
import Time from './Time.vue';

export default {
  components: {
    appStock: Stock,
    appTime: Time
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    times() {
      return this.$store.getters.time;
    }
  }
}
</script>

