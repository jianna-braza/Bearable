import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskPage(props) {
  return (
    <div>
      <main>
        <h2>Task Page</h2>
       <nav>
          <ul class="menu">
            <li><Link to='/taskmanager'>Task Manager</Link></li>
            <li><Link to='/spotify'>Spotify Page</Link></li>
            <li><Link to='/stats'>Stats Page</Link></li>
          </ul>
        </nav>
      </main>
    </div>
  )
}