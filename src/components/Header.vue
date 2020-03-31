<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-header my-3">
      <router-link to="/" class="navbar-brand">Osakekauppa</router-link>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/portfolio" activeClass="active" class="nav-link"><a>Portfolio</a></router-link>
        <router-link to="/osakkeet" activeClass="active" class="nav-link"><a>Osakkeet</a></router-link>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" class="nav-link" @click="endDay">Lopeta Kvartaali</a></li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Tallenna & Lataa
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="saveData" href="#">Tallenna</a>
          <a class="dropdown-item" @click="loadData" href="#">Lataa</a>
        </div>
      </li>
      </ul>
      <div class="bg-info rounded">
        <strong class="navbar-text navbar-right text-white mx-2">Varallisuus: {{ funds | currency }}</strong>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      fetchData: 'loadData',
      cycleProgress: 'cycleNext'
    }),
    endDay() {
      this.cycleProgress();
      this.randomizeStocks();
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks,
        time: this.$store.getters.time
      };
      this.$http.put('data.json', data);
    },
    loadData() {
      this.fetchData();
    }
  }
}
</script>
