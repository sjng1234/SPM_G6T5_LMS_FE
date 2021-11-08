<template>
  <div class="container">
    <div class="jumbotron">
      <h2 class="text-center">Enrolled Users for {{course_id}}-{{class_id}}</h2>
      <div v-if="isDeleted == true" class="alert alert-success" role="alert">
        ✔ Successfully Deleted!
      </div>
      <div v-else-if="isDeleted == false" class="alert alert-danger" role="alert">
        ✖ Failed to delete - Please try again!
      </div>
      <div v-if="addSuccess == true" class="alert alert-success" role="alert">
        ✔ Successfully Added!
      </div>
      <div v-else-if="addSuccess == false" class="alert alert-danger" role="alert">
        ✖ Failed to add new learners - Please try again!
      </div>
    </div>
    <div class="table-responsive p-5">
      <h4 class="text-muted">Total Enrolled: {{enrolledLearners.length}}</h4>
      <button class="btn btn-outline-dark "
                type="button"
                @click="this.isAdding=true"
                data-bs-toggle="collapse"
                data-bs-target="#addUser"
                aria-expanded="false"
                aria-controls="collapseExample"
                v-if="!isAdding && !isTrainer">+ Add Learner</button>
      <button class="btn btn-danger mx-2 mb-3"
                type="button"
                @click="this.isAdding=false"
                data-bs-toggle="collapse"
                data-bs-target="#addUser"
                aria-expanded="false"
                aria-controls="collapseExample"
                v-if="isAdding && !isTrainer">Close</button>
      <button class="btn btn-success mx-2 mb-3"
                type="button"
                @click="addUsers()"
                v-if="isAdding && !isTrainer">Add</button>
      <button type="button" class="btn btn-outline-primary mx-2 mb-3" @click="this.selected_users=[]" v-if="this.selected_users.length">Clear</button>

      <div class="collapse" id="addUser" v-if="!isTrainer">
        <p>Selected: {{this.selected_users.length}}</p>
        
        <select class="form-select" v-model="selected_users" multiple>
          <option disabled>Press Ctrl/⌘CMD to multi-select</option>
          <option
            :value="user.learner_id"
            v-for="user in users"
            v-bind:key="user.learner_id"
          >
            {{user.name}}
          </option>
        </select>
      </div>
      <table class="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Learner Name</th>
            <th v-if="!isTrainer"></th>
          </tr>
          <tr v-for="(learner,index) in enrolledLearners" v-bind:key="learner.user_id">
            <td>{{index+1}}</td>
            <td>{{learner.name}}</td>
            <td v-if="!isTrainer"><a @click="deleteUser(learner.learner_id)">❌</a></td>
          </tr>
        </thead>
      </table>
            
    </div>
  </div>
</template>

<script>
import axios from "axios"
import store from "@/store.js"
export default {
    props: ['id'],
    data() {
        return {
            course_id: "",
            class_id: "",
            enrolledLearners: [],
            enrolledLearnersID: [],
            loading: true,
            isDeleted: null,
            isAdding: false,
            selected_users: [],
            users: [],
            addSuccess:null,
            isTrainer: store.state.acc_type == 'trainer'
        }
    },
    async mounted(){
        var [course_id, class_id] = this.id.split("-");
        this.course_id = course_id;
        this.class_id = class_id;

      // Get Enrolled Learners
      await axios.get(`https://g6t5-flask.herokuapp.com/classes/${this.id}/getAllEnrolledLearners`).then((response) => {
        this.enrolledLearners = response.data.enrolled_users
        this.enrolledLearners.forEach((learner)=>{
        this.enrolledLearnersID.push(learner.learner_id)
        })
      }).catch((error) => {
        console.log(error)
      })

      // Get all learners
      await axios.get(`https://g6t5-flask.herokuapp.com/admin/getAllLearners`).then((response) => {
        this.users = response.data
      }).catch((error) => {
        console.log(error)
      })
      // Filter unenrolled learners 
      this.users = this.users.filter((user)=>{
        return !this.enrolledLearnersID.includes(user.learner_id)
      })

    },
  methods: {
    deleteUser(learner_id){
      var success = confirm("Are you sure you want to delete this learner?")
      if(success){
      var id = `${this.id}-${learner_id}`
      axios.delete(`https://g6t5-flask.herokuapp.com/learner/drop/${id}`).then(() => {
        console.log("Successfully deleted")
        this.isDeleted = true
        setTimeout(() => {
          location.reload()
        }, 500)
        
      }).catch((error) => {
        console.log(error)
        this.isDeleted = false
      })}
  },
  async addUsers(){
    var success = confirm("Are you sure you want to enroll these learners?")
    if(success){
      await this.selected_users.forEach((learner_id)=>{
        var data = {
          learner_id:learner_id,
          course_id:this.course_id,
          class_id:this.class_id
          }
        axios.post(`https://g6t5-flask.herokuapp.com/learner/enrol`,data).then(()=>{
          console.log("Added!")
        }).catch((error) => {
          console.log(error)
          this.addSuccess = false
        })
    })
    this.addSuccess = true
    setTimeout(() => {
          location.reload()
        }, 500)
    }
  
    },
  }
}
</script>

<style>

</style>