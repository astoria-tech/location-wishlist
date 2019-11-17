<template>
  <div id="admin-submission-page">
    <h1>This is the admin submission page</h1>

    <div class="submissions-container" :key="location.submission_id" v-for="location in locations">
      <Submission :location="location"/>
    </div>
  </div>
</template>

<script>
import Submission from "./Submission";

export default {
  name: "AdminSubmissionPage",
  components: {
    Submission
  },
  data() {
    return {
      locations: [
        {
          submission_id: "B4DA55",
          address_line_1: "25-11 Broadway",
          address_line_2: "Astoria, NY 11106",
          img_url: "https://i.imgur.com/LF1Ndmb.jpg",
          timestamp: 1574024343708
        },
        {
          submission_id: "B4DA56",
          address_line_1: "31-08 Steinway St",
          address_line_2: "Astoria, NY 11103",
          img_url:
            "https://astoriapost.com/wp-content/uploads/sites/27/2019/08/Fallas-600x450.jpg",
          timestamp: 1574024343708
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>