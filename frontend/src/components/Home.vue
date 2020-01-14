<template>
  <div class="body">
    <h1 class="mb-5">Vacant Location Wishlists</h1>
    <p>Ever walk by a vacant store and wish it would open as a new bookstore?</p>
    <p>Or a daycare? Or an archery range?</p>
    <p>Well, now is the time to be heard!</p>

    <p class="mt-4"><strong>Look for wishlist QR stickers near vacant storefronts, scan them, and cast your vote!</strong></p>
    <a href="/new-location" class="btn btn-lg btn-outline-success mt-5">Submit a new location</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  methods: {
    handleSubmit: function() {
      let location = document.querySelector('.form-control');
      if (location.value) {
        this.addLocation(location.value);
        location.value = "";
      }
    },
    addLocation: async function (address) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              addLocation(
                address: "${address}"
              )
            }
          `
        }
      });
      let messageBox = document.querySelector('.message-box');
      messageBox.innerText = "Thank you for your entry! A page will be generated soon, check back in a bit. :)"
    },
  },
  props: { msg: String }
}
</script>
    

<style scoped>
</style>
