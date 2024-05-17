import React from "react";
import Navbar from '../Navbar.js';
import CurrentTask from './CurrentTask.js';
import Timers from './Timers.js';

export default function HomePage(props) {

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="d-flex row">
          <CurrentTask />
          <Timers />
        </div>
        <img
          src="https://github.com/jianna-braza/Psycare/blob/main/psycare/img/bear.png?raw=true"
          alt="bear"
          className="bear flex"
        />
      </main>
    </div>
  );
}