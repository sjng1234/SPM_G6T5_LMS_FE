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
                <div class="row">
                    <h1 class="text-start mb-5">Confirm Enrollment</h1>
                </div>

                <div class="row">
                    <div class="col-2">
                    Course ID
                    </div>
                    <div class="col-2">
                    Class ID
                    </div>
                    <div class="col-2">
                    Course Name
                    </div>
                    <div class="col-2">
                    Trainer Name
                    </div>
                    <div class="col-2">
                    Trainer ID
                    </div>
                    <div class="col-2">
                    Pre-requisites
                    </div>
                </div>
                <hr>

                <div class="row">
                    <div class="col-2">
                    0001
                    </div>
                    <div class="col-2">
                    00011
                    </div>
                    <div class="col-2">
                    Fundamentals of XXX
                    </div>
                    <div class="col-2">
                    Jane Smith
                    </div>
                    <div class="col-2">
                    X0C79
                    </div>
                    <div class="col-2">
                    Fox
                    </div>
                </div>

                <br><br><br>

                <div class="row">
                    <div class="col-2">
                    Class Start
                    </div>
                    <div class="col-2">
                    Class End
                    </div>
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
                    30/09/2021
                    </div>
                    <div class="col-2">
                    10/10/2021
                    </div>
                    <div class="col-2">
                    08:15
                    </div>
                    <div class="col-2">
                    11:30
                    </div>
                    <div class="col-2">
                    45
                    </div>
                    <div class="col-2">
                    </div>
                </div>

                <br><br><br>
                <div class="row">
                    <div class="col-10">
                    </div>
                    <div class="col-1">
                        <button type="button" class="btn btn-outline-info">Cancel</button>
                    </div>
                    <div class="col-1">
                        <button type="button" class="btn btn-primary">Confirm</button>
                    </div>
                </div>
            
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name:"ItemModal",
    props: ["curData"],
    
    // data(){
    //     return{

    //     }},

    methods: {
        emitFn() {
        console.log(222);
        this.$emit("toggle", "closed");
        },
    },
}
</script>
