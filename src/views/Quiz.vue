<template>
  <div class="container-fluid">
    <h1 class="text-center">
      {{ course_id }}-{{ class_id }} Quiz
      <div
        class="spinner-grow"
        style="width: 2rem; height: 2rem"
        role="status"
        v-if="isLoading"
      >
        <span class="sr-only"></span>
      </div>
    </h1>
    <h3 class="text-center">{{ description }}</h3>
    <div
      class="d-flex mt-3 mx-5 flex-column align-items-start"
      v-for="question in questions.question"
      v-bind:key="question"
    >
      <p class="fs-4 fw-bold">
        {{ question.question_id }}. {{ question.question_description }}
      </p>
      <p
        class="fs-5 mx-3"
        v-for="(option, index) in question.options"
        v-bind:key="index"
      >
        <input
          type="radio"
          :id="question.question_id + 'o' + index"
          :name="'q' + question.question_id"
          v-model="answer_sheet['q' + question.question_id]"
          :value="option.option"
          class="mx-2"
        /><label :for="question.question_id + 'o' + index">{{
          option.option
        }}</label>
      </p>
    </div>
    <div class="d-flex" v-if="submitted">
      <div class="card w-25 mx-5 mt-5">
        <h5 class="card-header bg-dark text-white">Answers</h5>
        <ol class="mt-2">
          <li
            class="text-start fw-bold"
            v-for="answer in answers"
            v-bind:key="answer"
          >
            {{ answer }}
          </li>
        </ol>
      </div>
      <div class="card w-25 mx-5 mt-5" v-if="results.pass">
        <h5 class="card-header bg-success text-white">Score</h5>
        <h5 class="card-body">
          {{ results.correct }}/{{ results.total }} - PASSED
        </h5>
      </div>
      <div class="card w-25 mx-5 mt-5" v-if="!results.pass">
        <h5 class="card-header bg-danger text-white">Score</h5>
        <h5 class="card-body">
          {{ results.correct }}/{{ results.total }} - FAILED
        </h5>
      </div>
    </div>
    <button
      class="mt-5 btn btn-primary"
      @click="submitAnswer()"
      :disabled="disableSubmit"
    >
      Submit
    </button>
    <!-- <button class="mt-5 btn btn-primary" :disabled="!isLearner" @click="submitAnswer()">Submit</button> -->
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store.js";
export default {
  props: ["id"],
  data() {
    return {
      course_id: "",
      class_id: "",
      description: "",
      options: [],
      questions: [],
      answer_sheet: {},
      isLearner: false,
      submitted: false,
      answers: [],
      results: {},
      isLoading: true,
      course_data: [],
    };
  },
  computed: {
    disableSubmit() {
      return !this.isLearner;
    },
  },
  async mounted() {
    var [course_id, class_id] = this.id.split("-");
    this.course_id = course_id;
    this.class_id = class_id;
    this.isLearner = this.$store.state.acc_type == "learner";
    await axios
      .get(
        `https://g6t5-flask.herokuapp.com/classes/getQuiz/${this.course_id}-${this.class_id}-1`
      )
      .then((response) => {
        this.questions = response.data;
        response.data.question.forEach((question, index) => {
          var count = index + 1;
          this.answer_sheet["q" + count] = null;
        });
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(
        `https://g6t5-flask.herokuapp.com/course/getCourse/${this.course_id}`
      )
      .then((response) => {
        this.course_data = response.data;
        this.description = this.course_data.course_description;
      })
      .catch((error) => {
        console.log(error);
      });

    this.isLoading = false;
  },
  methods: {
    async submitAnswer() {
      var sure = confirm(`Are you sure you want to submit your quiz?`);
      if (sure) {
        await axios
          .get(
            `https://g6t5-flask.herokuapp.com/quiz/getQuizAnswers/${this.course_id}-${this.class_id}-1`
          )
          .then((response) => {
            this.submitted = true;
            var answers = response.data.answers;
            var total = Object.keys(answers).length;
            this.answers = Object.values(answers);
            var correct = 0;
            for (const [key, value] of Object.entries(answers)) {
              var attempt = this.answer_sheet[key];
              if (attempt == value) {
                correct++;
              }
            }
            var passing = Math.ceil(0.85 * total);
            this.results = {
              correct: correct,
              pass: correct >= passing ? true : false,
              total: total,
            };

            if (this.results.pass) {
              var data = {
                learner_id: store.state.user_id,
                course_id: this.course_id,
                is_qualified: true,
              };
              axios
                .post("https://g6t5-flask.herokuapp.com/learner/addBadge", data)
                .then(() => {
                  alert(
                    `Congratulations! You have passed the quiz and completed the course!`
                  );
                })
                .catch((error) => {
                  alert(
                    `You have already passed the quiz and completed the course! Your score will not be recorded.`
                  );
                  console.log(error);
                });
            } else {
              alert(`You have failed the quiz!`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
