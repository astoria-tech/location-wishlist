<template>
  <div class="body wishlist">
    <h1>{{ $route.params.address }}</h1>

    <div class="mt-3 mb-5">

      <p>Looks like this storefront is empty!</p>
      <p>Submit &amp; vote on what you want this location to be!</p>

      <div class="container">
        <div class="row justify-content-center">
          <div class="input-group col-lg-6 col-md-8">
            <input type="text" class="form-control" placeholder="Bakery? Pizzeria? Bookstore?" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-success" type="button" id="button-addon2">Make your wish</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="wish-container">
      <div v-for="wish in wishes" v-bind:key="wish.id" class="card wish mr-3 mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ wish }}</h5>
          <p class="card-text">9 votes</p>
          <a href="#" class="btn btn-outline-success">-1</a>
          <a href="#" class="btn btn-outline-success">+1</a>
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

.card-body a {
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

.wish { margin-top: 5px; }

</style>
