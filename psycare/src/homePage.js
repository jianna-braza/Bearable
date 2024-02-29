import { Link } from 'react-router-dom';
import React, { useState } from 'react';


export default function HomePage(props) {
  let [time, setTime] = useState(300);

  const timerFunction = event => {
    const timer = setInterval(function () {
      setTime(time--);
      if (time === 0) {
        clearInterval(timer);
        console.log("Time's up!");
      }
    }, 1000);
  }

  return (
    <div>
      <header>
        <h1>Psycare Home Page</h1>
        <nav>
          <ul class="menu">
            <li><a>About</a></li>
            <li><a>Works</a></li>
            <li>
              <a>Skills</a>
              <ul class="submenu">
                <li><a>React</a></li>
                <li><a>Svelte</a></li>
                <li><a>VueJs</a></li>
              </ul>
            </li>
            <li><a>Blogs</a></li>
            <li><a>Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>

        <div className="d-flex row" >
          <section className='col'>
            <h2>current task:</h2>
            <h3>Pay Good to Go bill</h3>
            <button type="button" className="myButton">Mark as done</button>
          </section>
          <section className='col'>
            <div className='d-flex column justify-content-end'>
              <button type="button" className="myButton" onClick={timerFunction}>Pomodoro timer</button>
              <button type="button" className="myButton">Short break</button>
              <button type="button" className="myButton">Long break</button>
            </div>
            <div className='d-flex column justify-content-end'>
              <div className='flex-row'>
                <h2>{time}</h2>
                <button type="button" className="myButton">Pause</button>
                <button type="button" className="myButton">Restart</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}