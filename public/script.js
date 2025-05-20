const question = document.getElementById('question');
const gameBoard = document.getElementById('game-board');
const h2 = document.querySelector('h2');

function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'Brawo, wygrałeś!';
        return;
    }
    if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'Niestety, przegrałeś!';
        return;
    }

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

const goodAnswearsSpan = document.getElementById('goodAnswears');

function handleAnswerFeedback(data) {
    goodAnswearsSpan.innerText = data.goodAnswears;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })  
    .then(response => response.json())
    .then(data => {
    handleAnswerFeedback(data);     
    });
}

const buttons = document.querySelectorAll('.answer-btn');
for (const button of buttons) {
    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);
    });
}

const tipDiv = document.getElementById('tip');

function handleFriendAnswer(data) {
    tipDiv.innerText = data.text;
}

function callToAFriend() {
    fetch('/help/friend', {
        method: 'GET',
    })  
    .then(response => response.json())
    .then(data => {
        const friendAnswer = document.getElementById('friendAnswer');
        handleFriendAnswer(data);
    });
}

document.querySelector('#callToAFriend').addEventListener('click', callToAFriend);

function handleFiftyFiftyAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } 
    else {
        for (const button of buttons) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = '';
            }
        }
    }
}

function fiftyFifty() {
    fetch('/help/fifty', {
        method: 'GET',
    })  
    .then(response => response.json())
    .then(data => {
        const friendAnswer = document.getElementById('friendAnswer');
        handleFiftyFiftyAnswer(data);
    });
}

document.querySelector('#fiftyFifty').addEventListener('click', fiftyFifty);

function handleAudienceAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } 
    else {
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText}: ${percent}%`;            
        });
    }
}

function askTheAudience() {
    fetch('/help/audience', {
        method: 'GET',
    })  
    .then(response => response.json())
    .then(data => {
        const friendAnswer = document.getElementById('friendAnswer');
        handleAudienceAnswer(data);
    });
}

document.querySelector('#askTheAudience').addEventListener('click', askTheAudience);