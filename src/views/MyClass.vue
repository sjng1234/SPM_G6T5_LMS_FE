<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">
      My Classes
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
            <td>{{ item.enrol_date.slice(0, -12) }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="viewMaterials(item.course_id, item.class_id)"
              >
                Materials
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
      isLoading: true,
    };
  },
  mounted() {
    let url =
      `https://g6t5-flask.herokuapp.com/learner/getEnrolledClasses/` +
      this.learner_id;
    axios
      .get(url)
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
    viewMaterials(course_id, class_id) {
      var id = course_id + "-" + class_id;
      this.$router.push({ name: "Materials", params: { id: id } });
    },
  },
};
</script>

<style scoped></style>
