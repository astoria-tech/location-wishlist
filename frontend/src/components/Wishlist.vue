<template>
  <div class="body wishlist">
    <h1>{{ $route.params.address }}</h1>

    <div class="mapouter d-flex justify-content-center">
      
        <div class="gmap_canvas mr-4" style="display: inline-block;">
          <iframe width="450" height="300" id="gmap_canvas" v-bind:src="'https://maps.google.com/maps?q=' + $route.params.address + '%20Astoria%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>

        <div style="display: inline-block;">

          
          <img src="http://placehold.jp/3d4070/ffffff/450x300.png?css=%7B%22border-radius%22%3A%2215px%22%7D">
        </div>
    </div>

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
          <h5 class="card-title">{{ wish.idea }}</h5>
          <p class="card-text">{{ wish.votes }}</p>
          <a href="#" class="btn btn-outline-success">-1</a>
          <a href="#" class="btn btn-outline-success">+1</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Wishlist',
  data: () => ({
    wishes: []
  }),
  props: { address: String },
  async created() {
      try {
          const address = this.$route.params.address;
          const result = await axios({
            url: '/graphql',
            method: 'post',
            data: {
              query: `
                  {
                    location(address:"${address}") {
                      suggestions {
                        idea
                        votes
                      }
                    }
                  }
                `
            }
          });
          this.wishes = result.data.data.location.suggestions;
      } catch (error) {
          this.errors.push(error);
      }
  }
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
