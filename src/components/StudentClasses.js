import React, { useEffect, useState } from "react";
import { getClassList, getUserList } from "../api/sheetdb";
import "./StudentClasses.css";

const StudentClasses = () => {
  const studentID = "U-654321"; // Hardcoded student ID for now
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Fetch class list and user list
        const [classList, users] = await Promise.all([getClassList(), getUserList()]);

        console.log("Class List:", classList);
        console.log("Users:", users);

        // Create a teacher map for easy lookup
        const teacherMap = users.reduce((map, user) => {
          map[user.userID] = user["display-name"];
          return map;
        }, {});
        console.log("Teacher Map:", teacherMap);

        // Filter classes where the studentID is in the student-list
        const studentClasses = classList.filter((cls) => {
          const studentList = JSON.parse(cls["student-list"] || "[]");
          return studentList.includes(studentID);
        });

        // Transform class data for rendering
        const transformedClasses = studentClasses.map((cls) => ({
          period: cls.period || "N/A",
          name: cls["class-name"] || "Unknown Class",
          teacher: teacherMap[cls["teacher-id"]] || "Unknown Teacher",
          color: cls.color || "#CCCCCC", // Default color if not provided
        }));

        setClassData(transformedClasses);
      } catch (error) {
        console.error("Error fetching student classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [studentID]);

  if (loading) {
    return <div>Loading classes...</div>;
  }

  return (
    <div className="student-classes-container">
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
              <span className="students-count">{classItem.teacher}</span>
              <button className="add-button">+</button>
            </div>
          ))
        ) : (
          <p>No classes found for this student.</p>
        )}
      </div>
    </div>
  );
};

export default StudentClasses;
