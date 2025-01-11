// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import GestureSOS from "../components/GestureSOS";
// import LiveLocation from "../components/LiveLocation";
// import EmergencyContacts from "../components/EmergencyContacts";
// import HiddenCamera from "../components/HiddenCamera";
// import LiveAudio from "../components/LiveAudio";
// import AlertBell from "../components/AlertBell";
// import SplashScreen from "../components/SplashScreen";

// function AppRouter() {
//   return (
//     <Routes>
//       {/* Default Route */}
//       <Route path="/" element={<Navigate to="/splash-screen" />} />
      
//       {/* Pages */}
//       <Route path="/splash-screen" element={<SplashScreen />} />
//       <Route path="/gesture-sos" element={<GestureSOS />} />
//       <Route path="/live-location" element={<LiveLocation />} />
//       <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      
//       <Route path="/hidden-camera" element={<HiddenCamera />} />
//       <Route path="/live-audio" element={<LiveAudio />} />
//       <Route path="/alert-bell" element={<AlertBell />} />
//     </Routes>
//   );
// }

// export default AppRouter;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GestureSOS from "../components/GestureSOS";
import LiveLocation from "../components/LiveLocation";
import EmergencyContacts from "../components/EmergencyContacts";
import HiddenCamera from "../components/HiddenCamera";
import LiveAudio from "../components/LiveAudio";
import AlertBell from "../components/AlertBell";
import SplashScreen from "../components/SplashScreen";

function AppRouter() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/splash-screen" />} />
      
      {/* Pages */}
      <Route path="/splash-screen" element={<SplashScreen />} />
      <Route path="/gesture-sos" element={<GestureSOS />} />
      <Route path="/live-location" element={<LiveLocation />} />
      <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      <Route path="/hidden-camera" element={<HiddenCamera />} />
      <Route path="/live-audio" element={<LiveAudio />} />
      <Route path="/alert-bell" element={<AlertBell />} />
    </Routes>
  );
}

export default AppRouter;
