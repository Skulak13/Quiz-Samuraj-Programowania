function gameRoutes(app) {
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
}

module.exports = gameRoutes;  // In ESM: export default gameRoutes;