<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div
      class="
        d-flex
        flex-column
        align-items-center align-items-sm-start
        px-3
        pt-2
        text-white
        min-vh-100
      "
    >
      <!-- MENU HEADING -->
      <router-link
        to="/"
        class="
          d-flex
          align-items-center
          pb-3
          mb-md-0
          me-md-auto
          text-white text-decoration-none
        "
      >
        <span class="fs-5 d-none d-sm-inline">SPM LMS</span>
      </router-link>

      <ul
        class="
          nav nav-pills
          flex-column
          mb-sm-auto mb-0
          align-items-center align-items-sm-start
        "
        id="menu"
      >
        <!-- Find Course -->
        <li class="nav-item" v-if="user == 'learner'">
          <router-link
            to="/"
            class="
              nav-link
              align-middle
              px-0
              d-flex
              flex-row
              align-items-center
            "
          >
            <i class="fs-4 bi-house"></i>
            <span class="ms-1 d-none d-sm-inline">Find Courses</span>
          </router-link>
        </li>

        <!-- My Classes -->
        <li v-if="user == 'learner'">
          <router-link
            to="/MyClass"
            class="
              nav-link
              px-0
              align-middle
              d-flex
              flex-row
              align-items-center
            "
          >
            <i class="fs-4 bi-table"></i>
            <span class="ms-1 d-none d-sm-inline">My Classes</span>
          </router-link>
        </li>
        <li v-if="user == 'trainer'">
          <router-link
            :to="{ name: 'ClassTrainer', params: { id: id } }"
            class="
              nav-link
              px-0
              align-middle
              d-flex
              flex-row
              align-items-center
            "
          >
            <i class="fs-4 bi-table"></i>
            <span class="ms-1 d-none d-sm-inline">My Classes</span>
          </router-link>
        </li>

        <!--Inbox -->
        <li>
          <router-link
            to="/Inbox"
            class="
              nav-link
              px-0
              align-middle
              d-flex
              flex-row
              align-items-center
            "
          >
            <i class="fs-4 bi-inbox-fill"></i>
            <span class="ms-1 d-none d-sm-inline">Inbox</span>
          </router-link>
        </li>

        <!-- Sub-Menu Implementation Example -->
        <!-- <li>
                <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li class="w-100">
                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
                    </li>
                </ul>
            </li> -->
      </ul>
      <hr />
      <!-- Avatar -->
      <div class="dropdown pb-4">
        <a
          href="#"
          class="
            d-flex
            align-items-center
            text-white text-decoration-none
            dropdown-toggle
          "
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="hugenerd"
            width="30"
            height="30"
            class="rounded-circle"
          />
          <span class="d-none d-sm-inline mx-1">{{
            this.$store.state.acc_type
          }}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
          <!-- Hardcoded Router Link to Learner's Profile with the created user's ID , will use VueX to store user's id in subsequent implementations -->
          <li>
            <router-link
              :to="{
                name: 'Profile',
                params: {
                  id:
                    this.$store.state.acc_type == 'learner'
                      ? 2
                      : this.$store.state.acc_type == 'trainer'
                      ? 3
                      : 1,
                },
              }"
              class="dropdown-item"
              >Profile</router-link
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <div class="text-center">
            <button
              name="login-submit"
              id="login-submit"
              class="btn btn-danger"
              style="font-family: 'MuseoSans500'"
              v-on:click="logOut"
            >
              Logout
            </button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "SideMenu",
  setup() {
    return {};
  },
  data() {
    return {
      user: store.state.acc_type,
      id: store.state.user_id,
    };
  },

  methods: {
    logOut() {
      this.$router.push("/Login");
      this.$emit("loggedIn", "");
      store.commit("onLogin", "", 0);
    },
  },
};
</script>

<style scoped></style>
