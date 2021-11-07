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
              @click="toggleAccordion()"
              class="btn btn-outline-info"
              :aria-expanded="isOpen"
              :aria-controls="chapter.materials.material_id"
            >
              Expand Materials
            </button>

            <div v-if="isOpen" v-bind:id="chapter.materials.material_id">
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
  props: ["course_id", "class_id"],
  setup() {
    return {};
  },
  data() {
    return {
      isOpen: false,
      materials_data: [],
    };
  },
  mounted() {
    let url = `http://127.0.0.1:5000/classes/getChapters/${this.course_id}-${this.class_id}`
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.materials_data = response.data;
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

    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },

    goToQuiz() {
      this.$router.push(`/Quiz/` + this.course_id + `-` + this.class_id)
    },
  },
};
</script>

<style scoped></style>
