<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideMenu/>
      <div class="col py-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import SideMenu from "@/components/SideMenu.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    SideMenu
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
