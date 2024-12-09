import React, { useState, useEffect } from "react";
import { getClassList, getUserList } from "../api/sheetdb"; // Import API functions
import "./Students.css";

const Students = () => {
  // State for dynamic class data and selected class
  const [classesData, setClassesData] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);

  const teacherID = "U-123456";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classes_uf, users] = await Promise.all([getClassList(), getUserList()]);
        console.log("Classes:", classes_uf);
        console.log("Users:", users);

        const classes = classes_uf.filter((cls) => cls["teacher-id"] === teacherID);
  
        // Create user map
        const userMap = users.reduce((map, user) => {
          map[user.userID] = user["display-name"];
          return map;
        }, {});
        console.log("User Map:", userMap);
  
        // Transform class data
        const classDataMap = classes.reduce((map, cls) => {
          const studentIDs = JSON.parse(cls["student-list"]);
          const studentData = studentIDs.map((id) => ({
            name: userMap[id] || "Unknown Student",
            score: 1,
          }));
          map[cls["class-name"]] = studentData;
          return map;
        }, {});
  
        console.log("Class Data Map:", classDataMap);
        setClassesData(classDataMap);
  
        if (Object.keys(classDataMap).length > 0) {
          setSelectedClass(Object.keys(classDataMap)[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  // Remove student from the selected class
  const removeStudent = (index) => {
    const updatedClassData = { ...classesData };
    updatedClassData[selectedClass] = updatedClassData[selectedClass].filter(
      (_, i) => i !== index
    );
    setClassesData(updatedClassData);
  };

  if (loading) {
    return <div>Loading students...</div>;
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <div className="dropdown">
          <h2 className="dropdown-title">
            {selectedClass} <span className="dropdown-arrow">▼</span>
          </h2>
          <div className="dropdown-menu">
            {Object.keys(classesData).map((className) => (
              <div
                key={className}
                className="dropdown-item"
                onClick={() => setSelectedClass(className)}
              >
                {className}
              </div>
            ))}
          </div>
        </div>
        <button className="add-student">Add Student</button>
      </div>
      <div className="students-list">
        {classesData[selectedClass] && classesData[selectedClass].length > 0 ? (
          classesData[selectedClass].map((student, index) => (
            <div key={index} className="student-item">
              <span className="student-name">{student.name}</span>
              <span className="student-score">{student.score} Q</span>
              <button
                className="remove-button"
                onClick={() => removeStudent(index)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No students found for this class.</p>
        )}
      </div>
    </div>
  );
};

export default Students;
