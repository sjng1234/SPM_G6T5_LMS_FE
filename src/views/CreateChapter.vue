<template>
  <div>
    <div v-if="uploaded == true" class="alert alert-success" role="alert">
      ✔ Successfully Uploaded!
    </div>
    <div v-else-if="uploaded == false" class="alert alert-danger" role="alert">
      ✖ Failed to upload - Please try again!
    </div>
    <h1>Create Chapter</h1>
    <form class="container-fluid p-5" onsubmit="return false;">
      <div class="input-group mb-3 mt-2">
        <span class="input-group-text">Chapter ID</span>
        <input
          type="number"
          class="form-control"
          style="text-transform: uppercase"
          v-model="chapter_id"
          required
        />
      </div>
      <div class="input-group mb-3 mt-2">
        <span class="input-group-text">Chapter Name</span>
        <input
          type="text"
          class="form-control"
          v-model="chapter_name"
          required
        />
      </div>
      <hr class="bg-dark mt-3" />
      <h5 class="text-start mt-4 text-muted">Materials</h5>
      <h6 class="text-start text-muted mb-3">(Zip files only)</h6>
      <div class="input-group mb-3 mt-2">
        <span class="input-group-text">Material Name</span>
        <input
          type="text"
          class="form-control"
          v-model="material_name"
          required
        />
      </div>
      <div class="input-group mb-3 mt-2">
        <input
          type="file"
          class="form-control"
          accept=".zip,.rar,.7zip"
          required
        />
      </div>

      <button
        type="submit"
        onsubmit="return false;"
        v-on:click="createChapter()"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      course_id: "",
      class_id: "",
      chapter_id: "",
      chapter_name: "",
      material_name: "",
      material_reference:
        "https://auxion.s3.ap-southeast-1.amazonaws.com/Materials.zip",
      uploaded: null,
      all_courses: {},
      selected_prereq: [],
    };
  },
  mounted() {
    var [course_id, class_id] = this.id.split("-");
    this.course_id = course_id;
    this.class_id = class_id;
  },
  props: ["id"],
  methods: {
    createChapter() {
      if (this.chapter_id && this.chapter_name && this.material_name) {
        var success = confirm("Are you sure you want to create this chapter?");
        if (success) {
          var chapter_data = {
            course_id: this.course_id,
            class_id: this.class_id,
            chapter_id: this.chapter_id,
            chapter_name: this.chapter_name,
          };

          axios
            .post(
              "https://g6t5-flask.herokuapp.com/chapter/addChapter",
              chapter_data
            )
            .then(async () => {
              if (this.material_name) {
                var material_data = {
                  course_id: this.course_id,
                  class_id: this.class_id,
                  chapter_id: this.chapter_id,
                  material_id: 1,
                  material_name: this.material_name,
                  material_reference: this.material_reference,
                };
                axios
                  .put(
                    "https://g6t5-flask.herokuapp.com/material/add",
                    material_data
                  )
                  .catch((error) => {
                    console.log(error);
                  });
              }
              this.uploaded = true;
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              this.uploaded = false;
            });
        }
      }
    },
    removeOptions() {
      this.selected_prereq = null;
    },
  },
};
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>
