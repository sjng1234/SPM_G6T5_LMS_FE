<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">Courses</h1>
    <div v-if="isDeleted == true" class="alert alert-success" role="alert">
      ✔ Successfully Deleted!
    </div>
    <div v-else-if="isDeleted == false" class="alert alert-danger" role="alert">
      ✖ Failed to delete - Please try again!
    </div>
    <h3 class="text-danger" v-if="course_data == 'error'">
      ⚠ Error! Please refresh page.
    </h3>
    <div
      v-if="course_data != 'error'"
      class="d-flex flex-row justify-content-end button"
    >
      <router-link to="/CreateCourse">
        <button class="btn btn-outline-dark">+ New Course</button>
      </router-link>
    </div>
    <div class="container row">
      <table class="table" v-if="course_data != 'error'">
        <thead>
          <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Course Name</th>
            <th scope="col">Date Created</th>
            <th colspan="2"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="!course_data.length">
            <th colspan="3">No courses added yet!</th>
          </tr>
          <tr v-for="course in course_data" v-bind:key="course.course_id">
            <th scope="row">{{ course.course_id }}</th>
            <td>{{ course.course_name }}</td>
            <td>{{ course.date_created.slice(0, -12) }}</td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                @click="viewClass(course.course_id, course.course_name)"
              >
                View
              </button>
            </td>
            <td>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteCourse(course.course_id)"
              >
                Delete
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
import store from "@/store.js";

export default {
  name: "Home",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {
      course_data: [],
      isDeleted: null,
    };
  },
  mounted() {
    console.log(store.state)
    axios
      .get("https://g6t5-flask.herokuapp.com/course/getAll")
      .then((response) => {
        console.log(response);
        this.course_data = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.course_data = "error";
      });
    console.log(store.state.acc_type);
  },
  methods: {
    viewClass(id, name) {
      this.$router.push({
        name: "ClassAdmin",
        params: { course_id: id, course_name: name },
      });
    },
    deleteCourse(course_id) {
      var sure = confirm(
        `Are you sure you want to delete this course (${course_id})?`
      );
      if (sure) {
        axios
          .delete(`https://g6t5-flask.herokuapp.com/course/delete/${course_id}`)
          .then((response) => {
            console.log(response);
            location.reload();
            this.isDeleted = true;
          })
          .catch((error) => {
            console.log(error);
            this.isDeleted = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.button {
  padding-right: 2rem;
  margin-bottom: 1rem;
}
</style>
