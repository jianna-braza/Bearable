import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskManager(props) {
  return (
    <div>
      <header>
        <h1>Psycare</h1>
        <div className='d-flex column'>
          <button type="button" className="btn btn-outline-primary"><Link to='/homepage'>Home Page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/achievements'>Achievements page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/taskpage'>Task page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/spotify'>Spotify Page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/stats'>Stats Page</Link></button>
        </div>
      </header>
      <main>
        <div className='d-flex row'>
          <section className='col-3'>
          <button type="button" className="btn btn-outline-dark">List View</button>
          <button type="button" className="btn btn-outline-dark"><Link to='/calendar'>Calendar view</Link></button>
          </section>
          <section className='col-7'>
            <p>hi</p>
          </section>
        </div>
      </main>
    </div>
  )
}