import React, { useState, useEffect } from "react";
import SpotifyPage from "./spotify.js";
import { signInWithGoogle } from "./firebase.js";
import Navbar from './Navbar.js';
import CurrentTask from './CurrentTask.js';
import Timers from './Timers.js';
import './homePage.css';
import { getAuth } from 'firebase/auth';
import db from "./firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";



export default function HomePage(props) {
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

  // add user to firestore database with uid as key
  const AddUser = async (userId) => {
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
          LastCheckIn: null,
          Quest1: null,
          Quest2: null,
          Quest3: null,
          Quest1Done: 0,
          Quest2Done: 0,
          Quest3Done: 0,
          Quest1Stop: 0,
          Quest2Stop: 0,
          Quest3Stop: 0,
          DailyTaskDone: 0,
          DailyTaskTotal: 0
        });
        console.log("User document created successfully.");
      } else {
        console.log("User document already exists.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  // set quests code

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

  // update new daily quests, reset daily task count done/total
  const SetQuests = async (userId, dailyQuest1, dailyQuest2, dailyQuest3) => {
    const docRef = doc(db, 'userData', userId);

    await updateDoc(docRef, {
      Quest1: dailyQuest1,
      Quest2: dailyQuest2,
      Quest3: dailyQuest3,
      Quest1Done: 0,
      Quest2Done: 0,
      Quest3Done: 0,
      Quest1Stop: 0,
      Quest2Stop: 0,
      Quest3Stop: 0,
      DailyTaskDone: 0,
      DailyTaskTotal: 0
    });
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
          {/*Authentication*/}
            <div>
              <button className="myButton" onClick={() => {signInWithGoogle(); AddUser(userId); SetQuests(userId, dailyQuest1, dailyQuest2, dailyQuest3);}}>
                Sign In With Google
              </button>
            </div>

          <div className="d-flex row">

            <CurrentTask />

            <Timers />



          </div>

          {/* spotify section */}

          <div className="spotify-content">
            <SpotifyPage />
          </div>


          <img
            src="https://github.com/jianna-braza/Psycare/blob/main/psycare/img/bear.png?raw=true"
            alt="bear"
            className="bear flex"
          />
        
      </main>
    </div>
  );
}
