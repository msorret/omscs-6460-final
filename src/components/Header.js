import React from "react";
import "./Header.css";

// Importing images
import logo from "../assets/logo.png";
import homeIcon from "../assets/home-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import notificationIcon from "../assets/notification-icon.png";

const Header = ({ handleNavigation }) => {
  return (
    <div className="header">
      {/* Logo and Title */}
      <div className="logo-container">
        <img src={logo} alt="LiveQ Logo" />
        <h1>LiveQ</h1>
      </div>

      {/* Circle Buttons */}
      <div className="header-buttons">
        <button onClick={() => handleNavigation("dashboard")}>
          <img src={homeIcon} alt="Home Icon" />
        </button>
        <button onClick={() => handleNavigation("settings")}>
          <img src={settingsIcon} alt="Settings Icon" />
        </button>
        <button>
          <img src={notificationIcon} alt="Notifications Icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
