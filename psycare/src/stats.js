import React, { useState, useEffect } from 'react';
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
import Navbar from './Navbar.js';

// to-do
// achievments page css
// create user with uid in firestore database with google auth - done
// update incremement functions with uid variable - done
// streak counter
// daily quest box
// tasks completed today


// increment lifetime tasks
const lifetimeTasks = async (userId) => {
  const docRef = doc(db, 'userData', userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
  if (docSnap.exists()) {
    let currentTasks = 0;
    if (data && data.hasOwnProperty('LifetimeTasks')) {
      currentTasks = data.LifetimeTasks;
    }
    await setDoc(docRef, { LifetimeTasks: currentTasks + 1 }, { merge: true });
  } 
  else {
    await setDoc(docRef, { LifetimeTasks: 1 });
  }
}

// increment lifetime pomodoros
const lifetimePomodoros = async (userId) => {
  const docRef = doc(db, 'userData', userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
  if (docSnap.exists()) {
    let currentPomodoros = 0;
    if (data && data.hasOwnProperty('LifetimePomodoros')) {
      currentPomodoros = data.LifetimePomodoros;
    }
    await setDoc(docRef, { LifetimePomodoros: currentPomodoros + 1 }, { merge: true });
  } 
  else {
    await setDoc(docRef, { LifetimePomodoros: 1 });
  }
}

// increment lifetime quests
const lifetimeQuests = async (userId) => {
  const docRef = doc(db, 'userData', userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
  if (docSnap.exists()) {
    let currentQuests = 0;
    if (data && data.hasOwnProperty('LifetimeQuests')) {
      currentQuests = data.LifetimeQuests;
    }
    await setDoc(docRef, { LifetimeQuests: currentQuests + 1 }, { merge: true });
  } 
  else {
    await setDoc(docRef, { LifetimeQuests: 1 });
  }
}

// add current date to date array, update CurrStreak, update LongestStreak
const dailyStreaks = async (userId) => {
  try {
      const docRef = doc(db, "userData", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const currentDate = new Date().toISOString(); // Get current date in ISO format
          const userData = docSnap.data();
          
          // Add current date to the 'dates' field array
          userData.CheckInDates = userData.CheckInDates || []; // Initialize if 'dates' field doesn't exist
          userData.CheckInDates.push(currentDate);

          // Update the document with the new 'dates' field
          await setDoc(docRef, userData);

          console.log("Current date added to the 'dates' field successfully.");

          // Check streak
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayISO = yesterday.toISOString().slice(0, 10); // Get yesterday's date in ISO format (YYYY-MM-DD)

          if (userData.CheckInDates.includes(yesterdayISO)) {
              // Increment CurrStreak if there is a date from the previous day
              userData.CurrStreak = (userData.CurrStreak || 0) + 1;
              console.log("CurrStreak incremented by 1.");
          } else {
              // Set CurrStreak to 1 if there is no date from the previous day
              userData.CurrStreak = 1;
              console.log("CurrStreak set to 1.");
          }

          // Update document with the updated streak
          await setDoc(docRef, userData);

          // Compare CurrStreak and LongestStreak
          if (userData.CurrStreak > (userData.LongestStreak || 0)) {
              // Update LongestStreak if CurrStreak is greater
              userData.LongestStreak = userData.CurrStreak;
              await setDoc(docRef, userData);
              console.log("LongestStreak updated with CurrStreak value.");
          }
      } else {
          console.log("User document does not exist.");
      }
  } catch (error) {
      console.error("Error adding current date and checking streak:", error);
  }
};  
  


export default function StatsPage(props) { 
  
  // get userId
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = getAuth().currentUser;
        if (currentUser !== null) {
          console.log("User ID:", currentUser.uid);
          setUserId(currentUser.uid);
          localStorage.setItem('userId', currentUser.uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // add user to firestore database with uid as key
  const addUser = async (event) => {
    try {
      const docRef = doc(db, "userData", userId);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          LifetimeTasks: 0,
          LifetimePomodoros: 0,
          LifetimeQuests: 0,
          LongestStreak: 0,
          CurrStreak: 0,
          CheckInDates: []
        });
        console.log("User document created successfully.");
      } else {
        console.log("User document already exists.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }


  // retrieve lifetime stats

  // retrieve lifetime tasks
  const [currLifetimeTasks, setCurrLifetimeTasks] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchCurrLifetimeTasks = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('LifetimeTasks')) {
            setCurrLifetimeTasks(data.LifetimeTasks);
          }
        } catch (error) {
          console.error("Error fetching lifetime tasks:", error);
        }
      };
      fetchCurrLifetimeTasks();
    }
  }, [userId]);
    

  // retrieve current lifetime pomodoros
  const [currLifetimePomodoros, setCurrLifetimePomodoros] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchCurrLifetimePomodoros = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('LifetimePomodoros')) {
            setCurrLifetimePomodoros(data.LifetimePomodoros);
          }
        } catch (error) {
          console.error("Error fetching lifetime pomodoros:", error);
        }
      };
      fetchCurrLifetimePomodoros();
    }
  }, [userId]);

  // retrieve current lifetime quests
  const [currLifetimeQuests, setCurrLifetimeQuests] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchCurrLifetimeQuests = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('LifetimeQuests')) {
            setCurrLifetimeQuests(data.LifetimeQuests);
          }
        } catch (error) {
          console.error("Error fetching lifetime quests:", error);
        }
      };
      fetchCurrLifetimeQuests();
    }
  }, [userId]);

  // retrieve current longest streak
  const [currLongestStreak, setCurrLongestStreak] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchCurrLongestStreak = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('LongestStreak')) {
            setCurrLongestStreak(data.LongestStreak);
          }
        } catch (error) {
          console.error("Error fetching longest streak:", error);
        }
      };
      fetchCurrLongestStreak();
    }
  }, [userId]);

  // retrieve current streak
  const [currStreak, setCurrStreak] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchCurrStreak = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('CurrStreak')) {
            setCurrStreak(data.CurrStreak);
          }
        } catch (error) {
          console.error("Error fetching longest streak:", error);
        }
      };
      fetchCurrStreak();
    }
  }, [userId]);
  


  // display quotes

  // display load screen quote
  const [quote, setQuote] = useState(0);

  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const quoteNum = "Quote" + randomNumber;

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const docRef = doc(db, 'quotes', 'loadScreenQuotes');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists() && data.hasOwnProperty(quoteNum)) {
          setQuote(data[quoteNum]);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
  }, []);


  // display quests

  // display daily quest 1
  const [dailyQuest1, setDailyQuest1] = useState(0);

  const quest1Num = Math.floor(Math.random() * 2) + 1;
  const quest1NumText = "Quest" + quest1Num;

  useEffect(() => {
    const fetchQuest1 = async () => {
      try {
        const docRef = doc(db, 'quests', 'dailyQuest1');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists() && data.hasOwnProperty(quest1NumText)) {
          setDailyQuest1(data[quest1NumText]);
        }
      } catch (error) {
        console.error("Error fetching quest 1:", error);
      }
    };
    fetchQuest1();
  }, []);

  // display daily quest 2
  const [dailyQuest2, setDailyQuest2] = useState(0);

  const quest2Num = Math.floor(Math.random() * 2) + 1;
  const quest2NumText = "Quest" + quest2Num;

  useEffect(() => {
    const fetchQuest2 = async () => {
      try {
        const docRef = doc(db, 'quests', 'dailyQuest2');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists() && data.hasOwnProperty(quest2NumText)) {
          setDailyQuest2(data[quest2NumText]);
        }
      } catch (error) {
        console.error("Error fetching quest 2:", error);
      }
    };
    fetchQuest2();
  }, []);

  // display daily quest 3
  const [dailyQuest3, setDailyQuest3] = useState(0);

  const quest3Num = Math.floor(Math.random() * 2) + 1;
  const quest3NumText = "Quest" + quest3Num;

  useEffect(() => {
    const fetchQuest3 = async () => {
      try {
        const docRef = doc(db, 'quests', 'dailyQuest3');
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists() && data.hasOwnProperty(quest3NumText)) {
          setDailyQuest3(data[quest3NumText]);
        }
      } catch (error) {
        console.error("Error fetching quest 3:", error);
      }
    };
    fetchQuest3();
  }, []);


  return (
    <div>
      <main>
        <header>
          <Navbar />
        </header>

        <div className="stats">

          <p>{quote}</p>

          <p>{userId}</p>

        {/* attach to "sign in with google" */}
        <button onClick={addUser}>Add user</button>

        {/* attach to "mark as done" */}
        <button onClick={() => lifetimeTasks(userId)}>Increment task</button>

        {/* attach to "start" */}
        <button onClick={() => lifetimePomodoros(userId)}>Increment pomodoro</button>

        {/* attach to tbd, mark as done? */}
        <button onClick={() => lifetimeQuests(userId)}>Increment quest</button>

        {/* attach to "mark as done" */}
        <button onClick={() => dailyStreaks(userId)}>Adjust daily streak</button>


          {/* Stats header */}
          <div className="stats-header">
            <img className="frog" src={frog} alt="orange frog with magnifying glass"/>
            <div className="stats-header-stats">
              <h1>Statistics</h1>
              <div className="stats-main-box">
                <div className="stats-daily-streak">
                  <h3>Daily Streak</h3>
                  <div className="stats-streak-num">
                    <h4>{currStreak}</h4>
                    <img src={streak} alt="fire"/>
                  </div>
                </div>
                <div className="stats-tasks-completed">
                  <h3>Tasks completed today</h3>
                  <div className="stats-tasks-completed-num">
                    <h4>5</h4>
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
                <h3>{dailyQuest1}</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={1}/>
                    <p>1/1</p>
                  </div>
              </div>
              <div className="stats-quest-2 box-border stats-quest-box">
                <h3>{dailyQuest2}</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={.5}/>
                    <p>1/2</p>
                  </div>
              </div>
              <div className="stats-quest-3 box-border stats-quest-box">
                <h3>{dailyQuest3}</h3>
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
                  <p>{currLongestStreak}</p>
                  <h3>Longest day streak</h3>
                </div>
              </div>
              <div className="stats-lifetime-tasks stats-all-time-box">
                <img src={checkmark} alt="green checkmark"/>
                <div className="stats-all-time-text">
                  <p>{currLifetimeTasks}</p>
                  <h3>Tasks completed</h3>
                </div>
              </div>
              <div className="stats-pomodoros-set stats-all-time-box">
                <img src={timer} alt="timer"/>
                <div className="stats-all-time-text">
                  <p>{currLifetimePomodoros}</p>
                  <h3>Pomodoro timers set</h3>
                </div>
              </div>
              <div className="stats-quests-completed stats-all-time-box">
                <img src={chest} alt="chest"/>
                <div className="stats-all-time-text">
                  <p>{currLifetimeQuests}</p>
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