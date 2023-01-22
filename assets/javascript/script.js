import { loadQuestions, loadUserScore } from "./data.js";

let startBtn = document.getElementById("startQuiz");
let quizQuestions = loadQuestions();
let userScores = [];
const quizTimer = 5;
let currentTimer = 0;
const penalty = 10;
let currentPenalty = 0;
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
        resetQuiz();
        changeHighScoreStatus(true);
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
            displayQuestion();
        }
    }
}

function resetQuiz() {
    currentTimer = quizTimer;
    currentPenalty = 0;
}

function displayQuestion() {
    console.log("displayQuestion");
}

function startTimer() {
    console.log("startTimer");
    var quizInterval = setInterval(function () {
        // reducing our quizTimer
        currentTimer--;
        // reducing the timer by any penalties for not answering correctly
        currentTimer -= currentPenalty;
        // if quizTimer > 0 then display time
        // otherwise stop the timer and display the finale page
        displayQuizTimer(currentTimer);
        if (currentTimer > 0) {
            //resetting the penalty
            currentPenalty = 0;
        }
        else {
            clearInterval(quizInterval);
            // enabling the "view high score" link
            changeHighScoreStatus(false);
            // displaing the name entry page
        }
    }, 1000);
}

function displayQuizTimer(currentTimer) {
    // resetting the timer to zero if negative
    if (currentTimer < 0) {
        currentTimer = 0;
    }
    // obtaining minute and seconds in integer form to avoid decimal places
    let seconds = parseInt(currentTimer % 60);
    let minutes = parseInt(currentTimer / 60);
    // displaying in format min:sec with a leading zero if under 10
    document.getElementById("timer").innerHTML =
        "Time left: " +
        ((minutes < 10) ? "0" : "") + minutes + ":" +
        ((seconds < 10) ? "0" : "") + seconds;
}

function changeHighScoreStatus(disabled) {
    // enables or disables the "view high score" link
    // disabled when taking the quiz
    // enabled all other times
    if (disabled) {
        document.getElementById("displayHighScore").classList.add("a_disabled");
    }
    else {
        document.getElementById("displayHighScore").classList.remove("a_disabled");
    }
}