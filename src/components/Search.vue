<template>
    <button class="btn btn-outline-primary search-button" type="button" @click="goods">Искать</button>
</template>

<script>
export default {
    props: {
        goods: {
        type: Array,
        default: () => [],
    },
  }
}
</script>
