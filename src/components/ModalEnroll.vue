<template>
    <!-- Modal -->
    <div class="modal-content">
        <div class="modal-header">
        <button
            type="button"
            class="btn-close"
            @click="emitFn"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
        </div>

        <div class="modal-body">
            <div class="container-fluid" style="margin-top: 50px margin-left: 50px">
                <div v-if="enrollmentDone">
                    <div class="row">
                        <h1 class="text-start mb-5">Enrollment Confirmed</h1>
                    </div>
                </div>

                <div v-else>
                    <div class="row">
                        <h1 class="text-start mb-5">Confirm Enrollment</h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-2">
                    Course ID 
                    </div>
                    <div class="col-2">
                    Class ID
                    </div>
                    
                    <div class="col-2">
                    Trainer Name
                    </div>
                    <div class="col-2">
                    Trainer ID
                    </div>
                    <!-- <div class="col-2">
                    Pre-requisites
                    </div> -->
                </div>
                <hr>

                <div class="row">
                    <div class="col-2">
                    {{class_data.course_id}}
                    </div>
                    <div class="col-2">
                    {{class_data.class_id}}
                    </div>
                    <div class="col-2">
                    {{class_data.class_creator_id}}
                    </div>
                    <div class="col-2">
                    {{class_data.trainer_id}}
                    </div>
                    <!-- <div class="col-2">
                    Pre-requisites
                    </div> -->
                </div>

                <br><br><br>

                <div class="row">
                    <div class="col-2">
                    Start Time
                    </div>
                    <div class="col-2">
                    End Time
                    </div>
                    <div class="col-2">
                    Class Size
                    </div>
                    <div class="col-2">
                    </div>
                </div>
                <hr>

                <div class="row">
                    <div class="col-2">
                    {{class_data.start_datetime}}
                    </div>
                    <div class="col-2">
                    {{class_data.end_datetime}}
                    </div>
                    <div class="col-2">
                    {{class_data.class_size}}
                    </div>
                    <div class="col-2">
                    </div>
                </div>
                <br><br><br>

                <div class="row">
                    <div class="text-start">
                    Course Description
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="text-start">
                    {{class_data.course_description}}
                    </div>
                </div>

                <br><br><br>
                <div class="row">
                    <div class="col-11">
                    </div>
                    <div class="col-1">
                        <!--NOTE: enrollmentDone still buggy, it must remain confirmed for those enrolled and still be available to enroll for those not yet confirmed !-->
                        <div v-if="!enrollmentDone">
                            <button type="button" class="btn btn-primary" @click="confirmEnroll()">Confirm</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-outline-primary" @click="emitFn" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>

</template>

<script>
// import axios from 'axios';

export default {
    name:"ItemModal",
    props: ["course_id", "curr_class_id", "class_data"],
    
    data(){
        return{
            enrollmentDone: false,
            
        }},

    methods: {
        emitFn() {
        console.log(222);
        this.$emit("toggle", "closed");
        },
        confirmEnroll() {
            this.enrollmentDone = true;
            // alert("You have successfully enrolled in this course!");
        }
    },
    mounted(){

        // console.log(class_id);
    
    }
}
</script>
