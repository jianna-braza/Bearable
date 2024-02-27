import { Link } from 'react-router-dom';
import TaskForm from './taskForm.js';
import React, { useState} from 'react';

export default function HomePage(props) {
  const [taskList, setTaskList] = useState([]);

  return (
    <div>
      <header>
        <h1>home page</h1>
        <Link to='/achievements'>achievements page</Link>
        <Link to='/taskpage'>task page</Link>
        <Link to='/spotify'>Spotify Page</Link>
        <Link to='/stats'>Stats Page</Link>
      </header>
      <main>
      <TaskForm />
      <p>{taskList.length}</p>
      </main>
    </div>
  )
}