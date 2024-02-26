import React from 'react';
import { Link } from 'react-router-dom';

export default function SpotifyPage(props) {
  return (
    <div>
      <main>
        <h2>Spotify Page</h2>
        <Link to='/homepage'>home page</Link>
        <Link to='/taskpage'>task page</Link>
      </main>
    </div>
  )
}