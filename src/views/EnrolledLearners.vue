<template>
  <div>
    <div>
      <h1 class="text-start mb-5">Enrolled learners</h1>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-1">Course ID</div>
        <div class="col-1">Course Name</div>
        <div class="col-2">Class ID</div>
        <div class="col-2">Trainer Name</div>
        <div class="col-1"></div>
        <div class="col-1"></div>
      </div>
      <br />
    </div>

    <br />
    <br />

    <div class="container">
      <div class="row">
        <div class="col-1">User ID</div>
        <div class="col-1">Learner ID</div>
        <div class="col-2">Learner Name</div>
        <div class="col-2">Learner Badges</div>
        <div class="col-1"></div>
        <div class="col-1"></div>
      </div>
      <br />

      <MyCourses
        v-for="user in user"
        v-bind:key="user.classID"
        v-bind:courseID="course.courseID"
        v-bind:classID="course.classID"
        v-bind:courseName="course.courseName"
        v-bind:trainerName="course.trainerName"
        v-bind:userID="user.userID"
        v-bind:learnerID="user.learnerID"
        v-bind:learnername="user.learnername"
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
        <MaterialsModal v-on:toggle="modalClose" v-bind:myData="this.myData" />
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
          // HEIN: HAVENT DECIDE HOW I WANT TO DISPLAY THE CHAPTER AND RESPECTIVE DOCUMENTS YET
          // REMINDER: fileDownload needs to be list of files...multiple files
          chapterDoc: [
            { lessonName: "Python Set-up", fileDownload: "VSC.exe" },
            { lessonName: "Jupyter Set-up", fileDownload: "AnacondaSetUp.exe" },
          ],
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
            { lessonName: "Vue Set-up", fileDownload: "Vue.exe" },
            { lessonName: "whatever Set-up", fileDownload: "whatever.exe" },
          ],
        },
      ],
    };
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
          userID: data.userID,
          learnerID: data.learnerID,
          learnerName: data.learnerName,
        };
        console.log(this.myData);
      } catch (e) {
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