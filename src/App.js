import AuthComponent from './components/authentication/AuthComponent';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Rosters from './components/Rosters/Rosters';
import Leagues from './components/Leagues/Leagues';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import CreateLeague from './components/Leagues/CreateLeague';
import CreateRoster from './components/Rosters/CreateRoster';
import JoinLeague from './components/Leagues/JoinLeague';
import Account from './components/Account';
import AuthMethods from './components/authentication/AuthMethods';

import axios from 'axios';
import config from './config';

import './App.css';
import { useEffect, useState, useRef } from 'react';
import BestBallLeaderboard from './components/Leaderboard/BestBallLeaderboard';
import SeasonLeaderboard from './components/Leaderboard/SeasonLeaderboard';
import HowToPlay from './components/TextPages/HowToPlay';
import AboutUs from './components/TextPages/AboutUs';
import Footer from './components/Footer';

import Alert from '@mui/material/Alert';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';


function App() {

  const [canCreateRoster, setCanCreateRoster] = useState(false);

  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    axios.post(config.url + "/can-rosters-be-created").then(resp => {
        setCanCreateRoster(resp.data.canRostersBeCreated);
    })
  })
  
  const [loggedIn, setLoggedIn] = useState(false);

  const Auth = new AuthMethods();

  useEffect(() => {
    setLoggedIn(Auth.loggedIn())
  }, [])


  return (
    <div className="App">
      {showAlert && (
        <Alert severity="info" color="warning" onClose={() => setShowAlert(false)}>
          Rosters open on Tuesday mornings and lock on Thursday mornings
        </Alert>
      )}

      <Header loggedIn={loggedIn}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/passwordReset" element={<ResetPassword />} />

        <Route path="/rosters" element={<AuthComponent Component={<Rosters canCreateRoster={canCreateRoster} />} />} />
        <Route path="/create-roster" 
          element={<AuthComponent Component={<CreateRoster canCreateRoster={canCreateRoster}/>} />} 
        />

        <Route path="/leagues" element={<AuthComponent Component={<Leagues />} />} />
        <Route path="/create-league" element={<AuthComponent Component={<CreateLeague />} />} />
        <Route path="/join-league" element={<AuthComponent Component={<JoinLeague />} />} />

        <Route path="/best-ball-leaderboard" element={<AuthComponent Component={<BestBallLeaderboard />} />} />
        <Route path="/leaderboard" element={<AuthComponent Component={<SeasonLeaderboard />} />} />

        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/account" element={<AuthComponent Component={<Account setLoggedIn={setLoggedIn} />} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
