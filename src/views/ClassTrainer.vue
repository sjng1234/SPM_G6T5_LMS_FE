<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">
      Course: {{ course_id }}
      <div
        class="spinner-grow"
        style="width: 2rem; height: 2rem"
        role="status"
        v-if="isLoading"
      >
        <span class="sr-only"></span>
      </div>
    </h1>
    <div v-if="isDeleted == true" class="alert alert-success" role="alert">
      ✔ Successfully Deleted!
    </div>
    <div v-else-if="isDeleted == false" class="alert alert-danger" role="alert">
      ✖ Failed to delete - Please try again!
    </div>
    <h3 class="text-danger" v-if="class_data == 'error'">
      ⚠ Error! Course not found.
    </h3>

    <div class="card my-3 w-25" v-if="preReq.length">
      <div class="card-header">
        <h5 class="card-title text-center">
          Pre-Requisites ({{ preReq.length }})
        </h5>
      </div>
      <div class="card-body pb-1">
        <ol>
          <li
            class="card-text text-start fw-bold"
            v-for="req in preReq"
            :key="req"
          >
            {{ req }}
          </li>
        </ol>
      </div>
    </div>
    <div class="container p-0 row">
      <table class="table" v-if="class_data != 'error'">
        <thead>
          <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Class Size</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th colspan="4"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="!class_data.length">
            <th colspan="6">No classes added yet!</th>
          </tr>
          <tr v-for="eachClass in class_data" v-bind:key="eachClass.class_id">
            <th scope="row">{{ eachClass.course_id }}</th>
            <td>{{ eachClass.class_size }}</td>
            <td>{{ eachClass.start_datetime.slice(0, -12) }}</td>
            <td>{{ eachClass.end_datetime.slice(0, -12) }}</td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                @click="viewClass(eachClass.course_id, eachClass.class_id)"
              >
                View
              </button>
            </td>
            <td>
              <button
                v-if="!eachClass.quiz_created"
                class="btn btn-sm btn-dark"
                @click="addQuiz(eachClass.course_id, eachClass.class_id)"
              >
                +Quiz
              </button>
              <button
                v-else
                class="btn btn-sm btn-outline-primary"
                @click="viewQuiz(eachClass.course_id, eachClass.class_id)"
              >
                Quiz
              </button>
            </td>

            <td>
              <button
                class="btn btn-sm btn-secondary"
                @click="enrolment(eachClass.course_id, eachClass.class_id)"
              >
                Enrolment
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
  name: "Class",
  props: ["id"],
  setup() {
    return {};
  },
  data() {
    return {
      class_data: [],
      isDeleted: null,
      preReq: [],
      isLoading: true,
    };
  },
  mounted() {
    if (!this.class_data.length) {
      let url = `https://g6t5-flask.herokuapp.com/trainer/getAllClasses/${this.id}`;
      axios
        .get(url)
        .then((response) => {
          this.class_data = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.class_data = "error";
          this.isLoading = false;
        });
    }
  },
  methods: {
    addQuiz(course_id, class_id) {
      var id = course_id + "-" + class_id;
      this.$router.push({ name: "CreateQuiz", params: { id: id } });
    },
    viewQuiz(course_id, class_id) {
      var id = course_id + "-" + class_id;
      this.$router.push({ name: "Quiz", params: { id: id } });
    },
    viewClass(course_id, class_id) {
      var id = course_id + "-" + class_id;
      this.$router.push({ name: "ChapterAdmin", params: { id: id } });
    },
    enrolment(course_id, class_id) {
      var id = course_id + "-" + class_id;
      this.$router.push({ name: "EnrolledLearners", params: { id: id } });
    },
  },
};
</script>

<style scoped></style>
