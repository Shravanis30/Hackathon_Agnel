import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/emergency-contacts">Emergency Contacts</Link></li>
        <li><Link to="/live-location">Live Location</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
