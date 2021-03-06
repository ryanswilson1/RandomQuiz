const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('qText'));
const text = document.getElementById('text');
const scoreText = document.getElementById('score');
const gameBarFull = document.getElementById('gameBarFull');
const loader = document.getElementById('progress-bar');
const gamer = document.getElementById('gamer');
var clock = document.getElementById('timer')
var firstQuestion = {};
var inputAnswers = false;
var score = 0;
var questionCounter = 0;
var questionList = [];
var timer
var gameClock

var questions = [
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
    questionList = [...questions];
    getNewQuestion();
    gamer.classList.remove('hidden');
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
    if (questionList.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return endGame();
    }
    questionCounter++;
    text.innerText = `Question ${questionCounter}/${MAX_QUESTIONS} `
    gamer.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * questionList.length);
    firstQuestion = questionList[questionIndex];
    question.innerHTML = firstQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = firstQuestion['choice' + number];
    });

    questionList.splice(questionIndex, 1);
    inputAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!inputAnswers) return;

        inputAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == firstQuestion.answer ? 'correct' : 'incorrect';

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