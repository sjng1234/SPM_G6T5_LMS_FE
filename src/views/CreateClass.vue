<template>
  <div>
    <div v-if="uploaded == true" class="alert alert-success" role="alert">
      ✔ Successfully Uploaded!
    </div>
    <div v-else-if="uploaded == false" class="alert alert-danger" role="alert">
      ✖ Failed to upload - Please try again!
    </div>
    <h1>Create Class</h1>

    <form class="container-fluid p-5" onsubmit="return false;">
      <h4 class="text-primary">{{ course_id }}</h4>
      <div class="input-group mb-3 mt-2">
        <span class="input-group-text" id="basic-addon1">Class Size</span>
        <input
          type="number"
          class="form-control"
          placeholder="20"
          min="1"
          max="100"
          v-model="class_size"
          required
        />
      </div>
      <div class="input-group mb-3 mt-2">
        <span class="input-group-text" id="basic-addon1">Start Date</span>
        <input
          type="date"
          class="form-control date"
          v-model="start_datetime"
          :min="today"
          required
        />
        <span class="input-group-text" id="end_date">End Date</span>
        <input
          type="date"
          class="form-control"
          v-model="end_datetime"
          :min="start_datetime"
          required
        />
      </div>
      <select class="form-select" v-model="selected_trainer" required>
        <option value="" disabled selected>
          Choose a trainer for this class
        </option>
        <option
          :value="trainer.trainer_id"
          v-for="trainer in trainers"
          v-bind:key="trainer.trainer_id"
        >
          {{ trainer.name }}
        </option>
      </select>
      <button
        type="submit"
        onsubmit="return false;"
        v-on:click="createClass()"
        class="btn btn-primary mt-4"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["course_id", "course_name"],
  data() {
    return {
      class_creator_id: "Lee Yeow Leong",
      start_datetime: null,
      end_datetime: null,
      class_size: null,
      trainer_id: 3,
      uploaded: null,
      trainers: [],
      selected_trainer: null,
    };
  },
  computed: {
    today() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
  },
  mounted() {
    axios
      .get("https://g6t5-flask.herokuapp.com/admin/getAllTrainers")
      .then((response) => {
        this.trainers = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    createClass() {
      if (
        this.class_size > 0 &&
        this.class_size < 100 &&
        this.start_datetime &&
        this.end_datetime
      ) {
        var course_data = {
          course_id: this.course_id,
          class_creator_id: this.class_creator_id,
          start_datetime: this.start_datetime,
          end_datetime: this.end_datetime,
          class_size: this.class_size,
          trainer_id: this.selected_trainer,
        };
        var success = confirm("Are you sure you want to create this class?");
        if (success) {
          axios
            .post("https://g6t5-flask.herokuapp.com/classes/add", course_data)
            .then(() => {
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
  },
};
</script>

<style>
.date {
  margin-right: 10px;
}
#end_date {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
</style>
