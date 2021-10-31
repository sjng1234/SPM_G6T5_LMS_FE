<template>
    <div class="container m-auto p-auto">
    <div class="card">
        <h1>Login</h1>
        <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-primary" @click="loginAdmin()" type="button">Admin</button>
            <button class="btn btn-primary" @click="loginLearner()" type="button">Learner</button>
            <button class="btn btn-primary" @click="loginTrainer()" type="button">Trainer</button>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  methods:{
      loginAdmin(){
          this.$router.push("/");
          this.$emit('loggedIn','admin')
      },
      loginLearner(){
          this.$router.push("/");
          this.$emit('loggedIn','learner')
      },
      loginTrainer(){
          this.$router.push("/");
          this.$emit('loggedIn','trainer')
      },
  }
};
</script>
<style>
</style>