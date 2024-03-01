import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskManager(props) {
  return (
    <div>
      <header>
        <h1>Psycare Task Manager</h1>
        <nav>
          <ul class="menu">
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
              <button type="button" className="myButton">List View</button>
              <button type="button" className="myButton"><Link to='/calendar'>Calendar view</Link></button>
            </div>
          </section>
          <section className='col-7'>
            <p>hi</p>
          </section>
        </div>
      </main>
    </div>
  )
}