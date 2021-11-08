<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideMenu
        @loggedIn="updateLoggedIn"
        v-if="this.user.length > 0 && this.user !== 'admin'"
      />
      <SideMenuAdmin
        @loggedIn="updateLoggedIn"
        v-if="this.user.length > 0 && this.user === 'admin'"
      />
      <div class="col py-3">
        <router-view v-on:loggedIn="updateLoggedIn" />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
import SideMenuAdmin from "@/components/SideMenuAdmin.vue";
import axios from "axios";
import store from "@/store.js";

export default {
  name: "App",
  components: {
    SideMenu,
    SideMenuAdmin,
  },
  data() {
    return {
      testMsg: "",
      data: "",
      user: store.state.acc_type,
    };
  },
  mounted() {
    console.log(store.state.acc_type);
    if (store.state.acc_type == "") {
      this.$router.push("/Login");
    }

    // Axios to pull data from backend Flask API -> Have to run backend first, if successful, will see testMsg update
    axios
      .get("https://g6t5-flask.herokuapp.com/course/getAll")
      .then((res) => {
        console.log(res.data);
        this.testMsg = res.data;
      })
      .catch((e) => console.log(e));
  },
  methods: {
    updateLoggedIn(user) {
      store.commit("onLogin", user);
      this.user = user;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
