import React from 'react';
import { Link } from 'react-router-dom';

export default function Calendar(props) {
  return (
    <div>
      <header>
        <h1>Psycare calendar view</h1>
        <nav>
          <ul class="menu">
            <li><Link to='/homepage'>Home</Link></li>
            <li><Link to='/taskmanager'>Task Manager</Link></li>
            <li><Link to='/spotify'>Spotify Page</Link></li>
            <li><Link to='/stats'>Stats Page</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className='d-flex row'>
          <section className='col-3'>
            <div className='row'>
              <button type="button" className="btn btn-outline-dark"><Link to='/taskmanager'>Board view</Link></button>
              <button type="button" className="btn btn-outline-dark">Calendar view</button>
            </div>
          </section>
          <section className='col-7'>
            <p>hi</p>
          </section>
        </div>
      </main>
    </div>
  );
}