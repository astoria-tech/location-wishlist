<template>
  <div class="body">
    <h1>All Vacant Locations</h1>
    <ul class="mt-4">
      <li v-for="location in locations" v-bind:key="location.address">
        <a :href="'/wishlist/' + location.address">{{ location.address }}</a>
      </li>
    </ul>
    <p v-if="!locations.length">This list is currently empty. Check back soon for new locations :)</p>
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
                    approvedLocations {
                      address
                    }
                  }
                `
            }
          });
          this.locations = result.data.data.approvedLocations;
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
