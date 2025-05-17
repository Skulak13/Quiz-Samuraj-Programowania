const question = document.getElementById('question');

function fillQuestionElements(data) {
    question.innerText = data.question;
    for (const i in data.answers) {
        const answerElement = document.getElementById(`answer${Number(i) + 1}`);
        answerElement.innerText = data.answers[i];
    }
}    
    /*
Alternative solution using forEach:
The forEach method can be used to iterate over the answers array in a more readable and idiomatic way.
However, note that forEach iterates over values, not indices, so we use the second argument of the callback function to access the index.

Example:
data.answers.forEach((answer, index) => {
    const answerElement = document.querySelector(`#answer${index + 1}`);
    answerElement.innerText = answer;
});

Advantages of using forEach:
- Improved readability and idiomatic usage in JavaScript.
- Directly iterates over array elements.

Disadvantages:
- Cannot break out of the loop early (no 'break' or 'continue' statements).
- Slightly less intuitive if you specifically need the index for other purposes.
*/    


function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })  
    .then(response => response.json())
    .then(data => {
    fillQuestionElements(data);     
    });
}

showNextQuestion();

function sendAnswer(answerIndex) {
    fetch('/answer/${answerIndex}', {
        method: 'POST',
    })  
    .then(response => response.json())
    .then(data => {
    console.log(data);     
    });
}