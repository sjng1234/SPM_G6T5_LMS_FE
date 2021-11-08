<template>
  <div class="card p-2 align-items-center">
    <img
      src="https://github.com/mdo.png"
      alt="hugenerd"
      width="100"
      height="100"
      class="rounded-circle"
    />
    <div class="card-header">
      <div
        class="spinner-grow"
        style="width: 2rem; height: 2rem"
        role="status"
        v-if="isLoading"
      >
        <span class="sr-only"></span>
      </div>
      <h3>{{ user_data.name }}</h3>
      <h5>{{ user_data.department }}, {{ user_data.position }}</h5>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-horizontal justify-content-center">
        <li class="list-group-item">
          {{
            this.$store.state.acc_type == "learner"
              ? "Badges Earned"
              : "Number of Qualified Courses"
          }}
        </li>
        <li class="list-group-item">{{ num_qualifications }}</li>
      </ul>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              Course(s)
              {{
                this.$store.state.acc_type == "learner"
                  ? "Completed"
                  : "Qualified"
              }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="qualification in qualifications" :key="qualification">
            <td>{{ qualification }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  props: ["id"],
  data() {
    return {
      qualifications: [],
      num_qualifications: 0,
      user_data: {},
      isLoading: true,
    };
  },

  async mounted() {
    await this.getCredentials();
    await this.getDetails();
    this.isLoading = false;
  },

  methods: {
    getCredentials() {
      if (this.$store.state.acc_type == "learner") {
        let url = `https://g6t5-flask.herokuapp.com/learner/${this.id}/getAllBadges`;
        axios
          .get(url)
          .then((response) => {
            this.qualifications = response.data.badges;
            this.num_qualifications = response.data.badges.length;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$store.state.acc_type == "trainer") {
        let url = `https://g6t5-flask.herokuapp.com/trainer/getAllQualifications/${this.id}`;
        axios
          .get(url)
          .then((response) => {
            this.qualifications = response.data;
            this.num_qualifications = response.data.length;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getDetails() {
      var url = "";
      if (this.$store.state.acc_type == "learner") {
        url = `https://g6t5-flask.herokuapp.com/learner/${this.id}`;
      } else if (this.$store.state.acc_type == "trainer") {
        url = `https://g6t5-flask.herokuapp.com/trainer/${this.id}`;
      }
      axios.get(url).then((response) => {
        this.user_data = response.data;
      });
    },
  },
};
</script>

<style scoped></style>
