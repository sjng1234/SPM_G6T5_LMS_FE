<template>
  <div class="container" style="margin-top: 200px">
    <div class="row justify-content-center align-items-center">
      <div class="col-4">
        <div class="card">
          <div class="card-body d-grid gap-3 col-6 mx-auto">
            <h3>LOGIN</h3>
            <button
              class="btn btn-secondary"
              @click="loginAdmin()"
              type="button"
            >
              Admin
            </button>
            <button
              class="btn btn-primary"
              @click="loginLearner()"
              type="button"
            >
              Learner
            </button>
            <button
              class="btn btn-warning"
              @click="loginTrainer()"
              type="button"
            >
              Trainer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    loginAdmin() {
      this.$router.push("/CourseAdmin");
      this.$emit("loggedIn", "admin");
    },
    loginLearner() {
      this.$router.push("/");
      this.$emit("loggedIn", "learner");
    },
    loginTrainer() {
      this.$router.push({ name: 'ClassTrainer', params: { id: 3 }});
      this.$emit("loggedIn", "trainer");
    },
  },
};
</script>
<style></style>
