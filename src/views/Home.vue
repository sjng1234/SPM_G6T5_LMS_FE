<template>
  <!-- <div>
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
      </div> -->
    <div class="container d-flex flex-column">
      <h1 class="text-start mb-2 mt-2">Find Courses</h1>
      <h3 class="text-danger" v-if="items == 'error'">⚠ Error! Please refresh page.</h3>
      <div v-if="items != 'error' " class="d-flex flex-row justify-content-end button">
      </div>
        <div class="container row">
          <table class="table" v-if="items != 'error'">
            <thead>
                <tr>
                <th scope="col">Course ID</th>
                <th scope="col">Course Name</th>
                <th scope="col">Date Created</th>
                <th scope="col"></th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="!items.length">
                    <th colspan="3">No courses added yet!</th>
                </tr>
                <tr v-for="item in items" v-bind:key="item.course_id">
                <th scope="row">{{item.course_id}}</th>
                <td>{{item.course_name}}</td>
                <td>{{item.date_created}}</td>
                <td>
                    <button class="btn btn-primary" @click="viewClass(item.course_id)">View Classes</button>
                </td>
                </tr>
                
            </tbody>
            </table>
            
          
        
      
        </div>
    </div>
     
</template>

<script>
// import ItemModal from "@/components/ModalBody.vue";
// import ItemModal from "../components/ModalEnroll.vue";
// import ClassRow from "../components/FindCoursesRow.vue";
import axios from "axios";


export default {
  name: "Home",
  components: {
    // ItemModal,
    // ClassRow,
  },
  setup() {
    return {};
  },
  data() {
    return {
      modalState: false,
      curData: {},
      selected_courseID: "",
      items: [
      // {
      //   courseID: "IS216",
      //   classID: "G9",
      //   courseName: "Web App Development",
      //   trainerName: "Shar",
      //   trainerID: "SMUF001",
      //   preReq: "IS211",
      //   startDate: "01/10/2021",
      //   endDate: "09/10/2021",
      //   startTime: "08:15",
      //   endTime: "11:30",
      //   classSize: 42
      // },
      // {
      //   courseID: "IS311",
      //   classID: "G2",
      //   courseName: "Machine Learning Algo",
      //   trainerName: "David James",
      //   trainerID: "SMUF001",
      //   preReq: "IS301",
      //   startDate: "03/10/2021",
      //   endDate: "15/10/2021",
      //   startTime: "13:00",
      //   endTime: "15:30",
      //   classSize: 32
      // },
    ]
    }
  },
  mounted() {
    axios.get("http://127.0.0.1:5000/course/getAll").then(response => {
          console.log(response)
          this.items = response.data
      }).catch((error) => {
            console.log(error)
            this.items = "error"
      })
  },
  methods: {
    viewClass(id){
      console.log(id)
      this.$router.push({ name: 'Class', params: { course_id: id }})
    },
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
