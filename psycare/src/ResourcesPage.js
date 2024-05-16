import React, { useState, useEffect } from "react";
import Navbar from './Navbar.js';
import timer from "./assets/timer.png";

export default function ResourcesPage(props) {

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
          `<div class="question"><strong>${currentQuestion.question}</strong></div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
    let quizContainer = document.getElementById('quiz');
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function quizResults(userAnswers) {
    let maxVal = 0;
    let maxIndex = 0;
    let reps = [0, 0, 0, 0];
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === 'a') {
        reps[0]++;
        if (reps[0] > maxVal) {
          maxVal = reps[0];
          maxIndex = 0
        }
      } else if (userAnswers[i] === 'b') {
        reps[1]++;
        if (reps[1] > maxVal) {
          maxVal = reps[1];
          maxIndex = 1
        }
      } else if (userAnswers[i] === 'c') {
        reps[2]++;
        if (reps[2] > maxVal) {
          maxVal = reps[2];
          maxIndex = 2
        }
      } else {
        reps[3]++;
        if (reps[3] > maxVal) {
          maxVal = reps[3];
          maxIndex = 3
        }
      }
    }

    return maxIndex;

  }

  function showResults() {
    let resultsContainer = document.getElementById('results');
    let quizContainer = document.getElementById('quiz');
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's answers
    let userAnswers = [];
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      userAnswers.push(userAnswer);
    });

let quizRes = quizResults(userAnswers);
    //resultsContainer.innerHTML = `${userAnswers}`;
    resultsContainer.innerHTML = `
    <p>Based on your answers, the most helpful tool for you will be... </p>
    <img src=${myResults[quizRes].img} alt="timer" />
    <h3>${myResults[quizRes].tool}</h3>
    <p>${myResults[quizRes].des}</p>
    `;
  }


  var myQuestions = [
    {
      question: "Which skill are you most interested in improving right now?",
      answers: {
        a: 'Time management and focus',
        b: 'Organization and planning',
        c: 'Reflection and self-awareness',
        d: 'Task completion and productivity'
      },
      correctAnswer: 'b'
    },
    {
      question: "How would you like to organize your day?",
      answers: {
        a: 'By breaking it into manageable chunks of time',
        b: 'By allocating specific time slots for different activities',
        c: 'By journaling about my experiences and thoughts throughout the day',
        d: 'By creating a detailed to-do list'
      },
      correctAnswer: 'c'
    },
    {
      question: "What motivates you to stay productive?",
      answers: {
        a: 'The sense of accomplishment after completing short bursts of work',
        b: 'Sticking to a predetermined schedule and timeline',
        c: 'Reflecting on my progress and areas for improvement',
        d: 'Checking off tasks from my to-do list as I complete them'
      },
      correctAnswer: 'c'
    }
  ];

  let myResults = [
    {
      tool: 'Pomodoro Timers',
      img: timer,
      des: "The Pomodoro Technique is a time management method that involves breaking "
      + "work into intervals, traditionally 25 minutes in length, separated by short breaks. "
      + "After completing four Pomodoro sessions, you take a longer break."
    },
    {
      tool: 'Task Lists',
      img: timer,
      des: 'idk'
    },
    {
      tool: 'Calendars',
      img: timer,
      des: 'idk'
    },
    {
      tool: 'Reflections',
      img: timer,
      des: 'idk'
    }
  ];


  return (
    <div>
      <header>
        <Navbar />
      </header>
      <body>
        <h2>Not sure where to start?</h2>
        <p>Learn more about the right tools for you! Take this quiz to learn more about your learning style to unlock your Bearable's full potential!</p>
        <button type="button" className="btn btn-dark w-25" id="start" onClick={buildQuiz} >Start</button>
        <div id="quiz"></div>
        <button type="button" className="btn btn-dark w-25" id="submit" onClick={showResults} >Submit Quiz</button>
        <div id="results"></div>
      </body>
    </div>
  )


}