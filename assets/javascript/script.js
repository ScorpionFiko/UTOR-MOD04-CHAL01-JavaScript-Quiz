import { loadQuestions, loadUserScore } from "./data.js";

let startBtn = document.getElementById("startQuiz");
let quizQuestions = loadQuestions();
let userScores = [];
let quizTimer = 120;
let penalty = 10;
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
    var quizInterval = setInterval(function () {
        // reducing our quizTimer
        quizTimer--;
        // reducing the timer by any penalties for not answering correctly
        quizTimer -= penalty;
        // if quizTimer > 0 then display time
        // otherwise stop the timer and display the finale page
        displayQuizTimer(quizTimer);
        if (quizTimer > 0) {
            //resetting the penalty
            //penalty=0;
        }
        else {
            clearInterval(quizInterval);
            // display final page
        }
    }, 1000);
}

function displayQuizTimer(quizTimer) {
    if (quizTimer < 0) {
        quizTimer = 0;
    }
    let seconds = parseInt(quizTimer % 60);
    let minutes = parseInt(quizTimer / 60);
    document.getElementById("timer").innerHTML = 
        "Time left: " + 
        ((minutes >= 10 ) ? minutes : ("0" + minutes)) + ":" +
        ((seconds >= 10 ) ? seconds : ("0" + seconds));
}