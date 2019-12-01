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
  async created() {
      try {
          const result = await axios({
            url: '/graphql',
            method: 'post',
            data: {
              query: `
                  {
                    acceptedLocations {
                      address
                    }
                  }
                `
            }
          });
          this.locations = result.data.data.acceptedLocations;
      } catch (error) {
          this.errors.push(error);
      }
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
