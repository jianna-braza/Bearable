import React from 'react';
import { Link } from 'react-router-dom';

export default function AchievementsPage(props) {
  return (
    <div>
      <main>
        <h2>Achievements page</h2>
        <Link to='/homepage'>home page</Link>
        <Link to='/taskpage'>task page</Link>
      </main>
    </div>
  )
}