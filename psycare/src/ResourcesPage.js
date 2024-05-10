import React, { useState, useEffect } from "react";
import Navbar from './Navbar.js';

export default function ResourcesPage(props) {
  // const myQuestions = [
  //   {
  //     question: "Which skill are you most interested in improving right now?",
  //     answers: {
  //       a: "Time management and focus",
  //       b: "Organization and planning",
  //       c: "Reflection and self-awareness",
  //       d: "Task completion and productivity"
  //     }
  //   },
  //   {
  //     question: "How would you like to organize your day?",
  //     answers: {
  //       a: "By breaking it into manageable chunks of time",
  //       b: "By allocating specific time slots for different activities",
  //       c: "By journaling about my experiences and thoughts throughout the day",
  //       d: "By creating a detailed to-do list"
  //     }
  //   },
  //   {
  //     question: "What motivates you to stay productive?",
  //     answers: {
  //       a: "The sense of accomplishment after completing short bursts of work",
  //       b: "Sticking to a preetermined schedule and timeline",
  //       c: "Reflecting on my progress and areas for improvement",
  //       d: "Checking off tasks from my to-do list as I complete them"
  //     }
  //   }
  // ];
  // const quizContainer = document.getElementById('quiz');
  // const resultsContainer = document.getElementById('results');
  // const submitButton = document.getElementById('submit');

  // window.onload = function () {
  //   buildQuiz();

  //   function buildQuiz() {
  //     // variable to store the HTML output
  //     const output = [];

  //     // for each question...
  //     myQuestions.forEach(
  //       (currentQuestion, questionNumber) => {

  //         // variable to store the list of possible answers
  //         const answers = [];

  //         // and for each available answer...
  //         for (let letter in currentQuestion.answers) {

  //           // ...add an HTML radio button
  //           answers.push(
  //             `<label>
  //             <input type="radio" name="question${questionNumber}" value="${letter}">
  //             ${letter} :
  //             ${currentQuestion.answers[letter]}
  //           </label>`
  //           );
  //         }

  //         // add this question and its answers to the output
  //         output.push(
  //           `<div class="question"> ${currentQuestion.question} </div>
  //         <div class="answers"> ${answers.join('')} </div>`
  //         );
  //       }
  //     );

  //     // finally combine our output list into one string of HTML and put it on the page
  //     quizContainer.innerHTML = output.join('');
  //   }
  // }

  // function showResults() {

  //   // gather answer containers from our quiz
  //   const answerContainers = quizContainer.querySelectorAll('.answers');

  //   // keep track of user's answers
  //   // let numCorrect = 0;
  //   let userAnswers = [];

  //   // for each question...
  //   myQuestions.forEach((currentQuestion, questionNumber) => {

  //     // find selected answer
  //     const answerContainer = answerContainers[questionNumber];
  //     const selector = `input[name=question${questionNumber}]:checked`;
  //     const userAnswer = (answerContainer.querySelector(selector) || {}).value;

  //     userAnswers.push(userAnswer);
  //   });

  //   // show number of correct answers out of total
  //   //resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  //   resultsContainer.innerHTML = `${userAnswers}`;
  // }

  // // on submit, show results
  // //submitButton.addEventListener('click', showResults);
  // window.addEventListener("DOMContentLoaded", (event) => {
  //   submitButton.addEventListener('click', showResults);
  // });

  //########################################################


  var myQuestions = [
    {
      question: "What is 10/2?",
      answers: {
        a: '3',
        b: '5',
        c: '115'
      },
      correctAnswer: 'b'
    },
    {
      question: "What is 30/3?",
      answers: {
        a: '3',
        b: '5',
        c: '10'
      },
      correctAnswer: 'c'
    }
  ];
  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');

  function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
      // we'll need a place to store the output and the answer choices
      var output = [];
      var answers;

      // for each question...
      for (var i = 0; i < questions.length; i++) {

        // first reset the list of answers
        answers = [];

        // for each available answer to this question...
        for (let letter in questions[i].answers) {

          // ...add an html radio button
          answers.push(
            '<label>'
            + '<input type="radio" name="question' + i + '" value="' + letter + '">'
            + letter + ': '
            + questions[i].answers[letter]
            + '</label>'
          );
        }

        // add this question and its answers to the output
        output.push(
          '<div class="question">' + questions[i].question + '</div>'
          + '<div class="answers">' + answers.join('') + '</div>'
        );
      }

      // finally combine our output list into one string of html and put it on the page
      quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {

      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers');

      // keep track of user's answers
      var userAnswer = '';
      var numCorrect = 0;

      // for each question...
      for (var i = 0; i < questions.length; i++) {

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

        // if answer is correct
        if (userAnswer === questions[i].correctAnswer) {
          // add to the number of correct answers
          numCorrect++;

          // color the answers green
          answerContainers[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
          // color the answers red
          answerContainers[i].style.color = 'red';
        }
      }

      // show number of correct answers out of total
      resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show the questions
    showQuestions(questions, quizContainer);

    // when user clicks submit, show results
    submitButton.onclick = function () {
      showResults(questions, quizContainer, resultsContainer);
    }
  }

  generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);


  return (
    <div>
      <header>
        <Navbar />
      </header>
      <body>
        <div id="quiz"></div>
        <button id="submit">Get Results</button>
        <div id="results"></div>
      </body>
    </div>
  )


}