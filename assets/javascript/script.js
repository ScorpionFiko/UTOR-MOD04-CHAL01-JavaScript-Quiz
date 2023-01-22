// imports the data JS with all the questions and answers
import { loadQuestions, loadUserScore } from "./data.js";

// quiz settings
const quizQuestions = loadQuestions();
const quizTimer = 120;
const quizPenalty = 10;
const quizStatusTimer = 1;

// current session working variables
let startBtn = document.getElementById("startQuiz");
let currentUserScores = [];
let currentTimer = 0;
let currentPenalty = 0;
let currentQuestions = [];
let currentQuestion = {};
let correctAnswer = false;
let currentScore = 0;
let currentQuizDate = new Date();
let currentQuizSaved = false;

init();
function init() {

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
            if (currentQuestions.length > 0) {
                displayQuestion();
            } else {
                displayUserForm();
            }
        }
    }
}
// function to reset the quiz for additional attempts
function resetQuiz() {
    currentTimer = quizTimer;
    currentPenalty = 0;
    currentQuestions = quizQuestions;
    currentScore = 0;
    currentQuizDate = new Date().getTime();
    console.log(currentQuizDate);
    currentQuizSaved = false;
}

// adds the styling for the QA 
function addQAStyling(displayQA = false) {
    if (displayQA) {
        if (!document.getElementById("qaPane").classList.contains("qaPane-QA")) {
            document.getElementById("qaPane").classList.add("qaPane-QA");
        }
    } else {
        document.getElementById("qaPane").classList.remove("qaPane-QA");

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
    // if true, sets the correctAnswer to true, increments the point count
    // otherwise: sets teh correctAnswer to false, sets the penalty
    if (parseInt(userAnswer.getAttribute("data-index")) === currentQuestion.correctIndex) {
        correctAnswer = true;
        currentScore += currentQuestion.points;
    } else {
        correctAnswer = false;
        currentPenalty = quizPenalty;
    }

}

function displayQuestion() {
    // add the QA styling
    addQAStyling(true);
    // pick question at random
    let qIndex = Math.floor(Math.random() * currentQuestions.length);
    currentQuestion = currentQuestions[qIndex];
    // setting the quesiton
    document.getElementById("questionH1").innerHTML = currentQuestion.quesetion;
    document.getElementById("questionH1").setAttribute("data-id", currentQuestion.id);
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
}

// function for starting/stopping the quiz timer
function startTimer() {
    var quizInterval = setInterval(function () {
        // reducing our quizTimer
        currentTimer--;
        // reducing the timer by any penalties for not answering correctly
        currentTimer -= currentPenalty;
        // if currentTimer > 0 then display time
        // otherwise stop the timer and display the finale page
        // TODO stop timer when user has ginished all questions
        displayQuizTimer(currentTimer);
        if (currentTimer == 0) {
            clearInterval(quizInterval);
            // enabling the "view high score" link
            changeHighScoreStatus(false);
            // displaing the name entry page
            displayUserForm();
        } else {
            //resetting the penalty
            currentPenalty = 0;
        }
    }, 1000);
}
// function for displaying quiz timer
function displayQuizTimer(currentTimer) {
    // resetting the timer to zero if negative
    if (currentTimer < 0) {
        currentTimer = 0;
        return;
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


function displayUserForm() {
    addQAStyling(false);
    // setting the user form
    document.getElementById("questionH1").innerHTML = "Congratulations!";
    document.getElementById("questionH1").removeAttribute("data-id");
    // clears the timer
    document.getElementById("timer").innerHTML = "";
    // gets the answer element
    let answerElement = document.getElementById("answer");
    // clears any existing text
    answerElement.innerHTML = "";
    // adds the score message
    let scoreMessage = document.createElement("p");
    scoreMessage.textContent = "Your current score is: " + currentScore;
    answerElement.appendChild(scoreMessage);
    // adds the input field
    let userForm = document.createElement("form");
    let userName = document.createElement("input");
    userName.setAttribute("placeholder","Enter your name or initials");
    userName.setAttribute("name", "userName");
    userName.setAttribute("id", "userName");
    //userName.setAttribute("class","btn")
    let submitBtn = document.createElement("button");
    submitBtn.classList.add("btn");
    submitBtn.setAttribute("id","submitUserForm")
    submitBtn.textContent = "Submit"
    submitBtn.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        saveScore();
        if (currentQuizSaved) {
            displayHighScore();
        }
    }
    userForm.appendChild(userName);
    userForm.appendChild(submitBtn);
    answerElement.appendChild(userForm);

}
// function to save the score to local storage
function saveScore() {
    // gets the input form input
    let userName = document.getElementById("userName").value.trim();
    // checks to see if the user enetered data; it not, user is presented with alert
    if (userName == "") {
        alert("Please enter your initials!");
        return;
    } 
    // saves to local storage
    userScores.push({
        name: userName,
        score: currentScore, 
        datetime: currentQuizDate
    });
    localStorage.setItem("userScore",JSON.stringify(userScores));
    currentQuizSaved=true;
}

function displayHighScore() {
    console.log("save");
    // getting any stored user scores
    if (localStorage.getItem("userScores") !== null) {
        currentUserScores = JSON.parse(localStorage.getItem("userScores"));
    }

}