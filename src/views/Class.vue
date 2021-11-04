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
                    <tr v-for="eachClass in class_data" v-bind:key="eachClass.class_id">
                        <th scope="row">{{eachClass.class_id}}</th>
                        <td>{{eachClass.class_creator_id}}</td>
                        <td>{{eachClass.trainer_id}}</td>
                        <td>{{eachClass.class_size}}</td>
                        <td>{{eachClass.start_datetime}}</td>
                        <td>{{eachClass.end_datetime}}</td>
                        <td><button class="btn btn-primary" v-on:click="modalOpen" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Enroll</button></td> 
                        <!-- Modal for Enroll here not implemented yet -->

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
                    v-on:toggle="modalClose" v-bind:course_id="this.course_id" 
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
            class_data: [],
            
        }
    },
    mounted(){
        // console.log(this.course_id)
        let url = `http://127.0.0.1:5000/course/getCourse/` + this.course_id + `/getAllClasses`;
        axios.get(url).then(response => {
            console.log(response)
            this.class_data = response.data
        }).catch((error) => {
                console.log(error)
                this.class_data = "error"
        })
    },
    methods: {
        modalOpen(data){
            console.log(data);
            console.log("OPEN MODAL");

            this.modalState = !this.modalState;
        },
        modalClose(msg) {
            console.log(msg);
            console.log(this.modalState);
            this.modalState = !this.modalState;

        },
    },
    };
</script>

<style scoped></style>
