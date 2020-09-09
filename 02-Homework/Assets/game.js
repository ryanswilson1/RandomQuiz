const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let clock = document.getElementById('timer')
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
var timer
var gameClock

let questions = [
    {
        answer: 3,
        choice1: "Green",
        choice2: "Yellow",
        choice3: "Blue",
        choice4: "Purple",
        question: "What color is the sky?",
    },

    {
        answer: 3,
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        question: "What is 2 plus 1?",
    },

    {
        answer: 3,
        choice1: "0",
        choice2: "2",
        choice3: "81",
        choice4: "4,679",
        question: "What is 9*9?",
    },

    {
        answer: 3,
        choice1: "Grey",
        choice2: "Black",
        choice3: "Yellow",
        choice4: "Magenta",
        question: "What color is the sun?",
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;
startGame = () => {
    gameClock = 10 * questions.length
    timer = setInterval(timerHandler,1000);
    clock.textContent = gameClock;
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};
function timerHandler(){
   gameClock--;
   clock.textContent = gameClock;
   if (gameClock <= 0){
       clearInterval(timer)
       endGame();
   }
}

function endGame(){
    localStorage.setItem('mostRecentScore', score);
    window.location.assign("./end.html")
}

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return endGame();
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
startGame();