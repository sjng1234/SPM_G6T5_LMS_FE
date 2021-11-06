<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">My Classes</h1>
    <h3 class="text-danger" v-if="items == 'error'">
      ⚠ Error! Please refresh page.
    </h3>
    <div
      v-if="items != 'error'"
      class="d-flex flex-row justify-content-end button"
    ></div>
    <div class="container row">
      <table class="table" v-if="items != 'error'">
        <thead>
          <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Class ID</th>
            <th scope="col">Date Enrolled</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="!items.length">
            <th colspan="3">No classes enrolled yet!</th>
          </tr>
          <tr v-for="item in items" v-bind:key="item.course_id">
            <th scope="row">{{ item.course_id }}</th>
            <td>{{ item.class_id }}</td>
            <td>{{ item.enrol_date }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="viewMaterials(item.course_id)"
              >
                Materials
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <div>
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


  </div> -->
</template>

<script>
import axios from "axios";

export default {
  name: "MyClass",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {
      modalState: false,
      myData: {},
      items: [],
      learner_id: 2,
    };
  },
  mounted() {
    console.log(this.learner_id);
    let url =
      `http://127.0.0.1:5000/learner/getEnrolledClasses/` + this.learner_id;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.items = "error";
      });
  },
  methods: {
    viewMaterials(id) {
      console.log(id);
      this.$router.push({ name: "Materials", params: { course_id: id } });
    },
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
          chapterDoc: data.chapterDoc,
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
