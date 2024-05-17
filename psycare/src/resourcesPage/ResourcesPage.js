import React, { useState, useEffect } from "react";
import Navbar from "../Navbar.js";
import timer from "../assets/timer.png";
import calendar from "../assets/calendar.png";
import reflections from "../assets/reflections.png";
import tasklist from "../assets/task_list.png";
import { reload } from "firebase/auth";

export default function ResourcesPage(props) {
  function buildQuiz() {
    document.getElementById("submit").style.visibility = "visible";

    // variable to store the HTML output
    const output = [];
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];
      // and for each available answer...
      for (let letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label className="p-2">
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }
      // add this question and its answers to the output
      output.push(
        `<div class="question m-2 d-flex flex-column"><strong>${currentQuestion.question
        }</strong></div>
          <div class="answers m-2 d-flex flex-column"> ${answers.join("")} </div>`
      );
    });
    let quizContainer = document.getElementById("quiz");
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function quizResults(userAnswers) {
    let maxVal = 0;
    let maxIndex = 0;
    let reps = [0, 0, 0, 0];
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === "a") {
        reps[0]++;
        if (reps[0] > maxVal) {
          maxVal = reps[0];
          maxIndex = 0;
        }
      } else if (userAnswers[i] === "b") {
        reps[1]++;
        if (reps[1] > maxVal) {
          maxVal = reps[1];
          maxIndex = 1;
        }
      } else if (userAnswers[i] === "c") {
        reps[2]++;
        if (reps[2] > maxVal) {
          maxVal = reps[2];
          maxIndex = 2;
        }
      } else {
        reps[3]++;
        if (reps[3] > maxVal) {
          maxVal = reps[3];
          maxIndex = 3;
        }
      }
    }

    return maxIndex;
  }

  function showResults() {
    let resultsContainer = document.getElementById("results");
    let quizContainer = document.getElementById("quiz");
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
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
        a: "Time management and focus",
        b: "Organization and planning",
        c: "Reflection and self-awareness",
        d: "Task completion and productivity",
      },
      correctAnswer: "b",
    },
    {
      question: "How would you like to organize your day?",
      answers: {
        a: "By breaking it into manageable chunks of time",
        b: "By allocating specific time slots for different activities",
        c: "By journaling about my experiences and thoughts throughout the day",
        d: "By creating a detailed to-do list",
      },
      correctAnswer: "c",
    },
    {
      question: "What motivates you to stay productive?",
      answers: {
        a: "The sense of accomplishment after completing short bursts of work",
        b: "Sticking to a predetermined schedule and timeline",
        c: "Reflecting on my progress and areas for improvement",
        d: "Checking off tasks from my to-do list as I complete them",
      },
      correctAnswer: "c",
    },
  ];

  let myResults = [
    {
      tool: "Pomodoro Timers",
      img: timer,
      des:
        "The Pomodoro Technique is a time management method that involves breaking " +
        "work into intervals, traditionally 25 minutes in length, separated by short breaks. " +
        "After completing four Pomodoro sessions, you take a longer break.",
    },
    {
      tool: "Task Lists",
      img: tasklist,
      des:
        "Task Lists are useful for short term and long term planning. " +
        "They give you a place to write things down, so you don't have to stress about remembering them. " +
        "As a result, they are perfect for organization and memory building.",
    },
    {
      tool: "Calendars",
      img: calendar,
      des:
        "Calendars are useful tools that allow you to plan out and organize " +
        "your events, tasks, and projects. " +
        "This can help build organization skills, time management, and combat working memory problems .",
    },
    {
      tool: "Reflections",
      img: reflections,
      des:
        "Relfections or self reflection is a technique where you take the time to think deeply about your behaviors, motivations, thoughts, and more." +
        " This way of introspectively thinking can help you better understand yourself from your strengths, weaknesses," +
        " and motivations and as a result help you manage your symptoms through this understanding and self awareness.",
    },
  ];

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <h2>Not sure where to start?</h2>
        <p>
          Learn more about the right tools for you! Take this quiz to learn more
          about your learning style to unlock your Bearable's full potential!
        </p>
        <button type="button" className="btn btn-dark w-25 m-3" id="start" onClick={buildQuiz}>Start</button>
        <div id="quiz"></div>
        <button type="button" className="btn btn-dark w-25 m-3 submit" id="submit" onClick={showResults}>Submit Quiz</button>
        <div id="results"></div>
      </main>
    </div>
  );
}
