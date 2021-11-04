<template>
    <div v-if="uploaded == true" class="alert alert-success" role="alert">
    ✔ Successfully Uploaded!
    </div>
    <div v-else-if="uploaded == false" class="alert alert-danger" role="alert">
    ✖ Failed to upload - Please try again!
    </div>
    <h1>Create Quiz</h1>
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
            <span class="input-group-text" id="basic-addon1">Quiz Name</span>
            <textarea type="text" class="form-control" placeholder="Quiz 1: Intro to Cybersecurity" v-model="quiz_name" required/>
        </div>
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Question 1</span>
            <input type="radio" name="qn_1" id="answer_a" class="form-control" v-model="qn_1" required/>
            <input type="radio" name="qn_1" id="answer_b" class="form-control" v-model="qn_1" required/>
            <input type="radio" name="qn_1" id="answer_c" class="form-control" v-model="qn_1" required/>
            <input type="radio" name="qn_1" id="answer_d" class="form-control" v-model="qn_1" required/>
        </div>
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Question 1 Answer</span>
            <input type="radio" name="qn_1_ans" id="answer_b" class="form-control" v-model="qn_1_ans" required/>
        </div>
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Question 2</span>
            <input type="radio" name="qn_2" id="true" class="form-control" v-model="qn_2" required/>
            <input type="radio" name="qn_2" id="false" class="form-control" v-model="qn_2" required/>
        </div>
        <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="basic-addon1">Question 2 Answer</span>
            <input type="radio" name="qn_2_ans" id="false" class="form-control" v-model="qn_2_ans" required/>
        </div>
        <button type="submit" onsubmit="return false;" v-on:click="createQuiz()" class="btn btn-primary">Create</button>
    </form>

</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            course_id: "",
            course_name: "",
            quiz_name: "",
            date_created: "",
            course_creator_id: "HR111",
            qn_1: "",
            qn_1_ans: "",
            qn_2: "",
            qn_2_ans: "",
            uploaded: null
        }
    },
    methods:{
        createCourse(){
            this.date_created = new Date()

            var course_data = {
                course_id: this.course_id,
                course_name: this.course_name,
                quiz_name: this.quiz_name,
                date_created: this.date_created,
                course_creator_id: this.course_creator_id,
                qn_1: this.qn_1,
                qn_1_ans: this.qn_1_ans,
                qn_2: this.qn_2,
                qn_2_ans: this.qn_2_ans,
            }

            axios.post('http://127.0.0.1:5000/course/add', course_data).then((response)=>{
                console.log(response)
                this.uploaded = true
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