function gameRoutes(app) {
let goodAnswears = 0;
let isGameOver = false;
let callToAFriendUsed = false;
let askTheAudienceUsed = false;
let fiftyFiftyUsed = false;

const questions = [
    {   
        question: 'Jaki jest najlepszy język programowania?',
        answers: ['C++', 'Fortran', 'JavaScript', 'Python'],
        correctAnswer: 2
    },
    {
        question: 'Czy ten kurs jest dobry?',
        answers: ['Tak', 'Nie', 'Nie wiem', 'Nie interesuje mnie to'],
        correctAnswer: 0
    },
    {
        question: 'Czy chcesz zjeść pizzę?',
        answers: ['Tak', 'Nie', 'Nie wiem', 'Nawet dwie'],
        correctAnswer: 3
    },
];    

app.get('/question', (req, res) => {

    if (goodAnswears === questions.length) {
        res.json({
            winner: true,
        });
    } else if (isGameOver) {
        res.json({
            loser: true,
        });
    } else {
        const nextQuestion = questions[goodAnswears];

        const { question, answers } = nextQuestion;
        res.json({
            question, answers,
        });
    }
});

app.post('/answer/:index', (req, res) => {

    if (isGameOver) {
        res.json({
            loser: true,
        });
    }

    const { index } = req.params;

    const question = questions[goodAnswears];

    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
        goodAnswears++;
    } else {
        isGameOver = true;
    }

    res.json({
        correct: isGoodAnswer,
        goodAnswears,
    });
});

app.get('/help/friend', (req, res) => {
    if (callToAFriendUsed) {
        return res.json({
            text: 'Już użyłeś to koło ratunkowe',
        });
    }

    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() > 0.5; 

    const question = questions[goodAnswears];

    res.json({
        text: doesFriendKnowAnswer
            ? `Myślę, że poprawna odpowiedź to ${question.answers[question.correctAnswer]}`
            : `Nie wiem, nie znam się na tym`,
    });
});

app.get('/help/fifty', (req, res) => {
    if (fiftyFiftyUsed) {
        return res.json({
            text: 'Już użyłeś to koło ratunkowe',
        });
    }

    fiftyFiftyUsed = true;

    const question = questions[goodAnswears];

    const answersCopy = question.answers.filter((s, index) => (
        index !== question.correctAnswer
    ));
    answersCopy.splice(~~(Math.random() * answersCopy.length), 1); // ~~ - quick alternative to Math.floor() for positive numbers, but it does not behave identically for negative numbers (it rounds toward zero, not down)
    res.json({
        answersToRemove: answersCopy,
    });
});

app.get('/help/audience', (req, res) => {
    if (askTheAudienceUsed) {
        return res.json({
            text: 'Już użyłeś to koło ratunkowe',
        });
    }

    askTheAudienceUsed = true;
    
    const chart = [10, 20, 30, 40];

    for (let i = chart.length - 1; i >= 0; i--) {
        const change = Math.floor(Math.random() * 20) - 10; // Random change between -10 and +10
        chart[i] += change;
        chart[i - 1] -= change; // Adjust the previous element to keep the total at 100
    }

    const question = questions[goodAnswears];
    const { correctAnswer } = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]; // Swap the last element with the correct answer

    res.json({
        chart,
    });
});
}

module.exports = gameRoutes;  // In ESM: export default gameRoutes;