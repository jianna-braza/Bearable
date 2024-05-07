import { Link } from "react-router-dom";
import React from "react";
import './Navbar.css';

export default function Navbar(props) {
  return (
    <div id="navbar">

      <div className="nav-title">
        <h1>Bearable</h1>
      </div>


      <nav>
        <div className="nav-links">
          <a id="first-link" href="/homepage">Home</a>
          <a href="/taskmanager">Task Manager</a>
          <a href="/stats">Achievements</a>
          <a href="/homepage" className="nav-last-link">Resources</a>
        </div>
      </nav>
      






      {/* <div className='d-flex'>
        <h1><strong>Psycare</strong></h1>
          <nav>
            <ul className="menu mb-4 d-flex justify-content-end">
              <li>
                <Link to="/homepage">Home</Link>
              </li>
              <li>
                <Link to="/taskmanager">Task Manager</Link>
              </li>
              <li>
                <Link to="/stats">Achievements</Link>
              </li>
              <li>
                <Link to="/homepage">Resources</Link>
              </li>
            </ul>
          </nav>
      </div> */}


    </div>
    


  )
}