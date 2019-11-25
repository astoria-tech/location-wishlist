<template>
  <div class="body">
    <h1>New Location</h1>

    <ul style="list-style-type: disc;">
      Instructions:
      <em>
        <li>Type the address below</li>
        <li>Include a clear picture of the storefront</li>
      </em>
    </ul>
    <br>
    <br>
    <form class="row flex-column align-items-center">
      
      <div class="col-6">
        <label for="address">Location address</label>
        <input type="address" class="form-control" id="address" aria-describedby="address" placeholder="Ex: 29-34 38th Street">
        <br>
      </div>


      <div class="col-6">
        <label for="image-file">Please upload a picture of the storefront</label>
        <br>
        <input type="file" class="form-control-sm" id="exampleFormControlFile1">

      </div>
      <button type="submit" class="btn btn-primary">SUBMIT</button>
    </form>

  </div>

</template>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li { margin: 10px; }
  a { color: #42b983; }
</style>
