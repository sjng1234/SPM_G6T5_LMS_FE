<template>
  <div>
    <div>
      <h1 class="text-start mb-5">My Classes</h1>
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

            <MyCourses
            v-for="course in courses" 
            :key="course.courseID"
            v-bind:courseID="course.courseID"
            v-bind:classID="course.classID"
            v-bind:courseName="course.courseName"
            v-bind:trainerName="course.trainerName"
            v-bind:trainerID="course.trainerID"
            v-bind:preReq="course.preReq"
            v-bind:startDate="course.startDate"
            v-bind:endDate="course.endDate"
            v-bind:startTime="course.startTime"
            v-bind:endTime="course.endTime"
            v-bind:classSize="course.classSize"
            v-bind:chapterDoc="course.chapterDoc"
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
          <MaterialsModal 
          v-on:toggle="modalClose" v-bind:myData="this.myData" 
          />
        </div>
        </div>


  </div>
</template>

<script>
import MyCourses from "../components/MyClassesRow.vue";
import MaterialsModal from "../components/ModalMaterials.vue";

export default {
  name: "MyClass",
  components: {
    MyCourses,
    MaterialsModal,
  },
  setup() {
    return {};
  },
  data() {
    
    return {
      modalState: false,
      myData: {},
      courses: [
        {
          courseID: "IS111",
          classID: "G4",
          courseName: "Introduction to Programming",
          trainerName: "Joelle",
          trainerID: "SMUF111",
          preReq: "NA",
          startDate: "01/07/2021",
          endDate: "09/07/2021",
          startTime: "08:15",
          endTime: "11:30",
          classSize: 35,
          chapterDoc: [
            {lessonName : "Python Set-up", fileDownload: ["VSC.exe", "VSC2.exe", "VSC3.exe"]},
            {lessonName  : "Jupyter Set-up", fileDownload: ["AnacondaSetUp.exe", "Ana2.exe"]},
          ]
        },
        {
          courseID: "IS112",
          classID: "G1",
          courseName: "Introduction to Vue",
          trainerName: "Ouh Eng Smith",
          trainerID: "SMUF131",
          preReq: "NA",
          startDate: "01/09/2021",
          endDate: "09/09/2021",
          startTime: "08:15",
          endTime: "11:30",
          classSize: 32,
          chapterDoc: [
            {lessonName : "Vue Set-up", fileDownload: ["VSC.exe", "VSC2.exe", "VSC3.exe"]},
            {lessonName  : "whatever Set-up", fileDownload: ["whatever1.exe", "whatever2.exe"]},
          ]
        }
      ],
      
    }
  },
  methods: {
    modalOpen(data) {
      console.log("OPEN MODAL");
      console.log(data);
      console.log(this.modalState);
      try {
        this.myData = {
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
          classSize: data.classSize,
          chapterDoc: data.chapterDoc
        }
        console.log(this.myData);
      } catch(e) {
        console.log(e);
        console.log("Error: This is an invalid move");
      }
      this.modalState = !this.modalState;
    },
    modalClose(msg) {
      console.log(msg);
      console.log(this.modalState);
      this.modalState = !this.modalState;
      this.myData = {};
    },
  },
};
</script>

<style scoped></style>
