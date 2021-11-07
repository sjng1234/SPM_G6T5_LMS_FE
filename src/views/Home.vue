<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">Find Courses</h1>
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
          <tr v-if="!items.length">
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
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:5000/course/getAll")
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
    viewClass(id) {
      console.log(id);
      this.$router.push({ name: "Class", params: { course_id: id } });
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
          classSize: data.classSize,
        };
        console.log("#######");
        console.log(this.curData);
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
      this.curData = {};
    },
  },
};
</script>

<style scoped></style>
