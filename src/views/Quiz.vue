<template>
  <div class="container-fluid">
      <h1 class="text-center">{{course_id}}-{{class_id}} Quiz</h1>
      <div class="d-flex mt-3 mx-5 flex-column align-items-start" v-for="question in questions.question" v-bind:key="question">
          <p class="fs-4 fw-bold">{{question.question_id}}. {{question.question_description}}</p>
          <p class="fs-5 mx-3" v-for="(option,index) in question.options" v-bind:key="index">
              <input type="radio" :id="question.question_id +'o'+index" :name="'q'+question.question_id" v-model="answer_sheet['q'+question.question_id]" :value="option.option" class="mx-2"><label :for="question.question_id +'o'+index">{{option.option}}</label>
          </p>
      </div>
      <button class="mt-5 btn btn-primary" @click="submitAnswer()">Submit</button>
  </div>
</template>

<script>
import axios from "axios"
export default {
    props:["course_id","class_id"],
    data(){
        return{
            options:[],
            questions:[],
            answer_sheet:{}
        }
    },
    mounted(){
        axios.get(`http://127.0.0.1:5000/classes/getQuiz/${this.course_id}-${this.class_id}-1`).then(response => {
          this.questions = response.data
          response.data.question.forEach((question,index) => {
              var count = index + 1
              this.answer_sheet["q"+count] = null
          })
            
          console.log(this.answer_sheet)
      }).catch((error) => {
            console.log(error)
      })
    },
    methods:{
        async submitAnswer(){
            await axios.get(`http://127.0.0.1:5000/quiz/getQuizAnswers/${this.course_id}-${this.class_id}-1`)
            .then(response => {
                var answers = response.data.answers
                var total = Object.keys(answers).length
                var correct = 0
                for (const [key, value] of Object.entries(answers)) {
                    var attempt = this.answer_sheet[key]
                    if(attempt == value){
                        correct++
                    }
                }
                var wrong = total - correct
                var passing = Math.ceil(0.85*total)
                console.log(passing)
                console.log("Total:", total)
                console.log("Correct:", correct)
                console.log("Wrong:", wrong)
            })
            .catch((error) => {
            console.log(error)
            })
            
    }
    
}}
</script>

<style>

</style>