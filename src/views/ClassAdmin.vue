<template>
    <div class="container d-flex flex-column">
        <h1 class="text-start mb-2 mt-2">Course: {{course_id}}</h1>
        <div v-if="isDeleted == true" class="alert alert-success" role="alert">
        ✔ Successfully Deleted!
        </div>
        <div v-else-if="isDeleted == false" class="alert alert-danger" role="alert">
        ✖ Failed to delete - Please try again!
        </div>
        <h3 class="text-danger" v-if="class_data == 'error'">⚠ Error! Course not found.</h3>
        <div v-if="class_data != 'error' " class="d-flex flex-row justify-content-end button">
                <button class="btn btn-outline-dark" @click="createClass()">+ New Class</button>
        </div>
        <div class="container row">
            <table class="table" v-if="class_data != 'error'">
                <thead>
                    <tr>
                        <th scope="col">Class ID</th>
                        <th scope="col">Trainer Name</th>
                        <th scope="col">Trainer ID</th>
                        <!-- <th scope="col">Pre-requisites</th> -->
                        <th scope="col">Class Size</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th colspan="3"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!class_data.length">
                        <th colspan="6">No classes added yet!</th>
                    </tr>
                    <tr v-for="eachClass in class_data" v-bind:key="eachClass.class_id">
                        <th scope="row">{{eachClass.class_id}}</th>
                        <td>{{eachClass.class_creator_id}}</td>
                        <td>{{eachClass.trainer_id}}</td>
                        <td>{{eachClass.class_size}}</td>
                        <td>{{eachClass.start_datetime}}</td>
                        <td>{{eachClass.end_datetime}}</td>
                        <td>
                            <button v-if="!eachClass.quiz_created" class="btn btn-sm btn-dark" @click="addQuiz(eachClass.course_id,eachClass.class_id)">+Quiz</button>
                            <button v-else class="btn btn-sm btn-outline-primary" @click="viewQuiz(eachClass.course_id,eachClass.class_id)">Quiz</button>
                        </td> 
                        <td><button class="btn btn-sm btn-secondary">Enrolment</button></td>
                        <td><button class="btn btn-sm btn-outline-danger" @click="deleteClass(eachClass.class_id)">Delete</button></td> 
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Class",
    props: ["course_id","course_name"],
    setup() {
        return {};
    },
    data() {
        return {
            class_data: [],
            isDeleted: null
            
        }
    },
    mounted(){
        // console.log("course_id: " + this.course_id)
        if(!this.class_data.length){        
            let url = `http://127.0.0.1:5000/course/getCourse/` + this.course_id + `/getAllClasses`;
            axios.get(url).then(response => {
                console.log(response)
                this.class_data = response.data
            }).catch((error) => {
                    console.log(error)
                    this.class_data = "error"
        })}
    },
    methods: {
        createClass(){
            this.$router.push({name: 'CreateClass', params: {course_id: this.course_id, course_name: this.course_name}})
        },
        
        deleteClass(class_id){
            
            var id = this.course_id + "-" + class_id
            var sure = confirm(`Are you sure you want to delete this class (${id})?`)
            if(sure){
            axios.delete(`http://127.0.0.1:5000/classes/delete/${id}`)
            .then((response) => {
                console.log(response)
                location.reload();
                this.isDeleted = true
            })
            .catch((error) => {
                console.log(error)
                this.isDeleted = false})}
        },
        addQuiz(course_id,class_id){
            this.$router.push({name: 'CreateQuiz', params: {course_id: course_id,course_name: this.course_name, class_id: class_id}})
        }
    }
    }

</script>

<style scoped></style>
