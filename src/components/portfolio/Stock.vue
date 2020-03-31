<template>
  <div class="col-sm-6 col-md-4">
    <div class="card border-info my-3">
      <div class="card-header bg-info">
        <h3 class="card-title">
          {{ stock.name }}
          <small>(Hinta: {{ stock.price | currency }} | Määrä: {{ stock.quantity }} | Viimeisin ostohinta: {{ stock.purchasePrice | currency }})</small>
        </h3>
      </div>
        <div class="card-body">
          <div class="row no-gutters">
            <div class="col-md-8 my-1">
              <div class="text-left">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Määrä"
                  v-model="quantity"
                  :class="{danger: insufficientQuantity}"
                >
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-right ml-1 my-1">
                <button
                  class="btn btn-info"
                  @click="sellStock"
                  :disabled="insufficientQuantity || quantity <= 0 || check(quantity)"
                  >{{ insufficientQuantity ? 'Ei tarpeeksi osakkeita' : 'Myy' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-center">{{ stock.news }}</div>
      </div>
    </div>
</template>

<style scoped>
  .danger {
    border: 1px solid red;
  }
</style>

<script>
import {mapActions} from 'vuex';

export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    }
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions({
      placeSellOrder: 'sellStock'
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.placeSellOrder(order);
      this.quantity = null;
    },
    check(quantity) {
      if (quantity % 1 === 0) {
        return false;
      } else {
        return true;
      };
    },
  }
}
</script>