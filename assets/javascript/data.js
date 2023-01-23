// data JS containing all questions and answers
// separate file from the rest of the JS functionality
export function loadQuestions() {
    return [
        {
            id: 1,
            quesetion: "Inside which HTML element do we put the JavaScript?",
            answers: [
                "<js></js>",
                "<script>",
                "<scripting>",
                "<javascript>"
            ],
            correctIndex: 2,
            points: 1
        },
        {
            id:25,
            quesetion: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
            answers: [
                "<script name=\"xxx.js\">",
                "<script href=\"xxx.js\">",
                "<script src=\"xxx.js\">"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:2,
            quesetion: "What is the correct JavaScript syntax to change the content of the HTML element below?<br /><br /><p id=\"demo\">This is a demonstration.</p>",
            answers: [
                "#demo.innerHTML = \"Hello World!\";",
                "document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
                "document.getElement(\"p\").innerHTML = \"Hello World!\";",
                "document.getElementByName(\"p\").innerHTML = \"Hello World!\";"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:3,
            quesetion: "Where is the correct place to insert a JavaScript?",
            answers: [
                "Both the <head> section and the <body> section are correct",
                "The <body> section",
                "The <head> section"
            ],
            correctIndex: 1,
            points: 5
        },
        {
            id:4,
            quesetion: "The external JavaScript file must contain the <script> tag.",
            answers: [
                "True",
                "False"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:5,
            quesetion: "How do you write \"Hello World\" in an alert box?",
            answers: [
                "msgBox(\"Hello World\");",
                "alert(\"Hello World\");",
                "msg(\"Hello World\");",
                "alertBox(\"Hello World\");"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:6,
            quesetion: "How do you create a function in JavaScript?",
            answers: [
                "function:myFunction()",
                "function myFunction()",
                "function = myFunction()"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:7,
            quesetion: "How do you call a function named \"myFunction\"?",
            answers: [
                "call function myFunction()",
                "myFunction()",
                "call myFunction()"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:8,
            quesetion: "How to write an IF statement in JavaScript?",
            answers: [
                "if i = 5",
                "if i = 5 then",
                "if i == 5 then",
                "if (i == 5)"
            ],
            correctIndex: 4,
            points: 5
        },
        {
            id:9,
            quesetion: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
            answers: [
                "if i =! 5 then",
                "if i <> 5",
                "if (i <> 5)",
                "if (i != 5)"
            ],
            correctIndex: 4,
            points: 5
        },
        {
            id:10,
            quesetion: "How does a WHILE loop start?",
            answers: [
                "while (i <= 10; i++)",
                "while i = 1 to 10",
                "while (i <= 10)"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:11,
            quesetion: "How does a FOR loop start?",
            answers: [
                "for i = 1 to 5",
                "for (i = 0; i <= 5)",
                "for (i = 0; i <= 5; i++)",
                "for (i <= 5; i++)"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:12,
            quesetion: "How can you add a comment in a JavaScript?",
            answers: [
                "<!--This is a comment-->",
                "'This is a comment",
                "//This is a comment"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:13,
            quesetion: "How to insert a comment that has more than one line?",
            answers: [
                "/*This comment has<br />more than one line*/",
                "//This comment has<br />more than one line//",
                "<!--This comment has<br />more than one line-->"
            ],
            correctIndex: 1,
            points: 5
        },
        {
            id:14,
            quesetion: "What is the correct way to write a JavaScript array?",
            answers: [
                "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
                "var colors = \"red\", \"green\", \"blue\"",
                "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
                "var colors = [\"red\", \"green\", \"blue\"]"
            ],
            correctIndex: 4,
            points: 5
        },
        {
            id:15,
            quesetion: "How do you round the number 7.25, to the nearest integer?",
            answers: [
                "Math.rnd(7.25)",
                "rnd(7.25)",
                "round(7.25)",
                "Math.round(7.25)"
            ],
            correctIndex: 4,
            points: 5
        },
        {
            id:16,
            quesetion: "How do you find the number with the highest value of x and y?",
            answers: [
                "Math.ceil(x, y)",
                "ceil(x, y)",
                "Math.max(x, y)",
                "top(x, y)"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:17,
            quesetion: "What is the correct JavaScript syntax for opening a new window called \"w2\" ?",
            answers: [
                "w2 = window.open(\"http://www.w3schools.com\");",
                "w2 = window.new(\"http://www.w3schools.com\");"
            ],
            correctIndex: 1,
            points: 5
        },
        {
            id:18,
            quesetion: "JavaScript is the same as Java.",
            answers: [
                "False",
                "True"
            ],
            correctIndex: 1,
            points: 5
        },
        {
            id:19,
            quesetion: "How can you detect the client's browser name?",
            answers: [
                "client.navName",
                "browser.name",
                "navigator.appName"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:20,
            quesetion: "Which event occurs when the user clicks on an HTML element?",
            answers: [
                "onmouseclick",
                "onclick",
                "onmouseover",
                "onchange"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:21,
            quesetion: "How do you declare a JavaScript variable?",
            answers: [
                "variable carName;",
                "v carName;",
                "let carName;",
                "declare carName as string;"
            ],
            correctIndex: 3,
            points: 5
        },
        {
            id:22,
            quesetion: "Which operator is used to assign a value to a variable?",
            answers: [
                "-",
                "=",
                "x",
                "*"
            ],
            correctIndex: 2,
            points: 5
        },
        {
            id:23,
            quesetion: "What will the following code return: Boolean(10 > 9)",
            answers: [
                "true",
                "false",
                "NaN"
            ],
            correctIndex: 1,
            points: 5
        },
        {
            id:24,
            quesetion: "Is JavaScript case-sensitive?",
            answers: [
                "Yes",
                "No"
            ],
            correctIndex: 1,
            points: 5
        }
    ]
}
