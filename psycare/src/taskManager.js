import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import db from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

export default function TaskManager(props) {

  // achievement tracking code

  // retrieve userId
  const [UserID, setUserID] = useState(() => {
    return localStorage.getItem('userId') || null;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = getAuth().currentUser;
        if (currentUser !== null) {
          console.log("User ID:", currentUser.uid);
          setUserID(currentUser.uid);
          localStorage.setItem('userId', currentUser.uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // retrieve user quest 2
  const [quest2, setQuest2] = useState(0);

  useEffect(() => {
    if (UserID) {
      const fetchQuest2 = async () => {
        try {
          const docRef = doc(db, 'userData', UserID);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest2')) {
            setQuest2(data.Quest2);
          }
        } catch (error) {
          console.error("Error fetching quest 2:", error);
        }
      };
      fetchQuest2();
    }
  }, [UserID]);

  // retrieve quest 2 stop
  const [quest2Stop, setQuest2Stop] = useState(0);

  useEffect(() => {
    if (UserID) {
      const fetchQuest2Stop = async () => {
        try {
          const docRef = doc(db, 'userData', UserID);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest2Stop')) {
            setQuest2Stop(data.Quest2Stop);
          }
        } catch (error) {
          console.error("Error fetching quest 2 stop:", error);
        }
      };
      fetchQuest2Stop();
    }
  }, [UserID]);

  // increment lifetime quests
  const LifetimeQuests = async (UserID, questNumStop) => {
    const docRef = doc(db, 'userData', UserID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (questNumStop === 0) {
      let currentQuests = 0;
      if (data && data.hasOwnProperty('LifetimeQuests')) {
        currentQuests = data.LifetimeQuests;
      }
      await setDoc(docRef, { LifetimeQuests: currentQuests + 1 }, { merge: true });
    }
  }

  // complete "complete add task to to-do list" quest
  const AddTaskQuest = async (UserID, quest2, quest2Stop) => {
    console.log(quest2);

    if (quest2 === "Add a task to your to-do list") {
      const docRef = doc(db, 'userData', UserID);
      await updateDoc(docRef, {
        Quest2Done: 1
      });
      LifetimeQuests(UserID, quest2Stop);
      await updateDoc(docRef, {
        Quest2Stop: 1
      });
    }
  }






  const date = new Date();

  let [month, setMonth] = useState(date.getMonth());
  let [weekday, setWeekday] = useState(date.getDay());
  let [dateNum, setDateNum] = useState(date.getDate());
  const MONTHMAX = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function addDate(num) {
    let tempMonth = month;
    let tempWeekday = weekday + num;
    let tempDateNum = dateNum + num;
    if (dateNum > MONTHMAX[month]) {
      tempMonth++;
      tempDateNum = dateNum % MONTHMAX[month];
    }
    if (num >= 7) {
      tempWeekday = weekday % 7;
    }
    return ('' + MONTHS[tempMonth] + ', ' + WEEKDAYS[tempWeekday] + ' ' + tempDateNum);
  }

  let [testTasks, setTestTasks] = useState([ //list of objects with the date and an array of task objects
    { day: addDate(0), tasks: [{ name: 'Reading Response 7', tag: 'School' }, { name: 'Pay Good to Go Bill', tag: 'Personal' }] },
    { day: addDate(1), tasks: [{ name: 'Summary 7', tag: 'School' }, { name: 'Strategy Document', tag: 'School' }] },
    { day: addDate(2), tasks: [{ name: 'Studio 6', tag: 'School' }, { name: 'Submit Timesheet', tag: 'Work' }, { name: 'Dance Practice', tag: 'Dance' }] }
  ])
  const [dropTag, setDropTag] = useState("What kind of task is this?");
  let [tasks, setTasks] = useState();



  // useEffect(() => {
  //   const fetchTask = async () => {
  //     try {
  //       const docRef = doc(db, 'testTasks', 'April, Fri 19');
  //       const docSnap = await getDoc(docRef);
  //       const data = docSnap.data();
  //       if (docSnap.exists()) {
  //         setTasks(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching quote:", error);
  //     }
  //   };
  //   fetchTask();
  //   console.log(tasks);
  // }, []);



// updates drop down tag in add task modal
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
    let taskDate = document.getElementById('date_input').value.split('-');

    for (let i = 0; i < testTasks.length; i++) {
      //right now only set to add tasks on the second day
      if (testTasks[i].day .includes(Number(taskDate[2]))) {
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
          <div className="card mb-2" key={task.name}>
            <div className="card-header card-name">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-success school-button">{task.tag}</a>
            </div>
          </div>
        )
      } else if (task.tag === 'Personal') {
        return (
          <div className="card mb-2" key={task.name}>
            <div className="card-header card-name">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-warning personal-button">{task.tag}</a>
            </div>
          </div>
        )
      } else if (task.tag === 'Work') {
        return (
          <div className="card mb-2" key={task.name}>
            <div className="card-header card-name">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-info work-button">{task.tag}</a>
            </div>
          </div>
        )
      } else {
        return (
          <div className="card mb-2" key={task.name}>
            <div className="card-header card-name">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-primary other-button">{task.tag}</a>
            </div>
          </div>
        )
      }
    })

    return (
      <div className='column' key={date.day}>
        <div className="d-flex row">
          <button type="button" className="btn btn-dark date-button">{date.day}</button>
          <button type="button" className="btn btn-primary add-task-button" data-toggle="modal" data-backdrop="false" data-target="#exampleModal" >
            Add task +
          </button>
        </div>
        

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
                <label htmlFor="date_input">Select end date for this task:</label>
                <input type='date' id="date_input" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary cancel-button" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary create-task-button" data-dismiss="modal" onClick={() => { addTask(); AddTaskQuest(UserID, quest2, quest2Stop); }}>Add Task</button>
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
          <section className='col-2 pt-5 view-section'>
            <div className='row'>
              <button type="button" className="myButton view-button mb-2">Board View</button>
              <button type="button" className="myButton view-button"><Link to='/calendar'>Calendar view</Link></button>
            </div>
          </section>
          <section className='col-10 pt-4 task-section'>

            <div className="d-flex justify-content-around mb-3">
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