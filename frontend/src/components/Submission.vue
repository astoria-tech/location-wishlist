<template>
  <div class="submission-container">
    <h4>New Submission</h4>
    <img class="submission-img" src="https://i.imgur.com/LF1Ndmb.jpg">
    <div class="address">
      <div>{{location.address}}</div>
    </div>
    <div class="timestamp">
      <span>Submitted on:</span>
      {{formatDate(location.createdAt)}}
    </div>
    <div class="button-container">
      <a v-on:click="approveLocation(location.address)" href="#" class="btn btn-outline-success">Approve</a>
      <a v-on:click="rejectLocation(location.address)" href="#" class="btn btn-outline-success">Reject</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import { formatDate } from '../mixins/formatDate.js'

export default {
  name: "Submission",
  props: {
    location: Object
  }, 
  mixins: [formatDate],
  methods: {
    approveLocation: async function (address) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              approveLocation(
                address: "${address}"
              )
            }
          `
        }
      });
    },
    rejectLocation: async function (address) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              rejectLocation(
                address: "${address}"
              )
            }
          `
        }
      });
    }
  }
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
.address {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timestamp {
  font-size: 11px;
  margin-bottom: 5px;
}
.timestamp span {
  font-weight: 600;
}
</style>