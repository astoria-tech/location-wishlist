<template>
  <div class="body wishlist">
    <h1>{{ location.address }}</h1>

    <div class="mapouter d-flex justify-content-center">
      
        <div class="gmap_canvas mr-4" style="display: inline-block;">
          <iframe width="450" height="300" id="gmap_canvas" v-bind:src="'https://maps.google.com/maps?q=' + location.address + '%20Astoria%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
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
          <form @submit.prevent="handleSubmit" class="input-group col-lg-6 col-md-8">
            <input type="text" class="form-control" placeholder="Bakery? Pizzeria? Bookstore?" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button type="submit" class="btn btn-outline-success" id="button-addon2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="wish-container">
      <div v-for="wish in wishes" v-bind:key="wish.id" class="card wish mr-3 mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ wish.idea }}</h5>
          <p class="card-text">{{ wish.votes }}</p>
          <a v-on:click="downVote(location.id, wish.idea)" href="#" class="btn btn-outline-success">-1</a>
          <a v-on:click="upVote(location.id, wish.idea)" href="#" class="btn btn-outline-success">+1</a>
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
    wishes: [],
    location: {},
    errors: []
  }),
  methods : {
    handleSubmit: function() {
      const idea = document.querySelector('.form-control');
      if (idea.value) {
        this.addIdea(this.location.id, idea.value);
        idea.value = "";
      }
    },
    addIdea: async function (id, idea) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              addIdea(
                id: "${id}",
                idea: "${idea}")
            }
          `
        }
      });
      this.fetchWishes()
    },
    upVote: async function (id, idea) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              upVote(
                id: "${id}",
                idea: "${idea}")
            }
          `
        }
      });
      this.fetchWishes()
    },
    downVote: async function (id, idea) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              downVote(
                id: "${id}",
                idea: "${idea}")
            }
          `
        }
      });
      this.fetchWishes()
    },
    fetchWishes: async function() {
      try {
        const locationId = this.$route.params.locationId;
        const result = await axios({
          url: '/graphql',
          method: 'post',
          data: {
            query: `
                {
                  location(id: "${locationId}") {
                    id
                    address
                    Suggestions {
                      idea
                      votes
                    }
                  }
                }
              `
          }
        });
        this.location = result.data.data.location;

        if (this.location.Suggestions) {
          const sortedWishes = this.location.Suggestions.sort((a,b) => b.votes - a.votes);
          this.wishes = sortedWishes;
        }
      } catch (error) {
          this.errors.push(error);
      }
}
  },
  props: { address: String },
  created() {
     this.fetchWishes()
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
