<template>
  <div>
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

          <ClassRow
            v-for="item in items" 
            :key="item.courseID"
            v-bind:courseID="item.courseID"
            v-bind:classID="item.classID"
            v-bind:courseName="item.courseName"
            v-bind:trainerName="item.trainerName"
            v-bind:trainerID="item.trainerID"
            v-bind:preReq="item.preReq"
            v-bind:startDate="item.startDate"
            v-bind:endDate="item.endDate"
            v-bind:startTime="item.startTime"
            v-bind:endTime="item.endTime"
            v-bind:classSize="item.classSize"
            v-on:toggle="modalOpen"
          />
          
        </div>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
        <div class="modal-dialog modal-xl">
          <ItemModal 
          v-on:toggle="modalClose" v-bind:curData="this.curData" 
          />
        </div>
      </div>
      </div>
</template>

<script>
// import ItemModal from "@/components/ModalBody.vue";
import ItemModal from "../components/ModalEnroll.vue";
import ClassRow from "../components/FindCoursesRow.vue";


export default {
  name: "Home",
  components: {
    ItemModal,
    ClassRow,
  },
  setup() {
    return {};
  },
  data() {
    return {
      modalState: false,
      curData: {},
      items: [
      {
        courseID: "IS216",
        classID: "G9",
        courseName: "Web App Development",
        trainerName: "Shar",
        trainerID: "SMUF001",
        preReq: "IS211",
        startDate: "01/10/2021",
        endDate: "09/10/2021",
        startTime: "08:15",
        endTime: "11:30",
        classSize: 42
      },
      {
        courseID: "IS311",
        classID: "G2",
        courseName: "Machine Learning Algo",
        trainerName: "David James",
        trainerID: "SMUF001",
        preReq: "IS301",
        startDate: "03/10/2021",
        endDate: "15/10/2021",
        startTime: "13:00",
        endTime: "15:30",
        classSize: 32
      },
    ]
    }
  },
  methods: {
    modalOpen(data) {
      console.log("OPEN MODAL");
      console.log(data);
      console.log(this.modalState);
      try {
        this.curData = {
          courseID: data.courseID,
          classID: data.classID,
          courseName: data.courseName,
          trainerName: data.trainerName,
          trainerID: data.trainerID,
          preReq: data.preReq,
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
          classSize: data.classSize
        }
        console.log("#######");
        console.log(this.curData);
      } catch(e) {
        console.log(e);
        console.log("Error: This is an invalid move");
      }
      // this.curData = data;
      this.modalState = !this.modalState;
    },
    modalClose(msg) {
      console.log(msg);
      console.log(this.modalState);
      this.modalState = !this.modalState;
      this.curData = {};
    },
    goToEnroll() {
      // this.$router.push("./enroll");
      return
    },

  },
  
};
</script>

<style scoped>
</style>
