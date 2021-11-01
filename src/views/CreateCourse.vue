<template>
    <div v-if="uploaded == true" class="alert alert-success" role="alert">
    ✔ Successfully Uploaded!
    </div>
    <div v-else-if="uploaded == false" class="alert alert-danger" role="alert">
    ✖ Failed to upload - Please try again!
    </div>
    <h1>Create Course</h1>
    <form class="container-fluid p-5" onsubmit="return false;">
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Course ID</span>
            <input type="text" class="form-control" maxlength="6" style="text-transform:uppercase" placeholder="CS101" v-model="course_id" required>
        </div>
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Course Name</span>
            <input type="text" class="form-control" placeholder="Cybersecurity 101" v-model="course_name" required>
        </div>
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Course Description</span>
            <textarea type="text" class="form-control" placeholder="Cybersecurity 101 is an introductory course to cybersecurity where you get to learn..." v-model="course_description" required/>
        </div>
        <button type="submit" onsubmit="return false;" v-on:click="createCourse()" class="btn btn-primary">Submit</button>
    </form>

</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            course_id: "",
            course_name: "",
            course_description: "",
            date_created: "",
            course_creator_id: "HR111",
            uploaded: null
        }
    },
    methods:{
        createCourse(){
            this.date_created = new Date()

            var course_data = {
                course_id: this.course_id,
                course_name: this.course_name,
                course_description: this.course_description,
                date_created: this.date_created,
                course_creator_id: this.course_creator_id,
            }

            axios.post('http://127.0.0.1:5000/course/add', course_data).then((response)=>{
                console.log(response)
                this.uploaded = true
                setTimeout(()=>{
                    this.$router.push("/CourseAdmin");
                },1500)
            }).catch((error)=>{
                console.log(error)
                this.uploaded = false
                })
            ;
        }

    }
}

</script>

<style>

</style>