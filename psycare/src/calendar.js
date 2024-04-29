import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "./calendar.css";
import { getMonth } from "./util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./EventModal";

export default function Calendar(props) {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div>
      <header>
        <h1>Psycare calendar view</h1>
        <nav>
          <ul class="menu mb-3 d-flex justify-content-end">
            <li>
              <Link to="/homepage">Home</Link>
            </li>
            <li>
              <Link to="/taskmanager">Task Manager</Link>
            </li>
            <li>
              <Link to="/spotify">Spotify Page</Link>
            </li>
            <li>
              <Link to="/stats">Stats Page</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="d-flex row">
          <section className="col-3">
            <div className="row">
              <button type="button" className="btn btn-outline-dark">
                <Link to="/taskmanager">Board view</Link>
              </button>
              <button type="button" className="btn btn-outline-dark">
                Calendar view
              </button>
            </div>
          </section>
          <section className="col-7">
            <p>
              <React.Fragment>
                {showEventModal && <EventModal />}
                <div className="h-screen flex flex-col">
                  <CalendarHeader />
                  <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currenMonth} />
                  </div>
                </div>
              </React.Fragment>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

