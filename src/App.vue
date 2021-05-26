<template>
  <div id="app">
    <header>
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">E-Shop</h5>      
      <input v-model="searchLine" type="text" class="goods-search" />
      <button @click="filterGoods" class="btn btn-outline-primary search-button" type="button">Искать</button>
      <button @click="isVisibleCart" class="btn btn-outline-primary cart-button" type="button">Корзина</button>
      </div>
    </header>
    <main>      
      <div style="text-align: center;">Товары:</div>
        <div class="goods-list">
          <div v-for="item in filteredGoods" :key="item.id_product" class='goods-item'>
            <div class="col text-center border border-dark">
              <div class="card-body">
                <ul class="list-unstyled mt-3 mb-4">
                  <li>{{ item.product_name }}</li>
                </ul>
                <h1 class="card-title pricing-card-title">{{ item.price }}</h1>
                <button type="button" class="btn btn-lg btn-block btn-outline-primary">Добавить</button>
              </div>
            </div>
         </div>
      </div>
      <br />
      <hr>
      <div v-show="value" style="text-align: center;">Корзина:
        <div class="cart-list">
        <div v-for="item in basketItem " :key="item.id_product" class='goods-item'>
            <div class="col text-center border border-dark">
              <div class="card-body">
                <ul class="list-unstyled mt-3 mb-4">
                  <li>{{ item.product_name }}</li>
                </ul>
                <h1 class="card-title pricing-card-title">{{ item.price }}</h1>
                <button type="button" class="btn btn-lg btn-block btn-outline-primary">Добавить</button>
              </div>
            </div>
         </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
export default {
  data: () => ({
    goods: [],
    filteredGoods: [],
    searchLine: "",
    value: 0,
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`)
  },
  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        }) 
    },

    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },

    isVisibleCart() {
      if (this.value == 1) {
        this.value = 0;
      }
      else{
        this.value = 1;
      }
      console.log(this.value);
    }
  },
  
  // watch: { // быстрый поиск 
  //   searchLine() { 
  //     const regexp = new RegExp(this.searchLine, 'i');
  //     this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
  //   },
  // },
}
</script>

<style>
html {
  font-size: 14px;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.container {
  max-width: 960px;
}

.pricing-header {
  max-width: 700px;
}

.card-deck .card {
  min-width: 220px;
}

.goods-list{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap
}

.col{
  margin: 10px;
}

</style>
