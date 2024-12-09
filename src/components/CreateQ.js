import React, { useState, useEffect } from "react";
import { getClassList, postQ } from "../api/sheetdb"; // Replace with your API file
import "./CreateQ.css";

const CreateQ = ({ onClose }) => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    selectedClass: "",
    questionType: "Multiple Choice",
    numberOfAnswers: 1, // Default number of options
    questionContent: "",
    options: [""],
    correctAnswers: [],
    timeLimit: 5,
    multipleSubmissions: false,
    submissionLimit: 1,
  });

  useEffect(() => {
    // Fetch classes dynamically
    const fetchClasses = async () => {
      try {
        const classList = await getClassList();
        setClasses(classList);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    setForm((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions};
    });
  };

  const handleCorrectAnswerToggle = (index) => {
    setForm((prev) => {
      const updatedCorrectAnswers = [...prev.correctAnswers];
      if (updatedCorrectAnswers.includes(index)) {
        return {
          ...prev,
          correctAnswers: updatedCorrectAnswers.filter((i) => i !== index),
        };
      } else {
        return { ...prev, correctAnswers: [...updatedCorrectAnswers, index] };
      }
    });
  };

  const handleNumberOfOptionsChange = (value) => {
    const numOptions = Math.max(1, parseInt(value) || 1);
    setForm((prev) => ({
      ...prev,
      numberOfAnswers: numOptions,
      options: Array(numOptions).fill("").map((_, i) => prev.options[i] || ""),
      correctAnswers: prev.correctAnswers.filter((i) => i < numOptions),
    }));
  };

  const handleSubmit = async () => {
    try {

    const selectedClass = classes.find(
        (cls) => cls.classID === form.selectedClass
        );
     const className = selectedClass ? selectedClass["class-name"] : "Unknown";
      
      const questionObject = {
        "q-id": `Q-${Date.now()}`,
        "teacher-id": "U-123456",
        "class-id-list": `["${className}"]`,
        "question-type": form.questionType,
        "answer-number": form.numberOfAnswers,
        "correct-answer": form.correctAnswers.map((i) => form.options[i]).join(", "),
        "due-date": new Date(Date.now() + form.timeLimit * 60 * 1000).toISOString(),
        "multiple-submission-limit": form.multipleSubmissions
          ? form.submissionLimit
          : "N/A",
        "question-content": form.questionContent,
        options: JSON.stringify(form.options),
        comments: "N/A",
      };

      await postQ(questionObject);
      alert("Question created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <div className="create-q-container">
      <h2>Create a Q</h2>
      <div>
        <label>Send to</label>
        <select
          value={form.selectedClass}
          onChange={(e) => handleInputChange("selectedClass", e.target.value)}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.classID} value={cls.classID}>
              {cls["class-name"]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Question Type</label>
        <select
          value={form.questionType}
          onChange={(e) => handleInputChange("questionType", e.target.value)}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="Short Answer">Short Answer</option>
        </select>
      </div>
      <div>
        <label>Number of Options</label>
        <input
          class = "number-input"
          type="number"
          value={form.numberOfAnswers}
          onChange={(e) => handleNumberOfOptionsChange(e.target.value)}
        />
      </div>
      <div>
        <label>Question</label>
        <input
          type="text"
          value={form.questionContent}
          onChange={(e) => handleInputChange("questionContent", e.target.value)}
        />
      </div>
      <div>
        <label>Options</label>
        {form.options.map((option, index) => (
          <div key={index} className="option-fields">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <input
              type="checkbox"
              checked={form.correctAnswers.includes(index)}
              onChange={() => handleCorrectAnswerToggle(index)}
            />
            <label>Correct Answer</label>
          </div>
        ))}
      </div>
      <div>
        <label>Time Limit (minutes)</label>
        <input
         class = "number-input"
          type="number"
          value={form.timeLimit}
          onChange={(e) => handleInputChange("timeLimit", e.target.value)}
        />
      </div>
      <div>
        <label>Multiple Submissions</label>
        <input
          type="checkbox"
          checked={form.multipleSubmissions}
          onChange={(e) =>
            handleInputChange("multipleSubmissions", e.target.checked)
          }
        />
        {form.multipleSubmissions && (
          <input
          class = "number-input"
            type="number"
            value={form.submissionLimit}
            onChange={(e) => handleInputChange("submissionLimit", e.target.value)}
          />
        )}
      </div>
      <div className="buttons-container">
        <button className="create-button" onClick={handleSubmit}>Create</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateQ;
