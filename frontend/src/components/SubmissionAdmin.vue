<template>
  <div id="submission-admin-page">
    <h1>Location Submission Admin Page</h1>
    <div class="submissions-container">
      <Submission :key="location.submission_id" v-for="location in locations" :location="location"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Submission from "./Submission";
export default {
  name: "SubmissionAdmiPage",
  components: {
    Submission
  },
  data() {
    return {
      locations: [],
      errors: []
    }
  },
  async created() {
    try {
        const result = await axios({
          url: '/graphql',
          method: 'post',
          data: {
            query: `
                {
                  submittedLocations {
                    address
                    createdAt
                  }
                }
              `
          }
        });
        this.locations = result.data.data.submittedLocations;
    } catch (error) {
        this.errors.push(error);
    }
  }
};
</script>

<style scoped>
  h1 {
    margin-bottom: 30px;
  }
  .submissions-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
    grid-gap: 15px;
    justify-content: center;
  }
</style>