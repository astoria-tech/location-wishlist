<template>
  <div class="body">
    <h1 class="mb-5">Vacant Location Wishlists</h1>
    <p>Have you ever walked by a vacant store and wished it would open as a new bookstore?</p>
    <p>Or a daycare? Or an archery range?</p>
    <p>Well, now is the time to be heard!</p>

    <div class="mt-5 mb-5">
      <p class="text-success h3">Submit a vacant location below</p>

      <div class="container mt-3">
        <div class="row justify-content-center">
          <form @submit.prevent="handleSubmit" class="input-group col-lg-6 col-md-8">
            <input type="text" class="form-control" placeholder="Enter address, ex: 40-05 Broadway" aria-label="Vacant location address input" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button type="submit" class="btn btn-outline-success" id="button-addon2">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="mt-5 message-box text-success"></div>
    </div>
    <p class="mt-5"><strong>Look for wishlist QR stickers near vacant storefronts, scan them, and cast your vote!</strong></p>
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
      messageBox.innerText = "Thank you for your entry. Check back soon :)"
    },
  },
  props: { msg: String }
}
</script>
    

<style scoped>
</style>
