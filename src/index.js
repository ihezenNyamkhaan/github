import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from './UserRegister';
import Login from "./Login";
import ForgotPassword from './ForgotPassword';
import TournamentManager from "./monitor/TournamentManager";
import TeamManager from "./monitor/TeamManager";
import TeamsAdminPage from "./monitor/TeamsAdminPage";
import TeamsListPage from "./user/TeamsListPage";
import TournamentListPage from "./user/TournamentListPage";
import TeamRegistrationPage from "./user/TeamRegistrationPage";

import reportWebVitals from './reportWebVitals';
// import PlayerManager from './monitor/PlayerManager';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tournament" element={<TournamentListPage />} />
        <Route path="/team-register/:tournamentId" element={<TeamRegistrationPage />} />
        <Route path="/teams-list" element={<TeamsListPage />} />
        <Route path="/monitor" element={<TournamentManager />} />
        <Route path="/teams" element={<TeamManager />} />
        {/* <Route path="/players" element={<PlayerManager />} /> */}
        <Route path="/teams-admin" element={<TeamsAdminPage />} />



      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
