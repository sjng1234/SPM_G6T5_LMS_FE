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
                    <h1 class="text-start mb-5">{{ myData.courseName }}</h1>
                </div>


                <div class="row">
                    <div class="col-1">
                        Chapter
                    </div>
                    <div class="col-3">
                        Title
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                    </div>
                </div>
                <hr>

                <div class="row">
                    <div class="col-1">
                        Number HERE
                    </div>
                    <div class="col-3">
                        Doc Name HERE
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                        <button type="button" class="btn btn-primary" @click="onDownload()">Download</button>
                    </div>
                </div>

                
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
export default {
    name:"MaterialsModal",
    props: ["myData"],
    
    // data(){
    //     return{

    //     }},

    methods: {
        emitFn() {
        console.log(222);
        this.$emit("toggle", "closed");
        },
        onDownload() {
            axios({
                url: 'https://auxion.s3.ap-southeast-1.amazonaws.com/events/john-schnobrich-2FPjlAyMQTA-unsplash.jpg',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'image.jpg');
                document.body.appendChild(fileLink);

                fileLink.click();
            });
        },
    },
}
</script>
