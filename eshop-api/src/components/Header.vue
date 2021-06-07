<template>
    <header>
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">E-Shop</h5>      
      <input v-model="searchLine" type="text" class="goods-search" />
      <button class="btn btn-outline-primary search-button" type="button" @click="onClick">Искать</button>
      <button class="btn btn-outline-primary cart-button" type="button" @click="$emit('toggle-cart')">Корзина</button>
      </div>
    </header>
</template>

<script>
export default {
  data: () => ({
    searchValue: '',
  }),
  methods: {
    onClick() {
      this.$emit('filter-goods', this.searchValue);
    },
  },
  watch: {
    searchValue() {
      this.onClick();
    }
  }
}
</script>
