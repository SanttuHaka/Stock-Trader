<template>
  <div class="col-sm-6 col-md-4">
    <div class="card border-success my-3">
      <div class="card-header bg-success text-white">
        <h3 class="card-title">
          {{ stock.name }}
          <small>(Hinta: {{ stock.price | currency }})</small>
        </h3>
      </div>
        <div class="card-body text-white">
          <div class="row no-gutters">
            <div class="col-md-8 my-1">
              <div class="text-left">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Määrä"
                  v-model="quantity"
                  :class="{danger: insufficientFunds}"
                >
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-right ml-1 my-1">
                <button
                  class="btn btn-success"
                  @click="buyStock"
                  :disabled="insufficientFunds || quantity <= 0 || check(quantity)"
                  >{{ insufficientFunds ? 'Varat eivät riitä' : 'Osta'}}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-center text-black">{{ stock.news }}</div>
      </div>
    </div>
</template>

<style scoped>
  .danger {
    border: 1px solid red;
  }
</style>

<script>
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    }
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: Number(this.quantity)
      };
      this.$store.dispatch('buyStock', order)
      this.quantity = null;
    },
    check(quantity) {
      if (quantity % 1 === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

