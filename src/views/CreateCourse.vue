<template>
    <div>
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
            <div class="mb-5 pt-2">
                <div class="d-flex">
                    <h5 class="text-start fw-light mt-4">Pre-Requisites <a class="fs-6 fw-light" @click="removeOptions()">Clear</a></h5>
                </div>
                <select class="form-select" v-model="selected_prereq" multiple>
                    <option disabled>Press Ctrl/⌘CMD to multi-select</option>
                    <option :value="course.course_id"  v-for="course in all_courses" v-bind:key="course.course_id">{{course.course_name}} ({{course.course_id}})</option>
                   
                </select>
                <p class="bg-primary text-start w-25 mt-3 text-white p-2 fw-bold rounded" v-if="selected_prereq.length">Selected: {{selected_prereq.join(", ")}}</p>
                
            </div>
            <button type="submit" onsubmit="return false;" v-on:click="createCourse()" class="btn btn-primary">Submit</button>
        </form>
    </div>

</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            class_creator_id:2,
            start_datetime: "",
            end_datetime: "",
            class_size: "",
            course_name: "",
            trainer_id: "",
            uploaded: null,
            all_courses:{},
            selected_prereq: [],
        }
    },
    mounted(){
        axios.get("http://127.0.0.1:5000/course/getAll").then((response)=>{
            this.all_courses = response.data
            console.log(this.all_courses)
        }).catch((error) => {
            console.log(error)
        })
    },
    methods:{
        createCourse(){
            if(this.course_id && this.course_name && this.course_description){
                var course_data = {
                    course_id: this.course_id.toUpperCase(),
                    course_name: this.course_name,
                    course_description: this.course_description,
                    course_creator_id: this.course_creator_id,
                }

                axios.post('http://127.0.0.1:5000/course/add', course_data).then(async (response)=>{
                    console.log(response)
                    if(this.selected_prereq.length){
                        await this.selected_prereq.forEach((prereq)=>{
                            console.log(prereq)
                            var prereq_data = {
                                course_id: this.course_id.toUpperCase(),
                                prereq_course_id: prereq
                            }
                            axios.put('http://127.0.0.1:5000/course/addPreReq', prereq_data).then(()=>{console.log('success')}).catch((error) => {console.log(error)})
                        })}
                    this.uploaded = true
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
                }).catch((error)=>{
                    console.log(error)
                    this.uploaded = false
                    })
                ;}
        },
        removeOptions(){
            this.selected_prereq = null
        }

    }
}

</script>

<style>
a:hover{
    cursor: pointer;

}
</style>