import React, { useState, useEffect } from "react";
import SpotifyPage from "./spotify.js";
import Navbar from './Navbar.js';
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

          {/* spotify section */}
          <div className="above-spotify-extra-space"></div>
          <div className="spotify-container">
            <div className="spotify-extra-space"></div>
            <div>
              <SpotifyPage />
            </div>
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