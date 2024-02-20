import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskPage(props) {
  return (
    <div>
      <main>
        <h2>Task Page</h2>
        <Link to='/achievementspage'>achievements page</Link>
        <Link to='/homepage'>home page</Link>
      </main>
    </div>
  )
}