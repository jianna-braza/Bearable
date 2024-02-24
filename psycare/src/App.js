import React, { Component } from 'react';
import {Routes, Route, Navigate, BrowserRouter as Router, Link, useParams, NavLink} from 'react-router-dom'
import HomePage from './homePage.js';
import AchievementsPage from './achievementsPage.js';
import TaskPage from './taskPage.js';

class App extends Component {
  render() {
    return (
      <Router>
          <Routes>
            <Route path="homepage" element={<HomePage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="taskpage" element={<TaskPage />} />
            <Route path='*' element={<Navigate to='/homepage' />} />
          </Routes>
      </Router>
    );
  }
}

export default App;
