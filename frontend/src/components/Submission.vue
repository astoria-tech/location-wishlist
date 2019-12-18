<template>
  <div class="submission-container">
    <h4 class="m-3">{{location.address}}</h4>
    <img class="submission-img" src="https://i.imgur.com/LF1Ndmb.jpg">
    <div class="timestamp mt-3">
      <span>Submitted on:</span>
      {{formatDate(location.createdAt)}}
    </div>
    <div class="button-container m-3 mb-3">
      <a v-on:click="approveLocation(location.id)" href="#" class="btn btn-outline-success mr-3">Approve</a>
      <a v-on:click="rejectLocation(location.id)" href="#" class="btn btn-outline-success">Reject</a>
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
    approveLocation: async function (id) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              approveLocation(
                id: "${id}"
              )
            }
          `
        }
      });
      this.$emit("update-locations", id)
    },
    rejectLocation: async function (id) {
      await axios({
        url: '/graphql',
        method: 'post',
        data: {
          query: `
            mutation {
              rejectLocation(
                id: "${id}"
              )
            }
          `
        }
      });
      this.$emit("update-locations", id)
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
