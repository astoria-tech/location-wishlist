<template>
  <div class="submission-container">
    <h4>New Submission</h4>
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
      {{formatDate(location.timestamp)}}
    </div>
    <div class="button-container">
      <button>Accept</button>
      <button>Reject</button>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../mixins/formatDate.js'
export default {
  name: "Submission",
  props: {
    location: Object
  }, 
  mixins: [formatDate]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
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
