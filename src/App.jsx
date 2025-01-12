
import React from 'react'; // Explicitly import React
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
