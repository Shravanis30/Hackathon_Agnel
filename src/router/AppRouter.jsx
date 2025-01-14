


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LFGestureSOS from "../components/LFGestureSOS";
import LFLiveLocation from "../components/LFLiveLocation";
import LFEmergencyContacts from "../components/LFEmergencyContacts";
import LFHiddenCamera from "../components/LFHiddenCamera";
import LFLiveAudio from "../components/LFLiveAudio";
import LFAlertBell from "../components/LFAlertBell";
import LandingPage from "../components/LandingPage";


// import IGestureSOS from '../components/IGestureSOS';
// // import ILiveLocation from '../components/ILiveLocation';
// // import IEmergencyContacts from '../components/IEmergencyContacts';
// import IHiddenCamera from '../components/IHiddenCamera';
// import ILiveAudio from '../components/ILiveAudio';
// import IAlertBell from '../components/IAlertBell';
import Home from '../components/Home'

import GestureSOS from '../components/GestureSOS'



import HomeMain from '../components/HomeMain'
import AccountPage from '../components/AccountPage'
import LoginPage from '../components/LoginPage'
import UserInfoPage from '../components/UserInfoPage'

import AddContacts from "../components/AddContacts";
import SignUp from '../components/SignUp'

import Helpline from "../components/Helpline";



function AppRouter() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/splash-screen" />} />

      {/* Pages */}
      <Route path="/splash-screen" element={<LandingPage />} />
      <Route path="/gesture-sos" element={<LFGestureSOS />} />
      <Route path="/live-location" element={<LFLiveLocation />} />
      <Route path="/emergency-contacts" element={<LFEmergencyContacts />} />
      <Route path="/hidden-camera" element={<LFHiddenCamera />} />
      <Route path="/live-audio" element={<LFLiveAudio />} />
      <Route path="/alert-bell" element={<LFAlertBell />} />


      <Route path="/home" element={<Home />} />
      <Route path="/gestureSOS" element={<GestureSOS />} />


      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/accountPage" element={<AccountPage />} />
      <Route path="/homeMain" element={<HomeMain />} />
      <Route path="/userInfoPage" element={<UserInfoPage />} />
      <Route path="/signUp" element={<SignUp />} />


      <Route path="/addContacts" element={<AddContacts />} />
      <Route path="/helpline" element={<Helpline />} />







    </Routes>
  );
}

export default AppRouter;
