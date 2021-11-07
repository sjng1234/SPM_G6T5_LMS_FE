<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">{{ course_id }}-{{class_id}} Materials</h1>

    <div>
      <button class="btn btn-primary d-flex mb-2 mt-2" @click="goToQuiz()">Take Quiz</button>
    </div> 
  
  </div>

  

  <div class="container row">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Chapter</th>
          <th scope="col">Title</th>
          <th scope="col">Materials</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="chapter in materials_data" v-bind:key="chapter.chapter_id">
          <th scope="row">{{ chapter.chapter_id }}</th>
          <td>{{ chapter.chapter_name }}</td>
          <td>
            <button
              @click="toggleAccordion(chapter.chapter_id)"
              class="btn btn-outline-info"
              :aria-expanded="this.openState[chapter.chapter_id]"
              :aria-controls="chapter.materials.material_id"
            >
              Expand Materials
            </button>

            <div v-if="this.openState[chapter.chapter_id]" v-bind:id="chapter.materials.material_id">
              <div
                v-for="material in chapter.materials"
                v-bind:key="material.material_id"
                class="col"
              >
                <br />
                <div class="row">
                  <div class="col-6">{{ material.material_name }}</div>
                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="onDownload()"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Materials",
  props: ["id"],
  setup() {
    return {};
  },
  data() {
    return {
      course_id: "",
      class_id: "",
      openState: {},
      materials_data: [],
    };
  },
  mounted() {
    
    var [course_id, class_id] = this.id.split("-");
    this.course_id = course_id;
    this.class_id = class_id;

    let url = `http://127.0.0.1:5000/classes/getChapters/${this.course_id}-${this.class_id}`
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.materials_data = response.data;
        this.materials_data.forEach((chapter) => {
          this.openState[chapter.chapter_id] = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.materials_data = "error";
      });
  },
  methods: {
    onDownload() {
      axios({
        url: "https://auxion.s3.ap-southeast-1.amazonaws.com/Materials.zip",
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "materials.zip");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    toggleAccordion(id) {
      this.openState[id] = !this.openState[id];
    },

    goToQuiz() {
      var id = this.course_id + "-" + this.class_id;
      this.$router.push({ name: "Quiz", params: { id: id } });
    },
    
  },
};
</script>

<style scoped></style>
