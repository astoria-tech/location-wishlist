<template>
  <div class="wishlist">
    <h1>Wishlist for {{ $route.params.address }}</h1>
    <p>Submit &amp; vote on what you want this location to be!</p>
  </div>
</template>

<script>
export default {
  name: 'Wishlist',
  props: { address: String }
}
</script>

<style scoped>
h3 { margin: 40px 0 0; }
a { color: #42b983; }
</style>
