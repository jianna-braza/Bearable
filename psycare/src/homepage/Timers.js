import React, { useState, useEffect } from "react";
import { getAuth } from 'firebase/auth';
import db from "../firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import SpotifyPage from "./spotify.js";

export default function Timers(props) {
  let [pauseBool, setPauseBool] = useState(true);
  let [pauseText, setPauseText] = useState("Start");
  const [timer, setTimer] = useState(1500);
  const [timeInterval, setTimeInterval] = useState(null);
  const [initialTime, setInitialTime] = useState(1500);

  // Function to start the timer
  const startTimer = () => {
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(
      setInterval(() => {
        // Update the timer by incrementing the previous value by 1
        setTimer((prev) => prev - 1);
      }, 1000)
    );
  };

  // Function to pause the timer
  const pauseTimer = (userId) => {
    if (pauseBool) {
      //user is pausing the timer
      setPauseText("Start");
      clearInterval(timeInterval);
      setPauseBool(false);
    } else {
      //user is starting the timer
      setPauseText("Pause");
      startTimer();
      setPauseBool(true);
      if (userId) {
        LifetimePomodoros(userId);
      }
    }
    // Clear the interval to stop the timer from updating
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTimer(initialTime);
    // Clear the interval to stop the timer
    clearInterval(timeInterval);
  };

  const readyTimer = (event, userId, quest, questStop) => {
    if (event.target.textContent === "Short break (5 mins)") {
      clearInterval(timeInterval);
      setInitialTime(300);
      setTimer(300);
    } else if (event.target.textContent === "Long break (15 mins)") {
      clearInterval(timeInterval);
      setInitialTime(900);
      setTimer(900);
    } else {
      clearInterval(timeInterval);
      setInitialTime(1500);
      setTimer(1500);
    }

    if (event.target.textContent === "Task Timer (25 mins)") {
      TaskTimerQuest(userId, quest, questStop);
    }

    if (event.target.textContent === "Short break (5 mins)") {
      ShortTimerQuest(userId, quest, questStop);
    }

    if (event.target.textContent === "Long break (15 mins)") {
      LongTimerQuest(userId, quest, questStop);
    }
  };


  // achievement tracking code

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

  // complete "set a task timer" quest
  const TaskTimerQuest = async (userId, quest1, quest1Stop) => {
    console.log(quest1);

    if (quest1 === "Set a task timer") {
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

  // complete "complete short timer" quest
  const ShortTimerQuest = async (userId, quest2, quest2Stop) => {
    console.log(quest2);

    if (quest2 === "Set a short break timer") {
      const docRef = doc(db, 'userData', userId);
      await updateDoc(docRef, {
        Quest2Done: 1
      });
      LifetimeQuests(userId, quest2Stop);
      await updateDoc(docRef, {
        Quest2Stop: 1
      });
    }
  }

  // complete "complete long timer" quest
  const LongTimerQuest = async (userId, quest3, quest3Stop) => {
    console.log(quest3);

    if (quest3 === "Set a long break timer") {
      const docRef = doc(db, 'userData', userId);
      await updateDoc(docRef, {
        Quest3Done: 1
      });
      LifetimeQuests(userId, quest3Stop);
      await updateDoc(docRef, {
        Quest3Stop: 1
      });
    }
  }

  // increment lifetime pomodoros
  const LifetimePomodoros = async (userId) => {
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


  return (
    <div className="col-9 timer">
      {/* <h2>Press a button to start your timer!</h2> */}
      <div className="d-flex column justify-content-around mb-5 mt-5">
        <button type="button" className="timer-button" onClick={(event) => readyTimer(event, userId, quest1, quest1Stop)}>
          Task Timer (25 mins)
        </button>
        <button type="button" className="timer-button" onClick={(event) => readyTimer(event, userId, quest2, quest2Stop)}>
          Short break (5 mins)
        </button>
        <button type="button" className="timer-button" onClick={(event) => readyTimer(event, userId, quest3, quest3Stop)}>
          Long break (15 mins)
        </button>
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <div>
          <div className="justify-content-start">
            <h2 className="timer mb-5 clock">
              {"" +
                Math.trunc(timer / 60) +
                ":" +
                (timer % 60 <= 9 ? "0" + (timer % 60) : timer % 60)}
            </h2>
          </div>

          <button type="button" className="homepage-button start-button" onClick={() => {pauseTimer(); LifetimePomodoros(userId);}}>
            {pauseText}
          </button>
          <button type="button" className="homepage-button restart-button" onClick={resetTimer}>
            Restart
          </button>
          <div>
            {/* <img
              src="https://github.com/jianna-braza/Psycare/blob/main/psycare/img/woolly-barrel%201.png?raw=true"
              alt="barrel"
            /> */}
          </div>

        </div>
      </div>

      <div className="above-spotify-extra-space"></div>
      <div className="spotify-container">
        <div className="spotify-extra-space"></div>
        <div>
          <SpotifyPage />
        </div>
      </div>

    </div>
  );
}