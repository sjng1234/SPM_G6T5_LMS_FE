<template>
    <div class="container d-flex flex-column">
        <h1 class="text-start mb-2 mt-2">Course: {{course_id}}</h1>
        
        <div class="container row">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Class ID</th>
                        <th scope="col">Trainer Name</th>
                        <th scope="col">Trainer ID</th>
                        <!-- <th scope="col">Pre-requisites</th> -->
                        <th scope="col">Class Size</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="eachClass in course_data" v-bind:key="eachClass.class_id">
                        <th scope="row">{{eachClass.class_id}}</th>
                        <td>{{eachClass.class_creator_id}}</td>
                        <td>{{eachClass.trainer_id}}</td>
                        <td>{{eachClass.class_size}}</td>
                        <td>{{eachClass.start_datetime}}</td>
                        <td>{{eachClass.end_datetime}}</td>
                        <td><button class="btn btn-primary" v-on:click="modalOpen(eachClass.class_id)"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Enroll</button></td> 
                    </tr>
                </tbody>
                
            </table>
            <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                >
                    <div class="modal-dialog modal-xl">
                        <ItemModal 
                        v-on:toggle="modalClose" v-bind:course_id="this.course_id" v-bind:class_data="class_data"
                        />
                    </div>
                </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ItemModal from "../components/ModalEnroll.vue";

export default {
    name: "Class",
    modalState: false,
    props: ["course_id"],
    components: {
        ItemModal
    },
    setup() {
        return {};
    },
    data() {
        return {
            course_data: [],
            class_data: [],
            curr_class_id: "",
            
        }
    },
    mounted(){
        // console.log(this.course_id)
        let url = `http://127.0.0.1:5000/course/getCourse/` + this.course_id + `/getAllClasses`;
        axios.get(url).then(response => {
            console.log(response)
            this.course_data = response.data
            // loop thru class data and check if curr learner is enrolled in that class
            // if not enrolled, add field isEnrolled T/F
        }).catch((error) => {
                console.log(error)
                this.course_data = "error"
        })
        // alternative: axios to get learner's enrolled classes and update the data property ()
        // check array exists for the button render
    },
    methods: {
        modalOpen(data){
            console.log(data);
            this.curr_class_id = data;
            console.log(this.curr_class_id)
            console.log("OPEN MODAL");
        
            let url = `http://127.0.0.1:5000/classes/get/` + this.course_id + `-` + this.curr_class_id;
            console.log(url);
            axios.get(url).then(response => {
                console.log(response)
                this.class_data = response.data
                console.log(response.data);
            }).catch((error) => {
                    console.log(error)
                    this.class_data = "error"
            })
            this.modalState = !this.modalState;
        },
        modalClose(msg) {
            console.log(msg);
            console.log(this.modalState);
            this.curr_class_id = "";
            this.modalState = !this.modalState;

        },
    },
    };
</script>

<style scoped></style>
