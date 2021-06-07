<template>
  <div id="app">
    <Header @toggle-cart="toggleCartStatus" @filter-goods="filterGoods"/>
    <main>
      <GoodsList @add-to-cart="addToCart" :goods="filteredGoods" />      
      <Cart @delete-from-cart="deleteFromCart" :cartGoods="cartGoods" :isVisibleCart="isVisibleCart" />
    </main>
  </div>
</template>

<script>
import GoodsList from './components/GoodsList';
import Cart from './components/Cart';
import Header from './components/Header';


const API_URL = 'http://localhost:3000'
export default {
  components: {
    GoodsList,
    Cart,
    Header,
  },

  data: () => ({
    goods: [],
    filteredGoods: [],
    isVisibleCart: false,
    cartGoods: [],
  }),
  mounted() {
    this.getGoods();
    this.getCart();
  },
  methods: {
    addToCart(item) {
      console.log(item)
      this.makePOSTRequest(`${API_URL}/addToCart`, item)
        .then(() => this.getCart())
    },
    deleteFromCart(item) {
      console.log(item)
      this.makePOSTRequest(`${API_URL}/deleteFromCart`, item)
        .then(() => this.getCart())
    },
    makeGETRequest(url) {
      return fetch(url)
        .then((data) => data.json())
    },
    makePOSTRequest(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          // добавили хэдер
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
    },
    getGoods() {
      this.makeGETRequest(`${API_URL}/catalogData`)
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        }) 
    },
    getCart() {
      this.makeGETRequest(`${API_URL}/cartData`)
        .then((data) => {
          this.cartGoods = data
        })
    },
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    toggleCartStatus() {
      this.isVisibleCart = !this.isVisibleCart;
    }
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
