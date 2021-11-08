<template>
  <div class="container d-flex flex-column">
    <h1 class="text-start mb-2 mt-2">Course: {{ course_id }}</h1>

    <div v-if="course_data.length>0" class="container row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Class ID</th>
            <th scope="col">Trainer Name</th>
            <th scope="col">Trainer ID</th>
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
            <td>{{ eachClass.start_datetime.slice(0, -12) }}</td>
            <td>{{ eachClass.end_datetime.slice(0, -12) }}</td>
            <!-- Insert v-if, check whether learner met pre-req -->
            <td v-if="checkMetPreReq">
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
            <td v-else>
              <button 
              class="btn btn-info text-secondary"
              @click="console.log('clicked')"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTop"
              >
              Pre-requisite not met
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
    <div v-else>
      <h3 class="text-danger">No Classes Available Yet</h3>
    </div>
    <div
      class="offcanvas offcanvas-end"
      style="height: fit-content; margin-right: 33%; margin-top:20%;"
      tabindex="-1"
      id="offcanvasTop"
    >
      <div class="offcanvas-header">
        <span></span>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <h2>Pre-requisites for this course:</h2>
        <ul class="list-group">
          <li v-for="i in course_prereq" :key="i" class="list-group-item">
            {{i}}
            <span v-if="learner_badges.includes(i)" class="badge bg-success">&#10003;</span>
          </li>
        </ul>
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
      course_prereq: [],
      learner_badges: [],
    };
  },
  computed: {
    checkCourse() {
      return this.checkEnrolledCourse();
    },
    checkClass(id) {
      return this.checkEnrolledClass(id);
    },
    checkMetPreReq(){
      let criteria = true;
      if (this.course_prereq.length===0){
        criteria = true;
      }else{
        this.course_prereq.forEach(course=>{
          if (!this.learner_badges.includes(course)){
            criteria = criteria && false;
          }
        });
        console.log(`Met prereq? ${criteria}`)
      }
      return criteria;
    }
  },
  mounted() {
    // console.log(this.course_id)
    let url =
      `https://g6t5-flask.herokuapp.com/course/getCourse/` +
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
    // Get course-prerequisites
    this.getCoursePreReq();
    // Get Learner's Badges
    this.getLearnerBadges();
  },
  methods: {
    modalOpen(data) {
      console.log(data);
      this.curr_class_id = data;
      console.log(this.curr_class_id);
      console.log("OPEN MODAL");

      let url =
        `https://g6t5-flask.herokuapp.com/classes/get/` +
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
      let url2 = `https://g6t5-flask.herokuapp.com/learner/getEnrolledClasses/2`;
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
        let url = `https://g6t5-flask.herokuapp.com/learner/drop/${obj.course_id}-${obj.class_id}-2`;
        console.log(url);
        axios.delete(url).then((response) => {
          console.log(response.data);
          this.getLearnerEnrolledClasses();
        });
      } else {
        let url = `https://g6t5-flask.herokuapp.com/learner/enrol`;
        delete obj.status;
        axios.post(url, obj).then((response) => {
          console.log(response.data);
          this.getLearnerEnrolledClasses();
        });
      }
    },
    getCoursePreReq(){
      let url = `https://g6t5-flask.herokuapp.com/course/${this.course_id}/getPreReq`;
      axios.get(url)
      .then(res=>{
        this.course_prereq = res.data['Pre-Requisites-List'];
      })
      .catch(e=> console.log(e));
    },
    getLearnerBadges(){
      let url = `https://g6t5-flask.herokuapp.com/learner/${this.$store.state.user_id}/getAllBadges`;
        axios.get(url).then(res => {
          this.learner_badges = res.data.badges;
        }).catch(e=>console.log(e));
    }
  },
};
</script>

<style scoped></style>
