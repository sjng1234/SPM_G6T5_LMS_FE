<template>
    <div class="container d-flex flex-column">
        <h1 class="text-start mb-2 mt-2">{{course_id}} Materials</h1>
    </div>

    <div class="container row">
        <table class="table">
            <thead>
                <tr>
                        <th scope="col">Chapter</th>
                        <th scope="col">Title</th>
                        <th scope="col">Materials</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="chapter in materials_data" v-bind:key="chapter.chapter_id">
                <th scope="row">{{chapter.chapter_id}}</th>
                <td>{{chapter.chapter_name}}</td>
                <td>
                    <button @click="toggleAccordion()" class="btn btn-outline-info" :aria-expanded="isOpen" :aria-controls="chapter.materials.material_id">
                        Expand Materials
                    </button>

                    <div v-if="isOpen" v-bind:id="chapter.materials.material_id">
                        <div v-for="material in chapter.materials" v-bind:key="material.material_id" class="col">
                            <br>
                            <div class="row">
                            <div class="col-6">{{material.material_name}}</div>
                            <div class="col-6"><button type="button" class="btn btn-outline-secondary" @click="onDownload()">Download</button></div> 
                            </div>
                        
                        </div>
                        
                    </div>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Materials",
    props: ['course_id'],
    setup() {
        return {};
    },
    data() {
        return {
            isOpen: false,
            materials_data: [
                {
                    'chapter_id': 1, 
                    'chapter_name': "Setting up VSC",
                    'class_id': 1, 
                    'course_id': 'TEST12311', 
                    'materials': [
                        {'material_name': "VSC.exe",
                        'material_reference' : 'https://auxion.s3.ap-southeast-1.amazonaws.com/events/john-schnobrich-2FPjlAyMQTA-unsplash.jpg',
                        'material_id': 1},
                        {'material_name': "Extensions Guide",
                        'material_reference' : 'https://auxion.s3.ap-southeast-1.amazonaws.com/events/john-schnobrich-2FPjlAyMQTA-unsplash.jpg',
                        'material_id': 2},
                    ]
                },
                {
                    'chapter_id': 2, 
                    'chapter_name': "Downloading VSC Extensions",
                    'class_id': 1, 
                    'course_id': 'TEST12311', 
                    'materials': [
                        {'material_name': "file3",
                        'material_reference' : 'https://auxion.s3.ap-southeast-1.amazonaws.com/events/john-schnobrich-2FPjlAyMQTA-unsplash.jpg',
                        'material_id': 1},
                        {'material_name': "file4",
                        'material_reference' : 'https://auxion.s3.ap-southeast-1.amazonaws.com/events/john-schnobrich-2FPjlAyMQTA-unsplash.jpg',
                        'material_id': 2},
                    ]
                }
            ],
        }
    },
    mounted(){
        // let url = `http://127.0.0.1:5000/chapter/` + this.course_id + `/`
    },
    methods: {
        onDownload(){
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

        toggleAccordion() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>

<style scoped>

</style>