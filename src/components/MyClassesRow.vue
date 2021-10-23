<template>

            <div class="row border border-1 rounded">
                <div class="col-1">
                {{ courseID }}
                </div>
                <div class="col-1">
                {{ classID }}
                </div>
                <div class="col-2">
                {{ courseName }}
                </div>
                <div class="col-2">
                {{ trainerName }}
                </div>
                <div class="col-2">
                {{ preReq }}
                </div>
                <div class="col-2">
                {{ startDate }}
                </div>
                <div class="col-1">
                    <button
                    name="enroll"
                    id="enroll"
                    class="btn btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop"
                    @click="emitFn"
                    isOver="true"
                    >
                    Materials
                    </button>
                </div>
                
            </div>
            <br>

</template>

<script>
export default {
    name: "MyCourses",
    props: [
        "courseID",
        "classID",
        "courseName",
        "trainerName",
        "trainerID",
        "preReq",
        "startDate",
        "endDate",
        "startTime",
        "endTime",
        "classSize",
        "chapterDoc"
    ],
    methods: {
        emitFn() {
        console.log(2);
        var propData = {
            courseID: this.courseID,
            classID: this.classID,
            courseName: this.courseName,
            trainerName: this.trainerName,
            trainerID: this.trainerID,
            preReq: this.preReq,
            startDate: this.startDate,
            endDate: this.endDate,
            startTime: this.startTime,
            endTime: this.endTime,
            classSize: this.classSize,
            chapterDoc: this.chapterDoc,
        };
        this.$emit("toggle", propData);
        },
    }
}
</script>
