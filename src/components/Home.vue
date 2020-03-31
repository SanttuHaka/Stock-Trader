<template>
  <div>
    <h1>Käy kauppaa tai Tarkastele portfoliotasi</h1>
    <br>
    <h6>Voit ladata ja tallentaa datasi</h6>
    <h6>Paina 'Lopeta Kvartaali' nappia aloittaaksesi uuden kvartaalin!</h6>
    <hr>
    <p>Sinun varallisuutesi: {{ funds | currency }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  }
}
</script>
