import React, { useState, useEffect } from "react";
import Navbar from './Navbar.js';

export default function ResourcesPage(props) {


  // Functions
  function buildQuiz() {

    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for (let letter in currentQuestion.answers) {

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );


    let quizContainer = document.getElementById('quiz');
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');


  }

  function showResults() {

    console.log('hi');

    let resultsContainer = document.getElementById('results');
    let quizContainer = document.getElementById('quiz');
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];



  return (
    <div>
      <header>
        <Navbar />
      </header>
      <body>
        <button id="start" onClick={buildQuiz} >Start</button>
        <div id="quiz"></div>
        <button id="submit" onClick={showResults} >Submit Quiz</button>
        <div id="results"></div>
      </body>
    </div>
  )


}