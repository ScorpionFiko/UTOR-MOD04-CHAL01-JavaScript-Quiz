// imports the data JS with all the questions and answers
import { loadQuestions  } from "./data.js";

// quiz settings
const quizQuestions = loadQuestions();
const quizTimer = 90;
const quizPenalty = 20;
const quizStatusTimer = 1;

// current working variables that will be manipulated without affecting the quiz settings
let currentUserScores = [];
let currentTimer = 0;
let currentPenalty = 0;
let currentQuestions = [];
let currentQuestion = {};
let correctAnswer = false;
let currentScore = 0;
let currentQuizDate = new Date();
let currentQuizSaved = false;
let currentQuizFinished = false;

// initialization function
init();
function init() {
    // setting up the quizTimer and quizPenalty elements on first page
    document.getElementById("quizTimer").innerHTML = quizTimer;
    document.getElementById("quizPenalty").innerHTML = quizPenalty;

    // retrieving any stored user score data
    if (localStorage.getItem("userScores") !== null) {
        currentUserScores = JSON.parse(localStorage.getItem("userScores"));
    }
    // setting up event listener for the "view high score" link
    document.getElementById("displayHighScore").onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        displayHighScore();
    }
    // start quiz button event listener
    let startBtn = document.getElementById("startQuiz");
    startBtn.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        resetQuiz();
        changeHighScoreStatus(false);
        displayQuestion();
        startTimer();
    }
    // event listener on the central panel body for getting user answer
    let answerPane = document.getElementById("cPanelBody");
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
                currentQuizFinished = true;
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
    currentQuizSaved = false;
    currentQuizFinished = false;
}

// adds the styling for the central panel when the quiz is in effect 
function addQAStyling(displayQA = false) {
    if (displayQA) {
        if (!document.getElementById("centralPanel").classList.contains("quiz")) {
            document.getElementById("centralPanel").classList.add("quiz");
        }
    } else {
        document.getElementById("centralPanel").classList.remove("quiz");

    }
}
// adds the styling for the central panel for the duration of the status message
function addStatusStyling(displayStatus = false) {
    if (displayStatus) {
        if (!document.getElementById("statusMessage").classList.contains("status")) {
            document.getElementById("statusMessage").classList.add("status");
        }
    } else {
        document.getElementById("statusMessage").classList.remove("status");

    }
}
// adds the styling for the timer for the duration of the quiz
function addTimerStyling(displayTimer = false) {
    if (displayTimer) {
        if (!document.getElementById("timer").classList.contains("timer")) {
            document.getElementById("timer").classList.add("timer");
        }
    } else {
        document.getElementById("timer").classList.remove("timer");

    }
}
// function to display status message for quizStatusTimer seconds after the user answered the question
function displayStatus() {
    addStatusStyling(true);
    if (correctAnswer) {
        document.getElementById("statusMessage").innerHTML = "Correct!"
    } else {
        document.getElementById("statusMessage").innerHTML = "Wrong!"
    }
    // keet the status message for quizStatusTimer seconds after which, delete the message and styling
    let currentStatusTimer = quizStatusTimer;
    let statusTimer = setInterval(function () {
        currentStatusTimer--;
        if (currentStatusTimer == 0) {
            clearInterval(currentStatusTimer);
            document.getElementById("statusMessage").innerHTML = "";
            addStatusStyling(false);
        }
    }, 1000);
}

// checks the data-index against the correctIndex
// if true, sets the correctAnswer to true, increments the point count
// otherwise: sets teh correctAnswer to false, sets the penalty
function checkAnswer(userAnswer) {
    if (parseInt(userAnswer.getAttribute("data-index")) === currentQuestion.correctIndex) {
        correctAnswer = true;
        currentScore += currentQuestion.points;
    } else {
        correctAnswer = false;
        currentPenalty = quizPenalty;
    }
}
// function to display a randomly selected question at a time 
// answer options are displayed as buttons
function displayQuestion() {
    addQAStyling(true);
    let qIndex = Math.floor(Math.random() * currentQuestions.length);
    currentQuestion = currentQuestions[qIndex];
    // setting the quesiton
    document.getElementById("cPanelHeaderH1").innerHTML = currentQuestion.quesetion;
    document.getElementById("centralPanel").setAttribute("data-question-id", currentQuestion.id);
    // setting the answers in buttons in the cPanelBody
    let cPanelBodyElement = document.getElementById("cPanelBody");
    cPanelBodyElement.innerHTML = "";
    let ulElement = document.createElement("ul");
    currentQuestion.answers.forEach((answer, index) => {
        let liElement = document.createElement("li");
        let btnElement = addButton(liElement, "answer" + (index + 1), answer);
        btnElement.setAttribute("data-index", index + 1);
        liElement.appendChild(btnElement);
        ulElement.appendChild(liElement);
    });
    // append the UL with the containing asnwers to the central Panel Body
    cPanelBodyElement.appendChild(ulElement);
    // remove the current quesetion from the list to avoid duplication
    currentQuestions.splice(qIndex, 1);
}

// function for starting/stopping the quiz timer
// timer start when user presses the "start quiz" button
// tuner stops when the user completes all questions or timer runs out
function startTimer() {
    var quizInterval = setInterval(function () {
        currentTimer--;
        currentTimer -= currentPenalty;
        document.getElementById("timer").innerHTML =
        "Time left: " + displayQuizTimer(currentTimer);
        addTimerStyling(true);
        if (currentTimer == 0 || currentQuizFinished) {
            clearInterval(quizInterval);
            addQAStyling(false);
            displayUserForm();
        } else {
            //resetting the penalty
            currentPenalty = 0;
        }
    }, 1000);
}
// function for displaying quiz timer in minute:seconds format
function displayQuizTimer(currentTimer) {
    if (currentTimer < 0) {
        currentTimer = 0;
        return;
    }
    let seconds = parseInt(currentTimer % 60);
    let minutes = parseInt(currentTimer / 60);
    // displaying in format min:sec with a leading zero if under 10
    return minutes + ":" + ((seconds < 10) ? "0" : "") + seconds;
}
// function for enabling or disabling the "view high score" link
// disabled when taking the quiz and entering initials
// enabled all other times; default is enabled
function changeHighScoreStatus(enableLink = true) {
    if (enableLink) {
        document.getElementById("displayHighScore").classList.remove("a_disabled");
    }
    else {
        document.getElementById("displayHighScore").classList.add("a_disabled");
    }
}

// function to display the user name or inital entry form
function displayUserForm() {
    // clears the timer
    document.getElementById("timer").innerHTML = "";
    addTimerStyling(false);

    document.getElementById("cPanelHeaderH1").innerHTML = "Congratulations!";
    document.getElementById("centralPanel").removeAttribute("data-id");

    let cPanelBodyElement = document.getElementById("cPanelBody");
    // clears any existing text
    cPanelBodyElement.innerHTML = "";
    // adds the score message
    let scoreMessage = document.createElement("p");
    scoreMessage.textContent = "Your current score is: " + currentScore;
    cPanelBodyElement.appendChild(scoreMessage);
    // adds the input field
    let userForm = document.createElement("form");
    let userNameInput = document.createElement("input");
    userNameInput.setAttribute("placeholder", "Enter your name or initials");
    userNameInput.setAttribute("name", "userName");
    userNameInput.setAttribute("id", "userName");
    // adds the submit button
    let submitBtn = addButton(cPanelBodyElement, "submitUserForm", "Submit");
    submitBtn.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        changeHighScoreStatus(true);
        saveScore();
        if (currentQuizSaved) {
            displayHighScore();
        }
    }
    // appending the children
    userForm.appendChild(userNameInput);
    userForm.appendChild(submitBtn);
    cPanelBodyElement.appendChild(userForm);

}
// function to save the current user score to local storage
// name or initials are saved in upper case
function saveScore() {
    let userName = document.getElementById("userName").value.trim().toUpperCase();
    // checks to see if the user enetered data; it not, user is presented with alert
    if (userName == "") {
        alert("Please enter your initials!");
        return;
    }
    // saves to local storage
    // checks if the user exists; if yes, updates the entry; if not adds a new user.
    let userExists = !(currentUserScores.findIndex(user => user.name === userName) < 0);
    if (userExists) {
        let existingUserIndex = currentUserScores.findIndex(user => user.name === userName);
        currentUserScores[existingUserIndex] = {
            name: userName,
            score: currentScore,
            datetime: currentQuizDate,
            timeTaken: quizTimer - currentTimer
        }
    } else {
        currentUserScores.push({
            name: userName,
            score: currentScore,
            datetime: currentQuizDate,
            timeTaken: quizTimer - currentTimer
        });
    }
    localStorage.setItem("userScores", JSON.stringify(currentUserScores));
    currentQuizSaved = true;
}

// function to display the existing user scores

function displayHighScore() {
    // getting any stored user scores
    currentUserScores = [];
    if (localStorage.getItem("userScores") !== null) {
        currentUserScores = JSON.parse(localStorage.getItem("userScores"));
    }
    // sorting the array based on user score and then by time taken if the score is equal
    currentUserScores.sort((a, b) => ((a.score > b.score) ? -1 : ((a.score < b.score) ? 1 : ((a.timeTaken >= b.timeTaken) ? 1 : -1))));
    // setting the page
    document.getElementById("cPanelHeaderH1").innerHTML = "High Scores";
    let cPanelBodyElement = document.getElementById("cPanelBody");
    cPanelBodyElement.innerHTML = "";
    // adds the list of scores
    createUserScoreTable(cPanelBodyElement, currentUserScores);
    // adds the go back button
    let goBackBtn = addButton(cPanelBodyElement, "goBack", "Go Back");
    goBackBtn.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        location.reload();
    }

    // adds the clear score button
    let clearScoreBtn = addButton(cPanelBodyElement, "clearScore", "Clear Score");
    // disables button if no scores are there to display
    if (currentUserScores.length == 0) {
        clearScoreBtn.setAttribute("disabled", "true");
    }
    clearScoreBtn.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        localStorage.removeItem("userScores");
        displayHighScore();
    }
    cPanelBodyElement.appendChild(clearScoreBtn);

}
// functions that adds button 
// takes on three parameters 
//  - the location where the button needs to be appended
//  - the id, and the text
// any additional attributes are set separately
function addButton(location, id, text) {
    let newButton = document.createElement("button");
    newButton.setAttribute("id", id);
    newButton.setAttribute("value", id);
    newButton.setAttribute("name", id);
    newButton.textContent = text;
    location.appendChild(newButton);
    return newButton;
}

// function to create a table displaying user scores
function createUserScoreTable(cPanelBodyElement, currentUserScores) {

    let table = document.createElement("table");
    let theader = table.createTHead();;
    let tbody = table.createTBody();
    let row = theader.insertRow();
    // adding header
    let dataPlace = row.insertCell();
    let dataName = row.insertCell();
    let dataScore = row.insertCell();
    let dataTime = row.insertCell();
    dataPlace.textContent = "Place"
    dataName.textContent = "User";
    dataScore.textContent = "Score";
    dataTime.textContent = "Duration\nmin:sec";
    // adding the data
    currentUserScores.forEach((currentUserScore, index) => {
        let dataRow = tbody.insertRow();
        dataPlace = dataRow.insertCell();
        dataName = dataRow.insertCell();
        dataScore = dataRow.insertCell();
        dataTime = dataRow.insertCell();
        dataPlace.textContent = index + 1;
        dataName.textContent = currentUserScore.name;
        dataScore.textContent = currentUserScore.score;
        dataTime.textContent = displayQuizTimer(currentUserScore.timeTaken);
    });
    cPanelBodyElement.appendChild(table);
}