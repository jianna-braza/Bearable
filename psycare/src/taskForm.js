import {getDatabase, ref, push} from 'firebase/database';
import React, { useState} from 'react';

export default function TaskForm(props) {
  const [dropTag, setDropTag] = useState("What kind of task is this?");

const handleChange = event => {
  let tag = event.target.textContent;
  setDropTag(tag);
}

  const db = getDatabase();
const submit = (event) => {
  const task = {name: 'testing'};
  push(ref(db, 'taskList/', task))
}

  return (
    <div className='form-creation'>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            {dropTag}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li key='school work'><button className="dropdown-item" onClick={handleChange} >School work</button></li>
            <li key='chores'><button className="dropdown-item" onClick={handleChange} >Chores</button></li>
            <li key='daily'><button className="dropdown-item" onClick={handleChange} >Daily task</button></li>
          </ul>
        </div>
        <form>
          <label htmlFor="task_input">Task name:</label>
          <input id="task_input" required="required" />
          <label htmlFor="desc_input">Description:</label>
          <input id="desc_input" />
          <label htmlFor="food">Want to add a timer to help stay on track?</label>
          <input type="checkbox" id="timer" />
          <button type="button" onClick={submit}>Submit</button>
        </form>
      </div>
  )
}