import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(props) {

function handleChange() {
  console.log('hoi');
}

function submit() {
  console.log('submitted!');
}

  return (
    <div>
      <header>
        <h1>home page</h1>
        <Link to='/achievements'>achievements page</Link>
        <Link to='/taskpage'>task page</Link>
      </header>
      <main>
      <div className='form-creation'>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            What kind of task is this?
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li key='school work'><button className="dropdown-item" onClick={handleChange} >School work</button></li>
            <li key='chores'><button className="dropdown-item" onClick={handleChange} >Chores</button></li>
            <li key='daily'><button className="dropdown-item" onClick={handleChange} >Daily task</button></li>
          </ul>
        </div>
        <form>
          <label htmlFor="task_input">Task name:</label>
          <input id="task_input" required="required" onChange={handleChange} />
          <label htmlFor="desc_input">Description:</label>
          <input id="desc_input" onChange={handleChange} />
          <label htmlFor="food">Want to add a timer to help stay on track?</label>
          <input type="checkbox" id="timer" onChange={handleChange} />
          <button type="button" onClick={submit}>Submit</button>
        </form>
      </div>
      </main>
    </div>
  )
}