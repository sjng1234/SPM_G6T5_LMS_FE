<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">
      Find Courses
      <div
        class="spinner-grow"
        style="width: 2rem; height: 2rem"
        role="status"
        v-if="isLoading"
      >
        <span class="sr-only"></span>
      </div>
    </h1>
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
            <th scope="col">Course Name</th>
            <th scope="col">Date Created</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="!items.length && !isLoading">
            <th colspan="3">No courses added yet!</th>
          </tr>
          <tr v-for="item in items" v-bind:key="item.course_id">
            <th scope="row">{{ item.course_id }}</th>
            <td>{{ item.course_name }}</td>
            <td>{{ item.date_created.slice(0, -12) }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="viewClass(item.course_id)"
              >
                View Classes
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {
      modalState: false,
      curData: {},
      selected_courseID: "",
      items: [],
      isLoading: true,
    };
  },
  mounted() {
    axios
      .get("https://g6t5-flask.herokuapp.com/course/getAll")
      .then((response) => {
        this.items = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.items = "error";
        this.isLoading = false;
      });
  },
  methods: {
    viewClass(id) {
      console.log(id);
      this.$router.push({ name: "Class", params: { course_id: id } });
    },
    modalOpen(data) {
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
          classSize: data.classSize,
        };
      } catch (e) {
        console.log(e);
        console.log("Error: This is an invalid move");
      }
      this.modalState = !this.modalState;
    },
    modalClose() {
      this.modalState = !this.modalState;
      this.curData = {};
    },
  },
};
</script>

<style scoped></style>
