<template>
  <div class="container d-flex flex-column">
      <h1 class="text-start mb-2 mt-2">Courses</h1>
      <h3 class="text-danger" v-if="course_data == 'error'">⚠ Error! Please refresh page.</h3>
      <div v-if="course_data != 'error' " class="d-flex flex-row justify-content-end button">
        <router-link to="/CreateCourse">
          <button class="btn btn-outline-dark">+ New Course</button>
        </router-link>
      </div>
        <div class="container row">
          <table class="table" v-if="course_data != 'error'">
            <thead>
                <tr>
                <th scope="col">Course ID</th>
                <th scope="col">Course Name</th>
                <th scope="col">Date Created</th>
                <th scope="col"></th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="!course_data.length">
                    <th colspan="3">No courses added yet!</th>
                </tr>
                <tr v-for="course in course_data" v-bind:key="course.course_id">
                <th scope="row">{{course.course_id}}</th>
                <td>{{course.course_name}}</td>
                <td>{{course.date_created}}</td>
                <td><button class="btn btn-primary" @click="viewClass(course.course_id)">View</button></td>
                </tr>
                
            </tbody>
            </table>
            
          
        
      
        </div>
    </div>
</template>

<script>
import axios from "axios"


export default {
  name: "Home",
  components: {

  },
  setup() {
    return {};
  },
  data() {
    return {
        course_data: [],
    } 
  },
  mounted(){
      axios.get("http://127.0.0.1:5000/course/getAll").then(response => {
          console.log(response)
          this.course_data = response.data
      }).catch((error) => {
            console.log(error)
            this.course_data = "error"
      })
      
  },
  methods: {
      viewClass(id){
          console.log(id)
          this.$router.push({ name: '', params: { course_id: id } });
      }
  },
  
};
</script>

<style scoped>
.button{
  padding-right:2rem;
  margin-bottom:1rem
}
</style>
