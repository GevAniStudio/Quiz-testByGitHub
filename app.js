document.addEventListener('DOMContentLoaded', () => {
  nextButton.classList.add('hide');
});

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizAppElement = document.getElementById('quiz-app');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
          button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', () => selectAnswer(button));
      answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(selectedButton) {
  Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      setStatusClass(button, button.dataset.correct);
  });

  const correct = selectedButton.dataset.correct;
  if (correct) {
      score++;
  }
  setStatusClass(selectedButton, correct);

  setTimeout(() => {
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
          nextButton.classList.remove('hide');
      } else {
          concludeQuiz();
      }
  }, 1000); // Adjust delay as needed
 
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
      element.classList.add('correct');
  } else {
      element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function concludeQuiz() {
  questionContainerElement.classList.add('hide');
  nextButton.classList.add('hide');

  resultsElement.classList.remove('hide');
  resultsElement.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
      <button onclick="restartQuiz()">Restart Quiz</button>
  `;
  quizAppElement.appendChild(resultsElement);
}

function restartQuiz() {
  resultsElement.classList.add('hide');
  score = 0;
  currentQuestionIndex = 0;
  startGame();
}

const questions = [
  {
      question: "What is a Variable in JavaScript?",
      answers: [
          { text: "A section of the webpage", correct: false },
          { text: "A container for storing data values", correct: true },
          { text: "A type of JavaScript function", correct: false },
          { text: "An operation in mathematics", correct: false }
      ]
  },
  {
      question: "Which of the following is used to declare a variable in JavaScript?",
      answers: [
          { text: "var", correct: false },
          { text: "let", correct: false },
          { text: "const", correct: false },
          { text: "All of the above", correct: true }
      ]
  },
  {
      question: "What does the `===` operator check?",
      answers: [
          { text: "Only value equality", correct: false },
          { text: "Only type equality", correct: false },
          { text: "Both value and type equality", correct: true },
          { text: "Neither value nor type equality", correct: false }
      ]
  },
  {
      question: "What is an Array in JavaScript?",
      answers: [
          { text: "A function that performs an operation", correct: false },
          { text: "A single variable used to store different elements", correct: true },
          { text: "A series of characters", correct: false },
          { text: "A conditional statement", correct: false }
      ]
  },
  {
      question: "Which method can add one or more elements to the end of an array?",
      answers: [
          { text: "array.unshift()", correct: false },
          { text: "array.push()", correct: true },
          { text: "array.pop()", correct: false },
          { text: "array.slice()", correct: false }
      ]
  },
  {
      question: "How do you create a function in JavaScript?",
      answers: [
          { text: "function myFunction()", correct: true },
          { text: "create myFunction()", correct: false },
          { text: "function: myFunction()", correct: false },
          { text: "function = myFunction()", correct: false }
      ]
  },
  {
      question: "Which statement is used to execute actions based on a condition?",
      answers: [
          { text: "for", correct: false },
          { text: "while", correct: false },
          { text: "if", correct: true },
          { text: "switch", correct: false }
      ]
  },
  {
      question: "What is the purpose of a loop in JavaScript?",
      answers: [
          { text: "To perform a single action once", correct: false },
          { text: "To store multiple values in a single variable", correct: false },
          { text: "To execute a block of code a number of times", correct: true },
          { text: "To speed up code execution", correct: false }
      ]
  },
  {
      question: "Which object is the top-level object in a browser environment?",
      answers: [
          { text: "Document", correct: false },
          { text: "Window", correct: true },
          { text: "Console", correct: false },
          { text: "Navigator", correct: false }
      ]
  },
  {
      question: "What is the correct syntax for referring to an external script called `app.js`?",
      answers: [
          { text: "<script href='app.js'>", correct: false },
          { text: "<script source='app.js'>", correct: false },
          { text: "<script src='app.js'>", correct: true },
          { text: "<script link='app.js'>", correct: false }
      ]
  }
];