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


  // //THIS WORKS
  // useEffect(() => {
  //   const fetchQuote = async () => {
  //     try {
  //       const docRef = doc(db, 'quotes', 'loadScreenQuotes');
  //       const docSnap = await getDoc(docRef);
  //       const data = docSnap.data();
  //       if (docSnap.exists()) {
  //         setTasks(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching quote:", error);
  //     }
  //   };
  //   fetchQuote();
  // }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const docRef = doc(db, 'testTasks', 'April, Fri 19');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists()) {
          setTasks(data);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchTask();
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

    console.log(tasks);

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
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {addTask(); AddTaskQuest(UserID, quest2, quest2Stop);}}>Save changes</button>
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