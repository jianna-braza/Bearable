import React from "react";
import SpotifyPage from "./spotify.js";
import { signInWithGoogle } from "./firebase.js";
import Navbar from './Navbar.js';
import CurrentTask from './CurrentTask.js';
import Timers from './Timers.js';

export default function HomePage(props) {

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

          <CurrentTask />

          <Timers />



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
