<template>
  <div class="wishlist">
    <h1>Wishlist for {{ $route.params.address }}</h1>
    <p>Submit &amp; vote on what you want this location to be!</p>
    <div>
      <input type="text" name="wish" id="wish" value="" />
      <input type="submit" value="Submit" />
    </div>

    <div class="wish-container">
      <div v-for="wish in wishes" class="card wish mr-3 mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ wish }}</h5>
          <p class="card-text">9 votes</p>
          <a href="#" class="btn btn-primary">-1</a>
          <a href="#" class="btn btn-primary">+1</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Wishlist',
  data: () => ({
    wishes: [
      'Barbecue', 'Beer hall', 'Archery range',
      'Barbecue', 'Beer hall', 'Archery range',
      'Barbecue', 'Beer hall', 'Archery range',
    ]
  }),
  props: { address: String }
}
</script>

<style scoped>
h3 { margin: 40px 0 0; }

a { color: #42b983; }

.card-body a {
  color: white;
  margin: 0 10px;
  width: 3rem;
}

.wish-container {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.wish {
  margin-top: 5px;
}

</style>
