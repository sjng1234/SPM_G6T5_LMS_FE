<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div
      class="
        d-flex
        flex-column
        align-items-center align-items-sm-start
        px-3
        pt-2
        text-red
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
        <span class="fs-5 d-none d-sm-inline">SPM LMS Admin</span>
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
        <li class="nav-item">
          <router-link
            to="/CourseAdmin"
            class="
              nav-link
              align-middle
              px-0
              d-flex
              flex-row
              align-items-center
              text-danger
            "
          >
            <i class="fs-4 bi-house"></i>
            <span class="ms-1 d-none d-sm-inline">Courses</span>
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
              text-danger
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
          <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li> -->
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

  methods: {
    logOut() {
      this.$router.push("/Login");
      this.$emit("loggedIn", "");
      store.commit("onLogin", "");
    },
  },
};
</script>

<style scoped></style>
