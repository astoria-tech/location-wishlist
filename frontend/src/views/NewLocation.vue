<template>
  <div class="body">
    <h1>Submit a new location</h1>
    <br>

    <form @submit.prevent="handleSubmit">
      <div class="container mt-1">
        <p class="h4 mr-2 mb-2">1. Enter the address</p>
        <div class="row justify-content-center mb-5">
          <div class="input-group col-lg-5 col-md-8">
            <input type="text" class="form-control" id="address" ref="address" placeholder="Something like 40-05 Broadway or 32-20 34th Ave" aria-label="Vacant location address input" aria-describedby="button-addon">
          </div>
        </div>

        <div class="mb-5">
          <p class="h4 mr-2 mb-3">2. Choose a photo of the location</p>
          <input type="file" class="small border" id="photo" ref="photo"/>
        </div>

        <div>
          <button type="submit" class="btn btn-lg btn-outline-success">Submit</button>
        </div>
      </div>
    </form>

      <div class="mt-5 message-box text-success"></div>
  </div>
</template>

<script>
import ADD_LOCATION from "../graphql/addLocation";

export default {
  name: 'NewLocation',

  data() {
    return {
      photo: null
    }
  },

  methods: {
    handleSubmit: async function() {
      let address = this.$refs.address.value;
      let photoFile = this.$refs.photo.files[0];

      if (this.$refs.photo.value && address) {
        await this.$apollo.mutate({
          mutation: ADD_LOCATION,
          variables: {
            address,
            photo: photoFile
          },
        });
        this.message("Thank you for your entry! Your location will be public soon, check back in a bit.")
      }
    },

    message: function(msg) {
      document.querySelector('.message-box').innerText = msg;
    },
  },
  props: { msg: String }
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
