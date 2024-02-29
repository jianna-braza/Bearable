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
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
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