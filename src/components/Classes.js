import React, { useState, useEffect } from "react";
import { getClassList } from "../api/sheetdb";
import "./Classes.css";

const Classes = () => {
  const teacherID = "U-123456"; // Hardcoded teacher ID
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await getClassList();
        console.log("Classes fetched from API:", classes);

        // Filter classes for the current teacher
        const filteredClasses = classes.filter((cls) => cls["teacher-id"] === teacherID);

        // Transform class data into the required format
        const transformedClasses = filteredClasses.map((cls) => ({
          period: cls.period,
          name: cls["class-name"],
          students: JSON.parse(cls["student-list"]).length, // Parse student list and get count
          color: cls.color || "#CCCCCC", // Default color if not provided
        }));

        setClassData(transformedClasses);
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [teacherID]);

  if (loading) {
    return <div>Loading classes...</div>;
  }

  return (
    <div className="classes-container">
      <div className="classes-header">
        <h2>My Classes</h2>
        <button className="edit-classes">Edit Classes</button>
      </div>
      <div className="class-list">
        {classData.length > 0 ? (
          classData.map((classItem, index) => (
            <div key={index} className="class-item">
              <div
                className="period-bubble"
                style={{ backgroundColor: classItem.color }}
              >
                {classItem.period}
              </div>
              <span className="class-name">{classItem.name}</span>
              <span className="students-count">
                {classItem.students} students
              </span>
              <button className="add-button">+</button>
            </div>
          ))
        ) : (
          <p>No classes found for this teacher.</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
