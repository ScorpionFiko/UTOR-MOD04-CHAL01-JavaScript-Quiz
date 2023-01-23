// data JS containing all questions and answers
// separate file from the rest of the JS functionality
export function loadQuestions() {
    return [
        {
            id: 1,
            quesetion: "Inside which HTML element do we put the JavaScript?",
            answers: [
                "head",
                "body",
                "header",
                "footer"
            ],
            correctIndex: 1,
            points: 5
        },
        {
            id:2,
            quesetion: "What is my THIS?",
            answers: [
                "true",
                "false"
            ],
            correctIndex: 2,
            points: 2
        }
    ]
}
