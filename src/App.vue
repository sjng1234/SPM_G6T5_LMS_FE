<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideMenu />
      <div class="col py-3">
        <router-view />
        {{ testMsg }}
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    SideMenu,
  },
  data() {
    return {
      testMsg: "",
    };
  },
  mounted() {
    // Axios to pull data from backend Flask API -> Have to run backend first, if successful, will see testMsg update
    axios
      .get("http://127.0.0.1:5000/")
      .then((res) => {
        console.log(res.data);
        this.testMsg = res.data;
      })
      .catch((e) => console.log(e));
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
