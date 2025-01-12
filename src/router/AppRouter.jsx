// // import React from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import GestureSOS from "../components/GestureSOS";
// // import LiveLocation from "../components/LiveLocation";
// // import EmergencyContacts from "../components/EmergencyContacts";
// // import HiddenCamera from "../components/HiddenCamera";
// // import LiveAudio from "../components/LiveAudio";
// // import AlertBell from "../components/AlertBell";
// // import SplashScreen from "../components/SplashScreen";

// // function AppRouter() {
// //   return (
// //     <Routes>
// //       {/* Default Route */}
// //       <Route path="/" element={<Navigate to="/splash-screen" />} />
      
// //       {/* Pages */}
// //       <Route path="/splash-screen" element={<SplashScreen />} />
// //       <Route path="/gesture-sos" element={<GestureSOS />} />
// //       <Route path="/live-location" element={<LiveLocation />} />
// //       <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      
// //       <Route path="/hidden-camera" element={<HiddenCamera />} />
// //       <Route path="/live-audio" element={<LiveAudio />} />
// //       <Route path="/alert-bell" element={<AlertBell />} />
// //     </Routes>
// //   );
// // }

// // export default AppRouter;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LFGestureSOS from "../components/LFGestureSOS";
import LFLiveLocation from "../components/LFLiveLocation";
import LFEmergencyContacts from "../components/LFEmergencyContacts";
import LFHiddenCamera from "../components/LFHiddenCamera";
import LFLiveAudio from "../components/LFLiveAudio";
import LFAlertBell from "../components/LFAlertBell";
import LandingPage from "../components/LandingPage";


import IGestureSOS from '../components/IGestureSOS';
import ILiveLocation from '../components/ILiveLocation';
import IEmergencyContacts from '../components/IEmergencyContacts';
import IHiddenCamera from '../components/IHiddenCamera';
import ILiveAudio from '../components/ILiveAudio';
import IAlertBell from '../components/IAlertBell';
import Home from '../components/Home'

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
      <Route path="/Igesture-sos" element={<IGestureSOS />} />
      <Route path="/Ilive-location" element={<ILiveLocation />} />
      <Route path="/Iemergency-contacts" element={<IEmergencyContacts />} />
      <Route path="/Ihidden-camera" element={<IHiddenCamera />} />
      <Route path="/Ilive-audio" element={<ILiveAudio />} />
      <Route path="/Ialert-bell" element={<IAlertBell />} />
    </Routes>
  );
}

export default AppRouter;
