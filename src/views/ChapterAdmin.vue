<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">
      Class: {{ course_id }}-{{ class_id }}
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
    <h3 class="text-danger" v-if="chapter_data == 'error'">
      ⚠ Error! Class not found.
    </h3>
    <div
      v-if="chapter_data != 'error'"
      class="d-flex flex-row justify-content-end button"
    >
      <button class="btn btn-outline-dark" @click="createChapter()">
        + New Chapter
      </button>
    </div>
    <div class="container p-0 row">
      <table class="table" v-if="chapter_data != 'error'">
        <thead>
          <tr>
            <th scope="col">Chapter</th>
            <th scope="col">Title</th>
            <th scope="col">Materials</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="!chapter_data.length">
            <th colspan="3">No chapters added yet!</th>
          </tr>
          <tr
            v-for="eachChapter in chapter_data"
            v-bind:key="eachChapter.chapter_id"
          >
            <th scope="row">{{ eachChapter.chapter_id }}</th>
            <td>{{ eachChapter.chapter_name }}</td>
            <td>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#chapter' + eachChapter.chapter_id"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                View
              </button>
            </td>
            <td class="materials">
              <div class="collapse" :id="'chapter' + eachChapter.chapter_id">
                <div class="card card-body pt-0">
                  <table class="table table-sm table-borderless caption-top">
                    <caption>
                      List of Materials
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="material in eachChapter.materials"
                        v-bind:key="material.material_id"
                      >
                        <td>{{ material.material_name }}</td>
                        <td>
                          <a
                            :href="material.material_reference"
                            download
                            class="fs-5"
                            >⇩</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
  name: "Chapter",
  props: ["id"],
  setup() {
    return {};
  },
  data() {
    return {
      chapter_data: [],
      isDeleted: null,
      course_id: null,
      class_id: null,
      isLoading: true,
    };
  },
  mounted() {
    var [course_id, class_id] = this.id.split("-");
    this.course_id = course_id;
    this.class_id = class_id;

    let url = `https://g6t5-flask.herokuapp.com/classes/getChapters/${this.id}`;
    axios
      .get(url)
      .then((response) => {
        this.chapter_data = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.chapter_data = "error";
        this.isLoading = false;
      });
  },
  methods: {
    createChapter() {
      this.$router.push({ name: "CreateChapter", params: { id: this.id } });
    },

    deleteClass(class_id) {
      var id = this.course_id + "-" + class_id;
      var sure = confirm(`Are you sure you want to delete this class (${id})?`);
      if (sure) {
        axios
          .delete(`https://g6t5-flask.herokuapp.com/classes/delete/${id}`)
          .then(() => {
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
.materials {
  border-bottom: 0px solid transparent;
  width: 100%;
  float: left;
  clear: left;
}
.card {
  border: 0px solid transparent;
}
</style>
