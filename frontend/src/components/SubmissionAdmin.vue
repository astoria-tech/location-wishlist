<template>
  <div id="submission-admin-page">
    <h2>Locations Pending Verification</h2>
    <p class="mb-4">Make sure each location has a valid address and clear picture!</p>
    <div class="submissions-container">
      <Submission
      :key="location.submission_id"
      v-for="location in submittedLocations"
      :location="location"
      :id="location.submission_id"
      @update-locations="updateLocations"/>
      <h3 v-if="submittedLocations.length === 0">There are no pending submissions</h3>
    </div>
  </div>
</template>

<script>
import Submission from "./Submission";
import { SUBMITTED_LOCATIONS_QUERY } from '../constants/graphql'

export default {
  name: "SubmissionAdminPage",
  components: {
    Submission
  },
  data() {
    return {
      submittedLocations: [],
      errors: []
    }
  },
  apollo: {
    submittedLocations: SUBMITTED_LOCATIONS_QUERY,
  },
  methods: {
    updateLocations: function(id) {
      this.submittedLocations = this.submittedLocations.filter(location => {
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
