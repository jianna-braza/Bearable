import { Link } from "react-router-dom";
import React, { useState } from "react";
import SpotifyPage from "./spotify.js";
import { signInWithGoogle } from "./firebase.js";
import Navbar from './Navbar.js';
import CurrentTask from './CurrentTask.js';

export default function HomePage(props) {
  let [taskNum, setTaskNum] = useState(1);
  let [taskName, setTaskName] = useState("Pay Good to Go bill");
  let [pauseBool, setPauseBool] = useState(true);
  let [pauseText, setPauseText] = useState("Start");

  const [timer, setTimer] = useState(1500);
  const [timeInterval, setTimeInterval] = useState(null);
  const [initialTime, setInitialTime] = useState(1500);

  // Function to start the timer
  const startTimer = () => {
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(
      setInterval(() => {
        // Update the timer by incrementing the previous value by 1
        setTimer((prev) => prev - 1);
      }, 1000)
    );
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (pauseBool) {
      //user is pausing the timer
      setPauseText("Start");
      clearInterval(timeInterval);
      setPauseBool(false);
    } else {
      //user is starting the timer
      setPauseText("Pause");
      startTimer();
      setPauseBool(true);
    }
    // Clear the interval to stop the timer from updating
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTimer(initialTime);
    // Clear the interval to stop the timer
    clearInterval(timeInterval);
  };

  const readyTimer = (event) => {
    if (event.target.textContent === "Short break") {
      clearInterval(timeInterval);
      setInitialTime(300);
      setTimer(300);
    } else if (event.target.textContent === "Long break") {
      clearInterval(timeInterval);
      setInitialTime(900);
      setTimer(900);
    } else {
      clearInterval(timeInterval);
      setInitialTime(1500);
      setTimer(1500);
    }
    startTimer();
  };



  return (
    <div>
      <header>
        <h1>Psycare Home Page</h1>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>

        {/*Authentication*/}
        <section>
          <button className="myButton" onClick={signInWithGoogle}>
            Sign In With Google
          </button>
        </section>

        <div className="d-flex row">

          <CurrentTask taskName={taskName} taskNum={taskNum} setTaskName={setTaskName} setTaskNum={setTaskNum} />

          <section className="col-9">
            <h2>Press a button to start your timer!</h2>
            <div className="d-flex column justify-content-around mb-5 mt-3">
              <button type="button" className="myButton" onClick={readyTimer}>
                Task Timer (25 mins)
              </button>
              <button type="button" className="myButton" onClick={readyTimer}>
                Short break (5 mins)
              </button>
              <button type="button" className="myButton" onClick={readyTimer}>
                Long break (15 mins)
              </button>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <div>
                <div className="justify-content-start">
                  <h2 className="timer mb-5">
                    {"" +
                      Math.trunc(timer / 60) +
                      ":" +
                      (timer % 60 <= 9 ? "0" + (timer % 60) : timer % 60)}
                  </h2>
                </div>

                <button type="button" className="myButton" onClick={pauseTimer}>
                  {pauseText}
                </button>
                <button type="button" className="myButton" onClick={resetTimer}>
                  Restart
                </button>
                <div className="d-flex justify-content-center mt-5">
                  <img
                    src="https://github.com/jianna-braza/Psycare/blob/main/psycare/img/woolly-barrel%201.png?raw=true"
                    alt="barrel"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* spotify section */}
        <section>
          <SpotifyPage />
        </section>
        <img
          src="https://github.com/jianna-braza/Psycare/blob/main/psycare/img/bear.png?raw=true"
          alt="bear"
          className="bear flex"
        />
      </main>
    </div>
  );
}
