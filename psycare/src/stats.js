import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./stats.css";
import frog from "./assets/frog.png";
import streak from "./assets/streak.png";
import checkmark from "./assets/checkmark.png";
import timer from "./assets/timer.png";
import chest from "./assets/chest.png";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from "./firebase.js";
import db from "./firebase.js";
import { addDoc, doc, setDoc, getDoc, collection, updateDoc } from "firebase/firestore";
import Navbar from './Navbar.js';


export default function StatsPage(props) { 
  
  // retrieve userId
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

  // retrieve user quest 1
  const [quest1, setQuest1] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest1 = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest1')) {
            setQuest1(data.Quest1);
          }
        } catch (error) {
          console.error("Error fetching quest 1:", error);
        }
      };
      fetchQuest1();
    }
  }, [userId]);

  // retrieve user quest 2
  const [quest2, setQuest2] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest2 = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
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
  }, [userId]);

  // retrieve user quest 3
  const [quest3, setQuest3] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest3 = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest3')) {
            setQuest3(data.Quest3);
          }
        } catch (error) {
          console.error("Error fetching quest 2:", error);
        }
      };
      fetchQuest3();
    }
  }, [userId]);

  // retrieve quest 1 done
  const [quest1Done, setQuest1Done] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest1Done = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest1Done')) {
            setQuest1Done(data.Quest1Done);
          }
        } catch (error) {
          console.error("Error fetching quest 1 done:", error);
        }
      };
      fetchQuest1Done();
    }
  }, [userId]);

  // retrieve quest 2 done
  const [quest2Done, setQuest2Done] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest2Done = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest2Done')) {
            setQuest2Done(data.Quest2Done);
          }
        } catch (error) {
          console.error("Error fetching quest 2 done:", error);
        }
      };
      fetchQuest2Done();
    }
  }, [userId]);

  // retrieve quest 3 done
  const [quest3Done, setQuest3Done] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest3Done = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest3Done')) {
            setQuest3Done(data.Quest3Done);
          }
        } catch (error) {
          console.error("Error fetching quest 3 done:", error);
        }
      };
      fetchQuest3Done();
    }
  }, [userId]);

  // retrieve quest 1 stop
  const [quest1Stop, setQuest1Stop] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest1Stop = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest1Stop')) {
            setQuest1Stop(data.Quest1Stop);
          }
        } catch (error) {
          console.error("Error fetching quest 1 stop:", error);
        }
      };
      fetchQuest1Stop();
    }
  }, [userId]);

  // retrieve quest 2 stop
  const [quest2Stop, setQuest2Stop] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest2Stop = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
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
  }, [userId]);

  // retrieve quest 3 stop
  const [quest3Stop, setQuest3Stop] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchQuest3Stop = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('Quest3Stop')) {
            setQuest3Stop(data.Quest3Stop);
          }
        } catch (error) {
          console.error("Error fetching quest 3 stop:", error);
        }
      };
      fetchQuest3Stop();
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

  // retrieve daily quest 1
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

  // retrieve daily quest 2
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

  // retrieve daily quest 3
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

  // retrieve daily task done
  const [taskDone, setTaskDone] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchTaskDone = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('DailyTaskDone')) {
            setTaskDone(data.DailyTaskDone);
          }
        } catch (error) {
          console.error("Error fetching daily task done:", error);
        }
      };
      fetchTaskDone();
    }
  }, [userId]);

  // retrieve daily task total
  const [taskTotal, setTaskTotal] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchTaskTotal = async () => {
        try {
          const docRef = doc(db, 'userData', userId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (docSnap.exists() && data.hasOwnProperty('DailyTaskTotal')) {
            setTaskTotal(data.DailyTaskTotal);
          }
        } catch (error) {
          console.error("Error fetching daily task total:", error);
        }
      };
      fetchTaskTotal();
    }
  }, [userId]);

  const taskPerc = taskDone / taskTotal;


  return (
    <div>
      <main>
        <header>
          <Navbar />
        </header>

        <div className="stats">

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
                    <h4>{taskDone}</h4>
                    <img src={checkmark} alt="green checkmark"/>
                  </div>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={taskPerc}/>
                    <p>{taskDone}/{taskTotal}</p>
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
                <h3>{quest1}</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={quest1Done}/>
                    <p>{quest1Done}/1</p>
                  </div>
              </div>
              <div className="stats-quest-2 box-border stats-quest-box">
                <h3>{quest2}</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={quest2Done}/>
                    <p>{quest2Done}/1</p>
                  </div>
              </div>
              <div className="stats-quest-3 box-border stats-quest-box">
                <h3>{quest3}</h3>
                  <div className="stats-tasks-progress">
                    <progress className="stats-progress-bar" value={quest3Done}/>
                    <p>{quest3Done}/1</p>
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