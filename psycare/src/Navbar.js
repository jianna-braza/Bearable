import { Link } from "react-router-dom";
import React from "react";
import './Navbar.css';

export default function Navbar(props) {
  return (
    <div id="navbar">
      <div className='d-flex'>
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
      </div>
    </div>
    


  )
}