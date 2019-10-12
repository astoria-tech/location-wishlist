<template>
  <div class="body">
    <div id="new-location">
      <h1>Add a new location</h1>
      <input v-model="address" placeholder="Street Address">
      <p>Address is: {{ address }}</p>
      <button v-on:click="createLocation">Create Location</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: () => ({
    address: ""
  }),
  methods: {
    createLocation: function () {
      axios.post("http://localhost:3000/locations", {
        address: this.address,
      })
    }
  }
}
</script>

<style scoped>
</style>
