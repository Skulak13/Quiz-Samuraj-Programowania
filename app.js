const express = require('express'); // Using CommonJS – can be converted to modern ESM: import express from 'express'; 

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

let goodAnswears = 0;
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
    } else {
        const nextQuestion = questions[goodAnswears];

        const { question, answers } = nextQuestion;
        res.json({
            question, answers,
        });
    }
});        