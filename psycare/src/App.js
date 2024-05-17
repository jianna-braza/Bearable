import React, { Component } from 'react';
import {Routes, Route, Navigate, BrowserRouter as Router, Link, useParams, NavLink} from 'react-router-dom'
import HomePage from './homepage/homePage.js';
import SpotifyPage from './homepage/spotify.js';
import StatsPage from './achievementsPage/stats.js';
import TaskManager from './taskManager/taskManager.js';
import CalendarPage from './taskManager/CalendarPage.js';
import withSplashScreen from './splashScreen/withSplashScreen.js';
import ResourcesPage from './resourcesPage/ResourcesPage.js';

class App extends Component {
  render() {
    return (
      <Router>
          <Routes>
            <Route path="homepage" element={<HomePage />} />
            <Route path="spotify" element={<SpotifyPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="taskmanager" element={<TaskManager />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path='*' element={<Navigate to='/homepage' />} />
          </Routes>
      </Router>
    );
  }
}

export default withSplashScreen(App);
