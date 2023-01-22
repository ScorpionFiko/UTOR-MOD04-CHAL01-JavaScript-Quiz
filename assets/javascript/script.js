import { loadQuestions, loadUserScore } from "./data.js";

let startBtn = document.getElementById("startQuiz");
let quizQuestions = loadQuestions();
let userScores = [];
/* testing code below */
quizQuestions.forEach((quizQuestion, qIndex) => {
    console.log("Q" + (qIndex + 1) + ". " + quizQuestion.quesetion);
    quizQuestion.answer.forEach((quizAnswer, aIndex) => {
        console.log("A" + (aIndex + 1) + ". " + quizAnswer);
    });
    console.log(quizQuestion.correct);
});
/* testing code above */

init();

function init() {
    // initializing by setting up the questions
    // and getting any stored user scores
    quizQuestions = loadQuestions();
    if (localStorage.getItem("userScores") !== null) {
        userScores = JSON.parse(localStorage.getItem("userScores"));
    }

    // setting up event listeners
    // start button event listener
    startBtn.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        displayQuestion();
        startTimer();
    }

    // answer button lisener
    let answerPane = document.getElementById("answer");
    answerPane.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        let userAnswer = event.target;
        if (userAnswer.matches("button")) {
            //checkAnswer(userAnswer);
            console.log(userAnswer);
        }

    }
}

function displayQuestion() {
    console.log("displayQuestion");
}

function startTimer() {
    console.log("startTimer");
}