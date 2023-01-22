// imports the data JS with all the questions and answers
import { loadQuestions, loadUserScore } from "./data.js";

// quiz settings
const quizQuestions = loadQuestions();
const quizTimer = 120;
const quizPenalty = 10;
const quizStatusTimer = 1;

// current session working variables
let startBtn = document.getElementById("startQuiz");
let userScores = [];
let currentTimer = 0;
let currentPenalty = 0;
let currentQuestions = [];
let currentQuestion = {};
let correctAnswer = false;

init();
function init() {
    // getting any stored user scores
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
            checkAnswer(userAnswer);
            displayStatus();
            displayQuestion();
        }
    }
}

function resetQuiz() {
    currentTimer = quizTimer;
    currentPenalty = 0;
    currentQuestions = quizQuestions;
}

function addQAStyling() {
    if (!document.getElementById("qaPane").classList.contains("qaPane-QA")) {
        document.getElementById("qaPane").classList.add("qaPane-QA");
    }
}

function addStatusStyling(displayStatus = false) {
    if (displayStatus) {
        if (!document.getElementById("status").classList.contains("status")) {
            document.getElementById("status").classList.add("status");
        }
    } else {
        document.getElementById("status").classList.remove("status");

    }
}
// function to display status message for a few seconds after answer the questions
function displayStatus() {
    // adds the styling class to the status section
    addStatusStyling(true);
    // display appropriate message on correct or wrong anwer
    if (correctAnswer) {
        document.getElementById("status").innerHTML = "Correct!"
    } else {
        document.getElementById("status").innerHTML = "Wrong!"
    }
    // keet the status message for a few seconds after which, delete the message and styling
    let currentStatusTimer = quizStatusTimer;
    let statusTimer = setInterval(function () {
        currentStatusTimer--;
        if (currentStatusTimer == 0) {
            clearInterval(currentStatusTimer);
            document.getElementById("status").innerHTML = "";
            addStatusStyling(false);
        }
    }, 1000);
}


function checkAnswer(userAnswer) {
    // checks the data-index against the correctIndex
    // if true, sets the correctAnswer to true
    // otherwise: sets teh correctAnswer to false and sets the penalty
    if (parseInt(userAnswer.getAttribute("data-index")) === currentQuestion.correctIndex) {
        correctAnswer = true;
    } else {
        correctAnswer = false;
        currentPenalty = quizPenalty;
    }

}

function displayQuestion() {
    // add the QA styling
    addQAStyling();
    // display question
    if (currentQuestions.length > 0) {
        // pick question at random
        let qIndex = Math.floor(Math.random() * currentQuestions.length);
        currentQuestion = currentQuestions[qIndex];
        // setting the quesiton
        document.getElementById("questionH1").innerHTML = currentQuestion.quesetion;
        // setting the answers
        // gets the answer element
        let answerElement = document.getElementById("answer");
        // clears any existing text
        answerElement.innerHTML = "";
        // sets up an unordered list to house the answers
        let ulElement = document.createElement("ul");
        // for all the answers, put them in buttons inside a list item element
        currentQuestion.answers.forEach((answer, index) => {
            // create the list item element
            let liElement = document.createElement("li");
            // create the button element
            let btnElement = document.createElement("button");
            // add class to the button
            btnElement.classList.add("btn");
            // add custom index to compare to correct answer position
            btnElement.setAttribute("data-index", index + 1)
            // setup the button text
            btnElement.textContent = answer;
            // append the button to the list item
            liElement.appendChild(btnElement);
            // append the list item to the ul
            ulElement.appendChild(liElement);
        });
        // append the UL to the containing element
        answerElement.appendChild(ulElement);
        // remove the current quesetion from the list to avoid duplication
        currentQuestions.splice(qIndex, 1);
    } else {
        // display name entry page
    }
}

// function for starting/stopping the quiz timer
function startTimer() {
    console.log("startTimer");
    var quizInterval = setInterval(function () {
        // reducing our quizTimer
        currentTimer--;
        // reducing the timer by any penalties for not answering correctly
        currentTimer -= currentPenalty;
        // if currentTimer > 0 then display time
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
// function for displaying quiz timer
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
// function for enabling or disabling the "view high score" link
// disabled when taking the quiz
// enabled all other times; default is enabled
function changeHighScoreStatus(disabled = false) {
    if (disabled) {
        document.getElementById("displayHighScore").classList.add("a_disabled");
    }
    else {
        document.getElementById("displayHighScore").classList.remove("a_disabled");
    }
}