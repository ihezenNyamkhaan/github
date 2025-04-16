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
import TeamQrCode from "./user/TeamQrCode";
import TeamRegistrationPage from "./user/TeamRegistrationPage";
import TeamPaymentPage from './user/TeamPaymentPage';
import UserProfile from './user/UserProfile';


import reportWebVitals from './reportWebVitals';
import InformationPage from './user/InformationPage';
import PlayerManager from './monitor/PlayerManager';

import AdminPage from './admin/AdminPage';
import PlayersPage from './admin/PlayersPage';
import Paid from './admin/Paid';


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
        <Route path="/team-qr" element={<TeamQrCode />} />
        <Route path="/teams-list" element={<TeamsListPage />} />
        <Route path="/team-payment/:teamId" element={<TeamPaymentPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/monitor" element={<TournamentManager />} />
        <Route path="/teams" element={<TeamManager />} />
        <Route path="/players" element={<PlayerManager />} />
        <Route path="/teams-admin" element={<TeamsAdminPage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/players-page" element={<PlayersPage />} />
        <Route path="/paid" element={<Paid />} />





      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
