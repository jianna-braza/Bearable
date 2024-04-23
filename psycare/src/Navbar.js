import { Link } from "react-router-dom";
import React from "react";

export default function Navbar(props) {
  return (
    <div className='d-flex' >
      <h1><strong>Psycare</strong></h1>
      <nav>
        <ul className="menu mb-3 d-flex justify-content-end">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/taskmanager">Task Manager</Link>
          </li>
          <li>
            <Link to="/stats">Achievements</Link>
          </li>
        </ul>
      </nav>

    </div>


  )
}