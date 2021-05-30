<template>
  <div id="app">
    <header>
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">E-Shop</h5>      
      <input v-model="searchLine" type="text" class="goods-search" />
      <Search :goods="filteredGoods" />
      <button class="btn btn-outline-primary cart-button" type="button" @click="toggleCartStatus">Корзина</button>
      </div>
    </header>
    <main>
      <GoodsList :goods="filteredGoods" />      
      <div v-show="isVisibleCart" style="text-align: center;" class="cart">
      <Cart :items="basketItem"/>
      </div>
    </main>
  </div>
</template>

<script>
import GoodsList from './components/GoodsList';
import Cart from './components/Cart';
import Search from './components/Search';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
export default {
  components: {
    GoodsList,
    Cart,
    Search,
  },
  props: {
    search: {
      type: String,
      default: () => '',
    },
  },

  data: () => ({
    goods: [],
    filteredGoods: [],
    basketItem: [ // Данные для отладки
      {
        "id_product": 123,
        "product_name": "Ноутбук",
        "price": 45600
        },
        {
        "id_product": 456,
        "product_name": "Мышка",
        "price": 1000
        }
    ],
    searchLine: '',
    isVisibleCart: false,
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

    toggleCartStatus() {
      this.isVisibleCart = !this.isVisibleCart;
    }
  },
  
  watch: { 
    searchLine() { 
      this.filterGoods();
    },
  },
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

.cart {
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  padding: 20px;
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: auto;
}

</style>
