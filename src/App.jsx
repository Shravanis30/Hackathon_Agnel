// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// // import Home from "./pages/HomePage";
// import Profile from "./pages/Profile";
// import HomePage from "./pages/HomePage";

// function App() {
//   return (
//     <Router>
//       <div className="bg-pink-100 min-h-screen">
//         <Routes>
//           <Route path="/Login" element={<Login />} />
//           <Route path="/" element={<Register />} />
//           <Route path="/homepage" element={<HomePage />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import WelcomePage from "./components/WelcomePage";
import SOSPage from "./components/SOSPage";
import SpyCameraPage from "./components/SpyCameraPage";
import ShareLocationPage from "./components/ShareLocationPage";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LocationMap from "./components/LocationMap";
import SaveUserComponent from "./components/SaveUserComponent";
import FetchUsersComponent from "./components/FetchUsersComponent";
// import AppRouter from "./router/AppRouter";



function App() {
  return (
    <Router>
      <Routes>
      {/* <AppRouter /> */}
      <Route path="/map" element={<LocationMap />} />
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/spy-camera" element={<SpyCameraPage />} />
        <Route path="/share-location" element={<ShareLocationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/save-user" element={<SaveUserComponent />} />
        <Route path="/fetch-users" element={<FetchUsersComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
