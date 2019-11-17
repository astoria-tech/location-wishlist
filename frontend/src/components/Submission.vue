<template>
  <div class="submission-container">
    <h3>Submission #{{location.submission_id}}</h3>
    <img class="submission-img" :src="location.img_url">
    <div class="address-container">
      <div>Address:</div>
      <div class="address">
        <div>{{location.address_line_1}}</div>
        <div>{{location.address_line_2}}</div>
      </div>
    </div>
    <div class="timestamp">
      <span>Submitted on:</span>
      11/17/2019 3:07 PM
    </div>
    <div class="button-container">
      <button>Accept</button>
      <button>Reject</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Submission",
  props: {
    location: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 3px 0;
}
.submission-container {
  border: 1px solid gray;
  border-radius: 15px;
  width: 300px;
  padding-bottom: 5px;
}

.submission-img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.address-container {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.address-container > div:first-of-type {
  margin-right: 10px;
  font-weight: 600;
}

.address {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.timestamp {
  font-size: 11px;
  margin-bottom: 5px;
}
.timestamp span {
  font-weight: 600;
}
</style>
