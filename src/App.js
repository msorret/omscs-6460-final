import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  // Handler for switching views
  const handleNavigation = (view) => {
    console.log("Navigating to:", view); // Debugging log
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === "dashboard" && (
        <Dashboard handleNavigation={handleNavigation} />
      )}

    {currentView === "settings" && (
        <Settings handleNavigation={handleNavigation} />
      )}
    </div>
  );
}

export default App;
