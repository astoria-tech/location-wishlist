<template>
  <div class="body">
    <h1 class="mb-5">Vacant Location Wishlists</h1>
    <p>Have you ever walked by a vacant store and wished it would open as a new bookstore?</p>
    <p>Or a daycare? Or an archery range?</p>
    <p>Well, now is the time to be heard!</p>

    <div class="mt-5 mb-5">
      <p class="text-success h3">Submit a vacant location below!</p>

      <div class="container mt-3">
        <div class="row justify-content-center">
          <form @submit.prevent="handleSubmit" class="input-group col-lg-6 col-md-8">
            <input type="text" class="form-control" placeholder="Enter vacant location address" aria-label="Vacant location address input" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button type="submit" class="btn btn-outline-success" id="button-addon2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <p class="mt-5"><strong>Look for wishlist QR stickers near vacant storefronts, scan them, and cast your vote!</strong></p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: { msg: String }
}
</script>

<style scoped>
</style>
