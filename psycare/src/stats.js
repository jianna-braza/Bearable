import React from 'react';
import { Link } from 'react-router-dom';
import "./stats.css";
import frog from "./assets/frog.png";
import streak from "./assets/streak.png";
import checkmark from "./assets/checkmark.png";
import timer from "./assets/timer.png";
import chest from "./assets/chest.png";
import { getDatabase, ref, onValue, set as firebaseSet, push as firebasePush } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from "./firebase.js";
import db from "./firebase.js";
import { addDoc, doc, setDoc, getDoc, collection } from "firebase/firestore";


const stuff = (user) => {
  if (user)
  db.collection('users').doc(user.uid).get().then(doc => {

})

}
function getUID() {

}

// add user to database
const addUser = async (event) => {
  const docRef = await addDoc(collection(db, "userData"), {
    uid: 1,
    LifetimeTasks: 0,
    LifetimePomodoros: 0,
    LifetimeQuests: 0
  })
}

// increment lifetime pomodoros
const lifetimePomodoros = async (event) => {
  // const docRef = doc(db, 'userData', '1RcBD5019iAPiX1o5oPR', 'LifetimePomodoros')
  // const docSnap = await getDoc(docRef);
  // const num = docSnap.data();

  // setDoc(docRef, {lifetimePomodoros: num + 1});
  const docRef = doc(db, 'userData', '1RcBD5019iAPiX1o5oPR');
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
  // Check if the document exists
  if (docSnap.exists()) {
    let currentPomodoros = 0;
    // Check if the document has the field "LifetimePomodoros"
    if (data && data.hasOwnProperty('LifetimePomodoros')) {
      currentPomodoros = data.LifetimePomodoros;
    }
    // Increment the value of "LifetimePomodoros" or create it with the initial value of 1
    await setDoc(docRef, { LifetimePomodoros: currentPomodoros + 1 }, { merge: true });
  } 
  else {
    // If the document doesn't exist, create it with the field "LifetimePomodoros" and the initial value of 1
    await setDoc(docRef, { LifetimePomodoros: 1 });
  }
}

// increment lifetime tasks
const lifetimeTasks = async (event) => {

}

// increment lifetime quests
const lifetimeQuests = async (event) => {

}

const handleClick =  async (event) => {
  // const firebasedb = db;
  console.log(db);

  try {
    const docRef = await addDoc(collection(db, "UserData"), {
      LifetimeTasks: 1
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  // const usersRef = ref(db, "users");
  // const idRef = ref(usersRef, "userID");

  // firebasePush(idRef, 123);
}







function AddUserID(props) {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const idRef = ref(usersRef, "userID");

  firebasePush(idRef, {userID: props} )
}

function UpdateCheckIn(props) {

}

function AddLifetimeTasks(props) {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const idRef = ref(usersRef, "userID");
  const lifetimeRef = ref(idRef, "lifetime");

  const lifetimeValue = 0;

  onValue(lifetimeRef, (snapshot) => {
    lifetimeValue = snapshot.val();
  });

  const newLifetime = lifetimeValue + 1;
  firebaseSet(lifetimeRef, newLifetime);
}

function AddDate(props) {
  
}

function AddDailyNumComplete(props) {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const idRef = ref(usersRef, "uniqueID");
  const dateRef = ref(idRef, "date");
  const taskRef = ref(dateRef, "tasks");
  const dailyNumCompleteRef = ref(dateRef, "dailyNumTasksComplete");

  const dailyNumCompleteValue = 0;

  onValue(dailyNumCompleteRef, (snapshot) => {
    dailyNumCompleteValue = snapshot.val();
  });

  const newDailyNumCompleteValue = dailyNumCompleteValue + 1;
  firebaseSet(dailyNumCompleteRef, newDailyNumCompleteValue);
}

function UpdateAllDone(props) {

}

function AddTaskDailyNum(props) {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const idRef = ref(usersRef, "uniqueID");
  const dateRef = ref(idRef, "date");
  const taskRef = ref(dateRef, "tasks");
  const dailyNumRef = ref(dateRef, "dailyNumTasks");

  const dailyNumValue = 0;

  firebasePush(taskRef, {name: props.taskName} );

  onValue(dailyNumRef, (snapshot) => {
    dailyNumValue = snapshot.val();
  });

  const newDailyNumValue = dailyNumValue + 1;
  firebaseSet(dailyNumRef, newDailyNumValue);
}




export default function StatsPage(props) {   

  return (
    <div>
      <main>
        <nav>
          <ul class="menu mb-3 d-flex justify-content-end">
            <li><Link to='/homepage'>Home</Link></li>
            <li><Link to='/taskmanager'>Task Manager</Link></li>
            <li><Link to='/stats'>Achievements</Link></li>
          </ul>
        </nav>

        <div className="stats">

        <button onClick={addUser}>Add user</button>
        <button onClick={lifetimePomodoros}>Increment pomodoro</button>
        <button onClick={lifetimeTasks}>Increment task</button>
        <button onClick={lifetimeQuests}>Increment quest</button>

          {/* Stats header */}
          <div className="stats-header">
            <img className="frog" src={frog} alt="orange frog with magnifying glass"/>
            <div className="stats-header-stats">
              <h1>Statistics</h1>
              <div className="stats-main-box">
                <div className="stats-daily-streak">
                  <h3>Daily Streak</h3>
                  <div className="stats-streak-num">
                    <p>3</p>
                    <img src={streak} alt="fire"/>
                  </div>
                </div>
                <div className="stats-tasks-completed">
                  <h3>Tasks completed today</h3>
                  <div className="stats-tasks-completed-num">
                    <p>5</p>
                    <img src={checkmark} alt="green checkmark"/>
                  </div>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={.625}/>
                    <p>5/8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quests + All Time Stats */}
          <div className="stats-secondary">

            {/* Daily Quests */}
            <div className="stats-daily-quests">
              <h2>Daily Quests</h2>
              <div className="stats-quest-1 box-border stats-quest-box">
                <h3>Complete 1 task</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={1}/>
                    <p>1/1</p>
                  </div>
              </div>
              <div className="stats-quest-2 box-border stats-quest-box">
                <h3>Finish 2 tasks within 1 pomodoro session</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={.5}/>
                    <p>1/2</p>
                  </div>
              </div>
              <div className="stats-quest-3 box-border stats-quest-box">
                <h3>Complete 1 journal entry</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={0}/>
                    <p>0/1</p>
                  </div>
              </div>
            </div>

            {/* All Time Stats */}
            <div className="stats-all-time">
              <h2>All Time Statistics</h2>
              <div className="stats-longest-streak stats-all-time-box">
                <img src={streak} alt="fire"/>
                <div className="stats-all-time-text">
                  <p>16</p>
                  <h3>Longest day streak</h3>
                </div>
              </div>
              <div className="stats-lifetime-tasks stats-all-time-box">
                <img src={checkmark} alt="green checkmark"/>
                <div className="stats-all-time-text">
                  <p>43</p>
                  <h3>Tasks completed</h3>
                </div>
              </div>
              <div className="stats-pomodoros-set stats-all-time-box">
                <img src={timer} alt="timer"/>
                <div className="stats-all-time-text">
                  <p>8</p>
                  <h3>Pomodoro timers set</h3>
                </div>
              </div>
              <div className="stats-quests-completed stats-all-time-box">
                <img src={chest} alt="chest"/>
                <div className="stats-all-time-text">
                  <p>12</p>
                  <h3>Daily quests completed</h3>
                </div>
              </div>

            </div>
          </div>

        </div>
        

      </main>
    </div>
  )
}