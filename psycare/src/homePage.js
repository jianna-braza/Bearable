import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SpotifyPage from './spotify.js';


export default function HomePage(props) {
  let [taskNum, setTaskNum] = useState(1);
  let [taskName, setTaskName] = useState("Pay Good to Go bill");
  let [pauseBool, setPauseBool] = useState(true);
  let [pauseText, setPauseText] = useState('Start');




  const [timer, setTimer] = useState(1500);
  const [timeInterval, setTimeInterval] = useState(null);
  const [initialTime, setInitialTime] = useState(1500);

  // Function to start the timer
  const startTimer = () => {
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(setInterval(() => {
      // Update the timer by incrementing the previous value by 1
      setTimer((prev) => prev - 1);
    }, 1000));
  }

  // Function to pause the timer
  const pauseTimer = () => {
    if (pauseBool) { //user is pausing the timer
      setPauseText('Start');
      clearInterval(timeInterval);
      setPauseBool(false);
    } else { //user is starting the timer
      setPauseText('Pause');
      startTimer();
      setPauseBool(true);
    }
    // Clear the interval to stop the timer from updating

  }

  // Function to reset the timer
  const resetTimer = () => {
    setTimer(initialTime);
    // Clear the interval to stop the timer
    clearInterval(timeInterval);
  }


  const readyTimer = (event) => {
    if (event.target.textContent === 'Short break') {
      clearInterval(timeInterval);
      setInitialTime(300);
      setTimer(300);
    } else if (event.target.textContent === 'Long break') {
      clearInterval(timeInterval);
      setInitialTime(900)
      setTimer(900);
    } else {
      clearInterval(timeInterval);
      setInitialTime(1500)
      setTimer(1500);
    }
    startTimer();
  }



  function update() {
    setTaskNum(2);
    setTaskName("Reading Response 7");
  }


  return (
    <div>
      <header>
        <h1>Psycare Home Page</h1>
        <nav>
          <ul className="menu mb-3 d-flex justify-content-end">
            <li><Link to='/homepage'>Home</Link></li>
            <li><Link to='/taskmanager'>Task Manager</Link></li>
            <li><Link to='/spotify'>Spotify Page</Link></li>
            <li><Link to='/stats'>Stats Page</Link></li>
          </ul>
        </nav>
      </header>
      <main>

        <div className="d-flex row" >
          <section className='col-3'>
            <div className='d-flex row'>
              <p className='mb-2'>{'task ' + taskNum + ' out of 2'}</p>
              <h2>Current Task:</h2>
              <h3 className='mb-2'>{taskName}</h3>
              <button type="button" className="myButton" data-toggle="modal" data-backdrop="false" data-target="#exampleModal" onClick={update}>Mark as done</button>


              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Great job completing your task!</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body d-flex row">
                      <p>That's one less thing on the docket! Feel free to take a small break before you try jumping straight into your next task. You've got it &#40;:</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>




              <img src='https://github.com/jianna-braza/Psycare/blob/main/psycare/img/bear.png?raw=true' alt='bear' className='bear' />
            </div>

          </section>
          <section className='col-9'>
            <div className='d-flex column justify-content-around mb-5 mt-3'>
              <button type="button" className="myButton" onClick={readyTimer}>Pomodoro timer</button>
              <button type="button" className="myButton" onClick={readyTimer}>Short break</button>
              <button type="button" className="myButton" onClick={readyTimer}>Long break</button>
            </div>
            <div className='d-flex justify-content-around align-items-center'>
              <div>
                <div className='justify-content-start'>
                  <h2 className='timer mb-5'>{'' + Math.trunc(timer / 60) + ':' + ((timer % 60 <= 9) ? ('0' + (timer % 60)) : timer % 60)}</h2>
                </div>

                <button type="button" className="myButton" onClick={pauseTimer}>{pauseText}</button>
                <button type="button" className="myButton" onClick={resetTimer}>Restart</button>
                <div className="d-flex justify-content-center mt-5">
                  <img src='https://github.com/jianna-braza/Psycare/blob/main/psycare/img/woolly-barrel%201.png?raw=true' alt='barrel' />
                </div>


              </div>
            </div>
          </section>
        </div>


        {/* spotify section */}
        <section>
          <SpotifyPage />
        </section>
        
      </main>
    </div>
  )
}