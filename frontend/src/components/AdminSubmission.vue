<template>
  <div id="admin-submission-page">
    <h1>Location Submission Admin Page</h1>
    <div class="submissions-container">
      <Submission :key="location.submission_id" v-for="location in locations" :location="location"/>
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
        },        
        {
          submission_id: "B4DA57",
          address_line_1: "21-15 Astoria Blvd",
          address_line_2: "Astoria, NY 11102",
          img_url:
            "https://images1.cityfeet.com/i2/2g3GOss6mHDqhslcvCXJN2dE3W6fspWUR5NwsvzEbE8/117/astoria-retail-for-lease-21-15-astoria-blvd.jpg",
          timestamp: 1574024343708
        },
         {
          submission_id: "B4DA58",
          address_line_1: "25-11 Broadway",
          address_line_2: "Astoria, NY 11106",
          img_url: "https://i.imgur.com/LF1Ndmb.jpg",
          timestamp: 1574024343708
        },
        {
          submission_id: "B4DA59",
          address_line_1: "31-08 Steinway St",
          address_line_2: "Astoria, NY 11103",
          img_url:
            "https://astoriapost.com/wp-content/uploads/sites/27/2019/08/Fallas-600x450.jpg",
          timestamp: 1574024343708
        },        
        {
          submission_id: "B4DA60",
          address_line_1: "21-15 Astoria Blvd",
          address_line_2: "Astoria, NY 11102",
          img_url:
            "https://images1.cityfeet.com/i2/2g3GOss6mHDqhslcvCXJN2dE3W6fspWUR5NwsvzEbE8/117/astoria-retail-for-lease-21-15-astoria-blvd.jpg",
          timestamp: 1574024343708
        }
      ]
    };
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