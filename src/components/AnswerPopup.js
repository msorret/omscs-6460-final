import React, { useState } from "react";
import "./AnswerPopup.css";
import logo from "../assets/logo.png";

const AnswerPopup = ({ question, onClose, onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleOptionToggle = (option) => {
    setAnswer((prev) =>
      prev === option ? "" : option // Toggle option selection
    );
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
      <div className="logo-container">
        <img src={logo} alt="LiveQ Logo" />
        <h1>LiveQ</h1>
      </div>
        <p>{question.question}</p>
        {question.options.length > 0 ? (
          <div className="options-list">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  answer === option ? "selected" : ""
                }`}
                onClick={() => handleOptionToggle(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows={4}
          />
        )}
        <div className="popup-buttons">
          <button onClick={() => onSubmit(answer)} disabled={!answer}>
            Submit
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AnswerPopup;
