<template>
  <div id="submission-admin-page">
    <h2>Locations Pending Verification</h2>
    <p class="mb-4">Make sure each location has a valid address and clear picture!</p>
    <div class="submissions-container">
      <Submission
      :key="location.submission_id"
      v-for="location in locations"
      :location="location"
      :id="location.submission_id"
      @update-locations="updateLocations"/>
      <h3 v-if="locations.length === 0">There are no pending submissions</h3>
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
                    id
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
  },
  methods: {
    updateLocations: function(id) {
      this.locations = this.locations.filter(location => {
        return location.id !== id;
      })
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
