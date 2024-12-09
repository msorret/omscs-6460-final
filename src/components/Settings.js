import React from "react";
import Header from "./Header";
import StudentDashboard from "./StudentFeed";
import QButtons from "./QButtons";
import StudentClasses from "./StudentClasses"
import StatsCard from "./StatsCard";


const Settings = ({ handleNavigation }) => {
    return (
      <div>
        <Header handleNavigation={handleNavigation} />
        <StudentDashboard />
        <QButtons />
        <StudentClasses />
        <StatsCard />

        
      </div>
    );
  };
  
  // Inline styles for simplicity
  const styles = {
   
  };
  
  export default Settings;