<template>
  <div class="body">
    <h1>All Vacant Locations</h1>
    <ul
      class="mt-4"
      v-for="location in locations"
      :key="location.id"
    >
      <li class="locations--item">
        <a href="/wishlist/something">{{ location.address }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  data: () => ({
    locations: [{id: 1, name: "101 30th ave"}, {id: 2, name: "202 30th ave"}]
  }),
  mounted() {
    axios.get("http://localhost:3000/locations")
      .then(response => {
        console.log(response)
        this.locations = response.data
      })
  },
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
