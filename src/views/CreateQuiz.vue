<template>
    <div v-if="uploaded == true" class="alert alert-success" role="alert">
    ✔ Successfully Uploaded!
    </div>
    <div v-else-if="uploaded == false" class="alert alert-danger" role="alert">
    ✖ Failed to upload - Please try again!
    </div>
    <h1>Create Graded Quiz</h1>
    <h4 class="text-primary">{{course_id}}: {{course_name}} (Class {{class_id}})</h4>
    <form class="container-fluid p-5" onsubmit="return false;" >
        <div class="questions container" v-for="qn in no_of_qn" v-bind:key="qn">
            <div class="input-group mb-3 mt-2">
                <span class="input-group-text" id="basic-addon1">Question {{qn}}</span>
                <input type="text" class="form-control" v-model="question" required/>
                <button type="button" class="btn btn-primary">+ Add Option</button>
            </div>
            <div class="input-group mb-3 w-50 option">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="radio" aria-label="Radio button for following text input"/>
                </div>
                <input type="text" class="form-control" aria-label="Text input with radio button">
            </div>
            <hr class="bg-dark"/>
        </div>

        <div class="d-flex justify-content-center">
            <button type="button"  v-on:click="addQn()" class="btn btn-warning mx-2">+ Add Question</button>
            <button type="submit" onsubmit="return false;" v-on:click="createQuiz()" class="btn btn-primary mx-2">Create</button>
        </div>
    </form>

</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            no_of_qn:3,
            uploaded: null
        }
    },
    computed:{
        no_of_options(){
            var qn = {}
            for (let i = 1; i <= this.no_of_qn; i++) {
                qn[i] = 1;
                }
            return qn
        },
        

    },
    props: ["course_id","course_name","class_id"],
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
.option{
    margin-left:5rem
}

.questions{
    margin-top:2rem
}
</style>