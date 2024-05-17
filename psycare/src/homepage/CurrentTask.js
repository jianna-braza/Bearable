import React, { useState, useEffect } from "react";
import { getAuth } from 'firebase/auth';
import db from "../firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export default function CurrentTask(props) {
  // achievement tracking code

  // retrieve data

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

  // functions

  // increment lifetime quests
  const LifetimeQuests = async (userId, questNumStop) => {
    const docRef = doc(db, 'userData', userId);
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

  // increment lifetime tasks and daily task done
  // add current date to date array, update CurrStreak, update LongestStreak
  const LifetimeTasksDailyStreak = async (userId) => {
    let docRef = doc(db, 'userData', userId);
    let docSnap = await getDoc(docRef);
    let data = docSnap.data();

    // incrememnt lifetime tasks
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

    // increment daily task done
    if (docSnap.exists()) {
      let currTasks = 0;
      if (data && data.hasOwnProperty('DailyTaskDone')) {
        currTasks = data.DailyTaskDone;
      }
      await setDoc(docRef, { DailyTaskDone: currTasks + 1 }, { merge: true });
    }

    // daily streak code
    docRef = doc(db, 'userData', userId);
    docSnap = await getDoc(docRef);
    data = docSnap.data();

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().slice(0, 10); // Get yesterday's date in ISO format (YYYY-MM-DD)
    const todayISO = today.toISOString().slice(0, 10);

    if (data.LastCheckIn === yesterdayISO) {
      data.CurrStreak = (data.CurrStreak || 0) + 1;
      console.log("CurrStreak incremented by 1.");
      data.LastCheckIn = todayISO;
    }
    else if (data.LastCheckIn === todayISO) {
      console.log("Already checked in for the day");
    }
    else {
      data.CurrStreak = 1;
      console.log("CurrStreak set to 1.");
      data.LastCheckIn = todayISO;
    }

    await setDoc(docRef, data);

    if (data.CurrStreak > (data.LongestStreak || 0)) {
      // Update LongestStreak if CurrStreak is greater
      data.LongestStreak = data.CurrStreak;
      await setDoc(docRef, data);
      console.log("LongestStreak updated with CurrStreak value.");
    }
  }

  // complete "complete 1 task" quest
  const OneTaskQuest = async (userId, quest1, quest1Stop) => {
    console.log(quest1);

    if (quest1 === "Complete 1 task") {
      const docRef = doc(db, 'userData', userId);
      await updateDoc(docRef, {
        Quest1Done: 1
      });
      LifetimeQuests(userId, quest1Stop);
      await updateDoc(docRef, {
        Quest1Stop: 1
      });
    }
  }

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











  const QUOTES = [
    "Task complete! You're making progress one step at a time. Keep up the momentum!",
    "Way to go! Your tasks didn't stand a chance against your determination. Keep up the amazing work ethic!",
    "You did it! Your task is done, and you're ready to conquer the day. Keep that positive momentum going!"
  ]

  let [taskNum, setTaskNum] = useState(1);
  let [taskName, setTaskName] = useState("Pay Good to Go bill");
  let [quoteNum, setQuoteNum] = useState(getRandomNum());

  function getRandomNum() {
    return Math.floor(Math.random() * 3);
  }

  function changeQuote() {
    setQuoteNum(getRandomNum());
  }

  function update() {
    setTaskNum(2);
    setTaskName("Reading Response 7");
  }

  //on line 228 I hardcoded 2 instead of {taskTotal} just for demo vid purposes
  return (
    <div className="col-3 curr-task-box">
      <div className="d-flex flex-column align-items-center">
          <p className="mb-4 mt-5 num-tasks">{taskNum} out of 2 tasks</p>
          {/* <h2>Current Task:</h2> */}
          <h3 className="mb-5 curr-task-name">{taskName}</h3>
          <button
            type="button"
            className="homepage-button mark-as-done-button"
            data-toggle="modal"
            data-backdrop="false"
            data-target="#exampleModal"
            onClick={() => {update(); LifetimeTasksDailyStreak(userId); OneTaskQuest(userId, quest1, quest1Stop)}}>
            Mark as done
          </button>



        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Great job completing your task!
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex row">
                <p>
                  {QUOTES[quoteNum]}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary cancel-button"
                  data-dismiss="modal"
                  onClick={changeQuote}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-baseline mt-auto">

      </div>
    </div>
  );
}