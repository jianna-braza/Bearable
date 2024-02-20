import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(props) {
  return (
    <div>
      <main>
        <h1>home page</h1>
        <Link to='/achievements'>achievements page</Link>
        <Link to='/taskpage'>task page</Link>
      </main>
    </div>
  )
}