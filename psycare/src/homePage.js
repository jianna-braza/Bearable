import { Link } from 'react-router-dom';
import React, { useState } from 'react';


export default function HomePage(props) {
  let [time, setTime] = useState(300);
  let [pauseBool, setPauseBool] = useState(false);

  const timerFunction = event => {
    const timer = setInterval(function () {
      setTime(time--);
      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  function pause() {
    clearInterval(timerFunction);
  }


  return (
    <div>
      <header>
        <h1>Psycare Home Page</h1>
        <nav>
          <ul className="menu mb-3">
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
              <p className='mb-2'>1 out of two tasks done</p>
              <h2>Current Task:</h2>
              <h3 className='mb-2'>Pay Good to Go bill</h3>
              <button type="button" className="myButton">Mark as done</button>
              <img src='https://github.com/jianna-braza/Psycare/blob/main/psycare/img/bear.png?raw=true' alt='bear' className='bear' />
            </div>

          </section>
          <section className='col-8'>
            <div className='d-flex column justify-content-around mb-5'>
              <button type="button" className="myButton" onClick={timerFunction}>Pomodoro timer</button>
              <button type="button" className="myButton">Short break</button>
              <button type="button" className="myButton">Long break</button>
            </div>
            <div className='d-flex justify-content-around align-items-center'>
              <div>
                <div className='justify-content-start'>
                  <h2 className='timer mb-5'>{'' + Math.trunc(time / 60) + ':' + ((time % 60 == 0) ? '00' : time % 60)}</h2>
                </div>

                <button type="button" className="myButton" onClick={pause}>Pause</button>
                <button type="button" className="myButton">Restart</button>

              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}