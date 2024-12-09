import React, { useState } from "react";
import Header from "./Header";
import Classes from "./Classes";
import Students from "./Students";
import QButtons from "./QButtons";
import LastQuestion from "./LastQuestion";
import CreateQ from "./CreateQ";

const Dashboard = ({ handleNavigation }) => {
  const [isCreateQVisible, setIsCreateQVisible] = useState(false); // Manage popup visibility

  return (
    <div>
      {/* Header */}
      <Header handleNavigation={handleNavigation} />

      {/* Dashboard Content */}
      <div style={styles.dashboardContainer}>
        <Classes />
        <Students />
        <LastQuestion />
      </div>

      {/* QButtons always visible */}
      <QButtons openCreateQ={() => setIsCreateQVisible(true)} />

      {/* CreateQ Modal */}
      {isCreateQVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <CreateQ onClose={() => setIsCreateQVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for layout and modal
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
};

export default Dashboard;
