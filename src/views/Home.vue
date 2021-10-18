<template>
  <div>
    <h1 class="text-start mb-5">Find Classes</h1>
  </div>
  
      <div class="container">
        
          <div class="row">
            <div class="col-1">
              Course ID
            </div>
            <div class="col-1">
              Class ID
            </div>
            <div class="col-2">
              Course Name
            </div>
            <div class="col-2">
              Trainer Name
            </div>
            <div class="col-2">
              Pre-requisites
            </div>
            <div class="col-2">
              Start Date
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
          </div>
          <br>

        <div v-for="item in items" :key="item.courseID">
          <div class="row border border-1 rounded">
              <div class="col-1">
                {{ item.courseID }}
              </div>
              <div class="col-1">
                {{ item.classID }}
              </div>
              <div class="col-2">
                {{ item.courseName }}
              </div>
              <div class="col-2">
                {{ item.trainerName }}
              </div>
              <div class="col-2">
                {{ item.preReq }}
              </div>
              <div class="col-2">
                {{ item.startDate }}
              </div>
            <div class="col-1">
              <button
                name="enroll"
                id="enroll"
                class="btn btn-primary"
                @click="goToEnroll()"
              >
                Enroll
              </button>
            </div>
            <div class="col-1">
            </div>
          </div>
          <br>
        </div>
      </div>
  
    

</template>

<script>
export default {
  name: "Home",
  setup() {
    return {};
  },
  methods: {
    goToEnroll() {
      // this.$router.push("./enroll");
      return
    },
  },
  data() {
    return {
      items: [
      {
        courseID: "0001",
        classID: "00011",
        courseName: "Fundamentals of XXX",
        trainerName: "Jane Smith",
        preReq: "Fox",
        startDate: "01/10/2021",
      },
      {
        courseID: "0002",
        classID: "00022",
        courseName: "XXX",
        trainerName: "John Smith",
        preReq: "preReqs23",
        startDate: "03/10/2021",
      },
    ]
    }
  }
  
};
</script>

<style scoped>
</style>
