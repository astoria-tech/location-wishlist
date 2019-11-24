<template>
  <div class="body">
    <h1>All Vacant Locations</h1>
    <ul class="mt-4">
      <li v-for="location in locations" v-bind:key="location.address">
        <a :href="'/wishlist/' + location.address">{{ location.address }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      locations: [],
      errors: []
    }
  },

  created() {
  axios({
    url: 'http://localhost:3000/graphql',
    method: 'post',
    data: {
      query: `
          {
            locations {
              address
            }
          }
        `
    }
  }).then((result) => {
    this.locations = result.data.data.locations
  });

  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li { margin: 10px; }
a { color: #42b983; }
</style>
