<template>
    <div style="text-align: center;">Товары:
      <div class="goods-list">
        <div v-for="item in goods" :key="item.id_product" class='goods-item'>
          <div class="text-center">
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>{{ item.product_name }}</li>
              </ul>
                <h1 class="card-title pricing-card-title">{{ item.price }}</h1>
                <button type="button" class="btn btn-lg btn-block btn-outline-primary" @click="onClick(item)">Добавить</button>
            </div>
          </div>
        </div>
     </div>
    </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    onClick(item) {
      this.$emit('add-to-cart', item);
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.goods-item {
  width: 200px;
  height: 300px;
  padding: 5px;
  margin: 10px;
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
}
</style>