<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">Course: {{ course_id }}</h1>
    <div v-if="isDeleted == true" class="alert alert-success" role="alert">
      ✔ Successfully Deleted!
    </div>
    <div v-else-if="isDeleted == false" class="alert alert-danger" role="alert">
      ✖ Failed to delete - Please try again!
    </div>
    <h3 class="text-danger" v-if="class_data == 'error'">
      ⚠ Error! Course not found.
    </h3>
    <div
      v-if="class_data != 'error'"
      class="d-flex flex-row justify-content-end button"
    >
      <button class="btn btn-outline-dark" @click="createClass()">
        + New Class
      </button>
    </div>
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
            <th scope="col">Class ID</th>
            <th scope="col">Trainer Name</th>
            <th scope="col">Trainer ID</th>
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
            <th scope="row">{{ eachClass.class_id }}</th>
            <td>{{ eachClass.class_creator_id }}</td>
            <td>{{ eachClass.trainer_id }}</td>
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
            <td>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteClass(eachClass.class_id)"
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

export default {
  name: "Class",
  props: ["course_id", "course_name"],
  setup() {
    return {};
  },
  data() {
    return {
      class_data: [],
      isDeleted: null,
      preReq: [],
    };
  },
  mounted() {
    // console.log("course_id: " + this.course_id)
    if (!this.class_data.length) {
      let url =
        `https://g6t5-flask.herokuapp.com/course/getCourse/` +
        this.course_id +
        `/getAllClasses`;
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.class_data = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.class_data = "error";
        });
      let preq = `https://g6t5-flask.herokuapp.com/course/${this.course_id}/getPreReq`;
      axios
        .get(preq)
        .then((response) => {
          console.log(response.data);
          this.preReq = response.data[`Pre-Requisites-List`];
        })
        .catch((error) => {
          console.log(error);
          this.preReq = [];
        });
    }
  },
  methods: {
    createClass() {
      this.$router.push({
        name: "CreateClass",
        params: { course_id: this.course_id, course_name: this.course_name },
      });
    },

    deleteClass(class_id) {
      var id = this.course_id + "-" + class_id;
      var sure = confirm(`Are you sure you want to delete this class (${id})?`);
      if (sure) {
        axios
          .delete(`https://g6t5-flask.herokuapp.com/classes/delete/${id}`)
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
