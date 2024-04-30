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
import { addDoc, doc, setDoc, getDoc, collection, updateDoc, serverTimestamp } from "firebase/firestore";
import Navbar from './Navbar.js';

// to-do
// achievments page css - done
// create user with uid in firestore database with google auth - done
// update incremement functions with uid variable - done
// streak counter - done
// daily quest box
// tasks completed today


// increment lifetime tasks and daily task done
const LifetimeTasks = async (userId) => {
  const docRef = doc(db, 'userData', userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
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

// increment lifetime quests
const LifetimeQuests = async (userId) => {
  const docRef = doc(db, 'userData', userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  // if (questNum === "quest1") {
  //   if (quest1Stop === 0) {
  //     if (docSnap.exists()) {
  //       let currentQuests = 0;
  //       if (data && data.hasOwnProperty('LifetimeQuests')) {
  //         currentQuests = data.LifetimeQuests;
  //       }
  //       await setDoc(docRef, { LifetimeQuests: currentQuests + 1 }, { merge: true });
  //     } 
  //     else {
  //       await setDoc(docRef, { LifetimeQuests: 1 });
  //     }
  //   }
  //   await updateDoc(docRef, {
  //     Quest1Stop: 1
  //   });
  // }

  // if (questNum === "quest2") {
  //   if (quest2Stop === 0) {
  //     if (docSnap.exists()) {
  //       let currentQuests = 0;
  //       if (data && data.hasOwnProperty('LifetimeQuests')) {
  //         currentQuests = data.LifetimeQuests;
  //       }
  //       await setDoc(docRef, { LifetimeQuests: currentQuests + 1 }, { merge: true });
  //     } 
  //     else {
  //       await setDoc(docRef, { LifetimeQuests: 1 });
  //     }
  //   }
  //   await updateDoc(docRef, {
  //     Quest2Stop: 1
  //   });
  // }

  // if (questNum === "quest3") {
  //   if (quest3Stop === 0) {
  //     if (docSnap.exists()) {
  //       let currentQuests = 0;
  //       if (data && data.hasOwnProperty('LifetimeQuests')) {
  //         currentQuests = data.LifetimeQuests;
  //       }
  //       await setDoc(docRef, { LifetimeQuests: currentQuests + 1 }, { merge: true });
  //     } 
  //     else {
  //       await setDoc(docRef, { LifetimeQuests: 1 });
  //     }
  //   }
  //   await updateDoc(docRef, {
  //     Quest3Stop: 1
  //   });
  // }
  
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
// attach to "mark as done" button
const DailyStreaks = async (userId) => {
  const docRef = doc(db, 'userData', userId);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayISO = yesterday.toISOString().slice(0, 10); // Get yesterday's date in ISO format (YYYY-MM-DD)
  const todayISO = today.toISOString().slice(0, 10);

  if (userData.LastCheckIn === yesterdayISO) {
    userData.CurrStreak = (userData.CurrStreak || 0) + 1;
    console.log("CurrStreak incremented by 1.");
    userData.LastCheckIn = todayISO;
  }
  else if (userData.LastCheckIn === todayISO) {
    console.log("Already checked in for the day");
  }
  else {
    userData.CurrStreak = 1;
    console.log("CurrStreak set to 1.");
    userData.LastCheckIn = todayISO;
  }

  await setDoc(docRef, userData);
  
  if (userData.CurrStreak > (userData.LongestStreak || 0)) {
    // Update LongestStreak if CurrStreak is greater
    userData.LongestStreak = userData.CurrStreak;
    await setDoc(docRef, userData);
    console.log("LongestStreak updated with CurrStreak value.");
  }
};

// attach to "sign in with google" button
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
    Quest3Stop: 0
  });
}

// complete "set a task timer" quest
const TaskTimerQuest = async (userId, quest1) => {
  console.log(quest1);

  if (quest1 === "Set a task timer") {
    const docRef = doc(db, 'userData', userId);
    await updateDoc(docRef, {
      Quest1Done: 1
    });
    LifetimeQuests(userId);
  }
  
}

// complete "complete 1 task" quest
const OneTaskQuest = async (userId, quest1) => {
  console.log(quest1);

  if (quest1 === "Complete 1 task") {
    const docRef = doc(db, 'userData', userId);
    await updateDoc(docRef, {
      Quest1Done: 1
    });
    LifetimeQuests(userId);
  }
  
}

// complete "complete add task to to-do list" quest
const AddTaskQuest = async (userId, quest2) => {
  console.log(quest2);

  if (quest2 === "Add a task to your to-do list") {
    const docRef = doc(db, 'userData', userId);
    await updateDoc(docRef, {
      Quest2Done: 1
    });
    LifetimeQuests(userId);
  }
  
}

// complete "complete short timer" quest
const ShortTimerQuest = async (userId, quest2) => {
  console.log(quest2);

  if (quest2 === "Set a short break timer") {
    const docRef = doc(db, 'userData', userId);
    await updateDoc(docRef, {
      Quest2Done: 1
    });
    LifetimeQuests(userId);
  }
  
}

// complete "complete journal entry" quest
const JournalEntryQuest = async (userId, quest3) => {
  console.log(quest3);

  if (quest3 === "Complete 1 journal entry") {
    const docRef = doc(db, 'userData', userId);
    await updateDoc(docRef, {
      Quest3Done: 1
    });
    LifetimeQuests(userId);
  }
  
}

// complete "complete long timer" quest
const LongTimerQuest = async (userId, quest3) => {
  console.log(quest3);

  if (quest3 === "Set a long break timer") {
    const docRef = doc(db, 'userData', userId);
    await updateDoc(docRef, {
      Quest3Done: 1
    });
    LifetimeQuests(userId);
  }
}


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

          <p>{quote}</p>

          <p>{userId}</p>

        {/* attach to "sign in with google" */}
        <button onClick={() => AddUser(userId)}>Add user</button>

        {/* attach to "mark as done" */}
        <button onClick={() => LifetimeTasks(userId)}>Increment task</button>

        {/* attach to "start" */}
        <button onClick={() => LifetimePomodoros(userId)}>Increment pomodoro</button>

        {/* attach to complete task buttons */}
        <button onClick={() => LifetimeQuests(userId)}>Increment quest</button>

        {/* attach to "mark as done" */}
        <button onClick={() => DailyStreaks(userId)}>Add to daily streak</button>

        {/* attach to "mark as done" */}
        {/* <button onClick={() => SetQuests(userId, dailyQuest1, dailyQuest2, dailyQuest3)}>Update Quests</button> */}
        <button onClick={async () => {
        await SetQuests(userId, dailyQuest1, dailyQuest2, dailyQuest3);
        window.location.reload();
      }}>Update Quests</button>


        <br></br>

        {/* attach to "task timer"*/}
        {/* <button onClick={() => {TaskTimerQuest(userId, quest1); LifetimeQuests(userId, quest1Stop, quest2Stop, quest3Stop, "quest1")}}>Complete task timer quest</button> */}

        {/* attach to "mark as done" */}
        {/* <button onClick={() => {OneTaskQuest(userId, quest1); LifetimeQuests(userId, quest1Stop, quest2Stop, quest3Stop, "quest1")}}>Complete 1 task quest</button> */}

        {/* attach to "add task" */}
        {/* <button onClick={() => {AddTaskQuest(userId, quest2); LifetimeQuests(userId, quest1Stop, quest2Stop, quest3Stop, "quest2")}}>Complete add task quest</button> */}

        {/* attach to "short break" */}
        {/* <button onClick={() => {ShortTimerQuest(userId, quest2); LifetimeQuests(userId, quest1Stop, quest2Stop, quest3Stop, "quest2")}}>Complete short timer quest</button> */}

        {/* attach to "short break" */}
        {/* <button onClick={() => {JournalEntryQuest(userId, quest3); LifetimeQuests(userId, quest1Stop, quest2Stop, quest3Stop, "quest3")}}>Complete journal entry quest</button> */}

        {/* attach to "short break" */}
        {/* <button onClick={() => {LongTimerQuest(userId, quest3); LifetimeQuests(userId, quest1Stop, quest2Stop, quest3Stop, "quest3")}}>Complete long timer quest</button> */}


        {/* attach to "task timer" */}
        <button onClick={() => TaskTimerQuest(userId, quest1)}>Complete task timer quest</button>

        {/* attach to "mark as done" */}
        <button onClick={() => OneTaskQuest(userId, quest1)}>Complete 1 task quest</button>

        {/* attach to "add task" */}
        <button onClick={() => AddTaskQuest(userId, quest2)}>Complete add task quest</button>

        {/* attach to "short break" */}
        <button onClick={() => ShortTimerQuest(userId, quest2)}>Complete short timer quest</button>

        {/* attach to "short break" */}
        <button onClick={() => JournalEntryQuest(userId, quest3)}>Complete journal entry quest</button>

        {/* attach to "short break" */}
        <button onClick={() => LongTimerQuest(userId, quest3)}>Complete long timer quest</button>


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