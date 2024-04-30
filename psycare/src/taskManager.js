import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import db from "./firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

export default function TaskManager(props) {
  let [testTasks, setTestTasks] = useState([ //list of objects with the date and an array of task objects
    { day: "Fri, 19", tasks: [{ name: 'Reading Response 7', tag: 'School' }, { name: 'Pay Good to Go Bill', tag: 'Personal' }] },
    { day: "Sat, 20", tasks: [{ name: 'Summary 7', tag: 'School' }, { name: 'Strategy Document', tag: 'School' }] },
    { day: "Sun, 21", tasks: [{ name: 'Studio 6', tag: 'School' }, { name: 'Submit Timesheet', tag: 'Work' }, { name: 'Dance Practice', tag: 'Dance' }] }
  ])
  const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [dropTag, setDropTag] = useState("What kind of task is this?");
  let [tasks, setTasks] = useState();
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null;
  });

  //will use to set task manager to current date
  const date = new Date();
  let month = date.getMonth();
  const day = date.getDay();
  const dateNum = date.getDate()
  let currentDateString = '' + MONTHS[month] + ', ' + WEEKDAYS[day] + ' ' + dateNum;

  let [testMonth, testDay, testWeek] = [3, 19, 5];
  let testDate = '' + MONTHS[testMonth] + ', ' + WEEKDAYS[testWeek] + ' ' + testDay;


  //not working? data=undefined
  //getting quote to test if can connect to firebase
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const docRef = doc(db, 'quotes', 'loadScreenQuotes');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists() && data.hasOwnProperty(1)) {
          setTasks(data[1]);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
    console.log(tasks)
  }, []);




  const handleChange = event => {
    let tag = event.target.textContent;
    setDropTag(tag);
  }


  //not working? error: cannot read properties of null (reading 'indexOf')
  // async function increment() {
  //   const docRef = doc(db, 'userData', userId);
  //   const docSnap = await getDoc(docRef);
  //   const data = docSnap.data();

  //   // increment daily task total
  //   if (docSnap.exists()) {
  //     let currTaskTotal = 0;
  //     if (data && data.hasOwnProperty('DailyTaskTotal')) {
  //       currTaskTotal = data.DailyTaskTotal;
  //     }
  //     await setDoc(docRef, { DailyTaskTotal: currTaskTotal + 1 }, { merge: true });
  //   }
  // }

  const addTask = async event => {

    //increment();

    let newName = document.getElementById('task_input').value;
    let tempTasks = testTasks;
    for (let i = 0; i < testTasks.length; i++) {
      if (testTasks[i].day === 'Sat, 20') {
        tempTasks[i].tasks.push({ name: newName, tag: dropTag })
      }
    }
    setTestTasks(tempTasks);
    setDropTag("What kind of task is this?");
  }



  const cards = testTasks.map(date => {
    let dayTasks = date['tasks'].map(task => {
      if (task.tag === 'School') {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-success">{task.tag}</a>
            </div>
          </div>
        )
      } else if (task.tag === 'Personal') {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-warning">{task.tag}</a>
            </div>
          </div>
        )
      } else if (task.tag === 'Work') {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-info">{task.tag}</a>
            </div>
          </div>
        )
      } else {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-primary">{task.tag}</a>
            </div>
          </div>
        )
      }
    })

    return (
      <div className='column' key={date.day}>
        <button type="button" className="btn btn-dark">{date.day}</button>


        <button type="button" className="btn btn-primary" data-toggle="modal" data-backdrop="false" data-target="#exampleModal">
          Add task
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create new task</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex row">
                <label htmlFor="task_input">Task name:</label>
                <input id="task_input" />
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    {dropTag}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li key='school work'><button className="dropdown-item" onClick={handleChange} >School</button></li>
                    <li key='chores'><button className="dropdown-item" onClick={handleChange} >Personal</button></li>
                    <li key='daily'><button className="dropdown-item" onClick={handleChange} >Work</button></li>
                  </ul>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addTask}>Save changes</button>
              </div>
            </div>
          </div>
        </div>



        {dayTasks}
      </div>
    )
  })




  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div className='d-flex row'>
          <section className='col-3'>
            <div className='row'>
              <button type="button" className="myButton">Board View</button>
              <button type="button" className="myButton"><Link to='/calendar'>Calendar view</Link></button>
            </div>
          </section>
          <section className='col-9'>

            <div className="d-flex justify-content-around">
              <h2>{MONTHS[month]} 2024 &lt; &gt;</h2>
            </div>
            <div className="d-flex justify-content-around">
              {cards}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}