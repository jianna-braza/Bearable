import React, { Component } from 'react';
import {Routes, Route, Navigate, BrowserRouter as Router, Link, useParams, NavLink} from 'react-router-dom'
import HomePage from './homePage.js';
import AchievementsPage from './achievementsPage.js';
import TaskPage from './taskPage.js';
import SpotifyPage from './spotify.js';
import StatsPage from './stats.js';
import TaskManager from './taskManager.js';
import CalendarPage from './CalendarPage.js';
import withSplashScreen from './withSplashScreen.js';

class App extends Component {
  render() {
    return (
      <Router>
          <Routes>
            <Route path="homepage" element={<HomePage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="taskpage" element={<TaskPage />} />
            <Route path="spotify" element={<SpotifyPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="taskmanager" element={<TaskManager />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path='*' element={<Navigate to='/homepage' />} />
          </Routes>
      </Router>
    );
  }
}

export default withSplashScreen(App);
