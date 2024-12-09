import React from "react";
import "./StatsCard.css"; // Import the CSS file

const StatsCard = () => {
  return (
    <div className="stats-card">
      {/* Left: Circular Progress */}
      <div className="stats-progress">
        <svg className="progress-ring" width="70" height="70">
          <circle
            className="progress-ring-circle-bg"
            cx="35"
            cy="35"
            r="30"
            strokeWidth="8"
          />
          <circle
            className="progress-ring-circle"
            cx="35"
            cy="35"
            r="30"
            strokeWidth="8"
            style={{ strokeDasharray: "188.4", strokeDashoffset: "37.68" }}
          />
        </svg>
        <div className="progress-text">96 Q</div>
      </div>

      {/* Right: Stats Text */}
      <div className="stats-details">
        <h2 className="stats-title">Your Stats</h2>
        <p className="stats-lifetime">
          <span className="highlight-orange">321</span> Lifetime Qs
        </p>
        <p className="stats-rate">
          <span className="highlight-purple">89%</span> Answer Rate
        </p>
        <button className="cash-out-button">Cash Out</button>
      </div>
    </div>
  );
};

export default StatsCard;
