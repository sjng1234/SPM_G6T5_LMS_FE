<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">{{ course_id }}-{{class_id}} Materials</h1>

    <div class="row">
      <button v-if="checkAllCompleted()" class="btn btn-primary mb-2 mt-2" @click="goToQuiz()">Take Quiz</button>
      <span class="bg-info mb-2 mt-2 p-2" v-else>Please complete all course materials to take quiz</span>
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
                  <div class="row align-items-center">
                    <div class="col-6">{{ material.material_name }}</div>
                    <div class="col-4">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="{onDownload(); completeMaterial(material,chapter.chapter_id)}"
                      >
                        Download
                      </button>
                    </div>
                    <div class="col-2">
                      <span v-if="getCompleted(chapter.chapter_id,material.material_id)" class="badge bg-success">&#10003;</span>
                    </div>
                  </div>
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
      materialCompletedState: {},
      materials_data: [],
      course_material_count: 0,
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
          this.course_material_count += chapter.materials.length;
        });
      })
      .catch((error) => {
        console.log(error);
        this.materials_data = "error";
      });
      this.checkCompletedMaterial();
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
    checkAllCompleted(){
      return Object.keys(this.materialCompletedState).length === this.course_material_count;
    },
    checkCompletedMaterial() {
      // Check material completion status
      let url = `http://127.0.0.1:5000/learner/getCompletedMaterials/${this.course_id}-${this.class_id}-${this.$store.state.user_id}`;
      console.log(url);
      axios.get(url).then((response) => {
        // console.log(response.data);
        response.data.forEach((completed) => {
          this.materialCompletedState[`${completed.chapter_id}-${completed.material_id}`] = true;
        });
        console.log(this.materialCompletedState);
      });
    },

    getCompleted(chapter_id, material_id) {
      return this.materialCompletedState[`${chapter_id}-${material_id}`];
    },
    
    completeMaterial(obj,chap_id) {
      // Update material completion status when user download material
      let url = "http://127.0.0.1:5000/learner/completeMaterial"
      axios.put(url, {
        learner_id: this.$store.state.user_id,
        course_id: this.course_id,
        class_id: this.class_id,
        chapter_id: chap_id,
        material_id: obj.material_id,
        material_name: obj.material_name,
        is_completed: true,
      })
      .then(()=>{
        this.checkCompletedMaterial();
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped></style>
