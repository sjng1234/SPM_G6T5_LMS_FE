<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">Course: {{ course_id }}</h1>

    <div class="container row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Class ID</th>
            <th scope="col">Trainer Name</th>
            <th scope="col">Trainer ID</th>
            <!-- <th scope="col">Pre-requisites</th> -->
            <th scope="col">Class Size</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="eachClass in course_data" v-bind:key="eachClass.class_id">
            <th scope="row">{{ eachClass.class_id }}</th>
            <td>{{ eachClass.class_creator_id }}</td>
            <td>{{ eachClass.trainer_id }}</td>
            <td>{{ eachClass.class_size }}</td>
            <td>{{ eachClass.start_datetime }}</td>
            <td>{{ eachClass.end_datetime }}</td>
            <td>
              <button
                class="btn btn-primary"
                v-on:click="modalOpen(eachClass.class_id)"
                v-if="!checkCourse && !checkEnrolledClass(eachClass.class_id)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Enroll
              </button>
              <button
                class="btn btn-danger"
                v-on:click="modalOpen(eachClass.class_id)"
                v-if="checkCourse && checkEnrolledClass(eachClass.class_id)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Drop Class
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <ItemModal
            v-on:toggle="modalClose"
            v-bind:course_id="this.course_id"
            v-bind:class_data="class_data"
            v-bind:status="class_status"
            v-on:enrol="updateClassEnrolment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ItemModal from "../components/ModalEnroll.vue";

export default {
  name: "Class",
  modalState: false,
  props: ["course_id"],
  components: {
    ItemModal,
  },
  setup() {
    return {};
  },
  data() {
    return {
      course_data: [],
      enrolled_classes: [],
      class_data: [],
      curr_class_id: "",
      class_status: false,
    };
  },
  computed: {
    checkCourse() {
      return this.checkEnrolledCourse();
    },
    checkClass(id) {
      return this.checkEnrolledClass(id);
    },
  },
  mounted() {
    // console.log(this.course_id)
    let url =
      `http://127.0.0.1:5000/course/getCourse/` +
      this.course_id +
      `/getAllClasses`;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.course_data = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.course_data = "error";
      });
    // Get Learner Enrolled Classes
    this.getLearnerEnrolledClasses();
  },
  methods: {
    modalOpen(data) {
      console.log(data);
      this.curr_class_id = data;
      console.log(this.curr_class_id);
      console.log("OPEN MODAL");

      let url =
        `http://127.0.0.1:5000/classes/get/` +
        this.course_id +
        `-` +
        this.curr_class_id;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.class_data = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.class_data = "error";
        });
      this.modalState = !this.modalState;
      this.class_status = this.checkEnrolledClass(data);
    },
    modalClose(msg) {
      console.log(msg);
      console.log(this.modalState);
      this.curr_class_id = "";
      this.modalState = !this.modalState;
      this.class_status = false;
    },
    getLearnerEnrolledClasses() {
      let url2 = `http://127.0.0.1:5000/learner/getEnrolledClasses/2`;
      axios
        .get(url2)
        .then((response) => {
          // console.log(response);
          let enrolled = [];
          response.data.forEach((c) => {
            enrolled.push({
              class_id: c.class_id,
              course_id: c.course_id,
            });
          });
          this.enrolled_classes = enrolled;
          console.log(this.enrolled_classes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkEnrolledCourse() {
      let enrolled = false;
      this.enrolled_classes.forEach((c) => {
        if (c.course_id == this.course_id) {
          enrolled = true;
        }
      });
      return enrolled;
    },
    checkEnrolledClass(id) {
      let enrolled = false;
      this.enrolled_classes.forEach((c) => {
        if (c.class_id == id && c.course_id == this.course_id) {
          enrolled = true;
        }
      });
      return enrolled;
    },
    updateClassEnrolment(obj) {
      console.log(obj);
      if (obj.status) {
        let url = `http://127.0.0.1:5000/learner/drop/${obj.course_id}-${obj.class_id}-2`;
        console.log(url);
        axios.delete(url).then((response) => {
          console.log(response.data);
          this.getLearnerEnrolledClasses();
        });
      } else {
        let url = `http://127.0.0.1:5000/learner/enrol`;
        delete obj.status;
        axios.post(url, obj).then((response) => {
          console.log(response.data);
          this.getLearnerEnrolledClasses();
        });
      }
    },
  },
};
</script>

<style scoped></style>
