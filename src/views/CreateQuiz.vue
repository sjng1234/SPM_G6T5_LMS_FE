<template>
    <div class="container m-0 p-0">
        <div v-if="uploaded == true" class="alert alert-success" role="alert">
        ✔ Successfully Uploaded!
        </div>
        <div v-else-if="uploaded == false" class="alert alert-danger" role="alert">
        ✖ Failed to upload - Please try again!
        </div>
        <h1>Create Graded Quiz</h1>
        <h4 class="text-primary">{{course_id}} - Class {{class_id}}</h4>
        <form class="container-fluid p-5" onsubmit="return false;" >
            <div class="input-group mb-5  mx-auto w-50">
                    <span class="input-group-text" id="basic-addon1">Duration (mins)</span>
                    <input type="number" class="form-control" v-model="duration" required/>
            </div>
            <button type="button"  v-on:click="addQn()" class="btn btn-success mx-2">+ Add Question</button>
            <button type="button"  v-on:click="deleteQn()" class="btn btn-danger mx-2">- Delete Question</button>
            
            <div class="questions container" v-for="(qn, index) in question" v-bind:key="qn">
                <div class="input-group mb-3 mt-2">
                    <span class="input-group-text" id="basic-addon1">Question {{qn.question_id}}</span>
                    <input type="text" class="form-control" v-model="question[index].question_description" required/>
                    <button type="button" class="btn btn-primary" v-on:click="addOption(index)">+ Option</button>
                    <button type="button" class="btn btn-danger" v-on:click="deleteOption(index)">- Option</button>
                </div>
                <div class="input-group mb-3 w-50 option" v-for="(option, o_index) in qn.options" v-bind:key="option">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="radio" v-model="qn.options[o_index].is_correct_answer" :name="'question'+index" :value="true" aria-label="Radio button for following text input"/>
                    </div>
                    <input type="text" class="form-control" v-model="qn.options[o_index].option" required aria-label="Text input with radio button">
                </div>
                <hr class="bg-dark"/>
            </div>

            <div class="d-flex justify-content-center">
                <button type="submit" onsubmit="return false;" v-on:click="createQuiz()" class="btn btn-primary btn-lg mx-2">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props: ["id"],
    data(){
        return{
            course_id: "",
            class_id: "",
            question:[
                {
                    question_description:"",
                    question_id: 1,
                    options:[
                        {
                            option:"",
                            is_correct_answer:false
                        }
                    ],
                }
            ],
            duration:0,
            uploaded: null
        }
    },
    mounted(){
        var [course_id,class_id] = this.id.split('-')
        this.course_id = course_id
        this.class_id = class_id
    },
    
    methods:{
        createQuiz(){
            var data ={
                course_id: this.course_id,
                class_id: this.class_id,
                questions: this.question,
                quiz_id:1,
                duration:this.duration
            }

            axios.post('http://127.0.0.1:5000/quiz/addQuiz', data).then((response)=>{
                console.log(response)
                this.uploaded = true
                setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
            }).catch((error)=>{
                console.log(error)
                this.uploaded = false
                })
            ;
        },
        addQn(){
            console.log(this.question)
            var new_qn ={
                    question_description:"",
                    question_id: this.question.length + 1,
                    options:[
                        {
                            option:"",
                            is_correct_answer:false
                        }
                    ],
                }
                this.question.push(new_qn)
        },
        deleteQn(){
            this.question.pop()
            
        },
        addOption(index){
            this.question[index].options.push({
                            option:"",
                            is_correct_answer:false
                        })
        },
        deleteOption(index){
            this.question[index].options.pop()
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