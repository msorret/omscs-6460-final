import React, { useEffect, useState } from "react";
import { getQList, getClassList, getUserList, getQResponses, postQResponse } from "../api/sheetdb";
import "./StudentFeed.css";
import AnswerPopup from "./AnswerPopup";

const StudentFeed = () => {
  const studentID = "U-654321"; // Hardcoded student ID for now
  const [feedItems, setFeedItems] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const [questions, responses, classList, users] = await Promise.all([
          getQList(),
          getQResponses(),
          getClassList(),
          getUserList(),
        ]);

        const classMap = classList.reduce((map, cls) => {
          map[cls.classID] = {
            period: cls.period,
            color: cls.color || "#CCCCCC",
            name: cls["class-name"],
            students: JSON.parse(cls["student-list"] || "[]"),
          };
          return map;
        }, {});

        const userMap = users.reduce((map, user) => {
          map[user.userID] = user["display-name"];
          return map;
        }, {});

        const studentClasses = Object.entries(classMap)
          .filter(([, cls]) => cls.students.includes(studentID))
          .map(([classID]) => classID);

        const feedData = questions
          .filter((q) => {
            const assignedClasses = JSON.parse(q["class-id-list"] || "[]");
            return assignedClasses.some((classID) => studentClasses.includes(classID));
          })
          .map((q) => {
            const assignedClassID = JSON.parse(q["class-id-list"])[0];
            const classInfo = classMap[assignedClassID];

            return {
              id: q["q-id"],
              color: classInfo?.color || "#CCCCCC",
              period: classInfo?.period || "N/A",
              question: q["question-content"],
              from: userMap[q["teacher-id"]] || "Unknown Teacher",
              options: JSON.parse(q.options || "[]"), // Parse options
              status: "Open",
            };
          });

        setFeedItems(feedData);
      } catch (error) {
        console.error("Error fetching student feed data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedData();
  }, [studentID]);

  const handleAnswerSubmit = async (answer) => {
    try {
      const response = {
        "q-id": selectedQuestion.id,
        "user-id": studentID,
        "class-id": selectedQuestion.classID,
        "teacher-id": selectedQuestion.teacherID,
        "time-stamp": new Date().toISOString(),
        "user-answer": answer,
      };

      await postQResponse(response);
      alert("Answer submitted successfully!");
      setSelectedQuestion(null); // Close the popup
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (loading) {
    return <div>Loading feed...</div>;
  }

  return (
    <div className="my-feed-container">
      <div className="my-feed-header">
        <h1 className="my-feed-title">My Feed</h1>
      </div>
      <div className="my-feed-content">
        <div className="class-list">
          {feedItems.length > 0 ? (
            feedItems.map((feedItem, index) => (
              <div key={index} className="class-item">
                <div
                  className="period-bubble"
                  style={{ backgroundColor: feedItem.color }}
                >
                  {feedItem.period}
                </div>
                <span className="class-name">{feedItem.question}</span>
                <span className="students-count">{feedItem.from}</span>
                <button
                  className="status-button"
                  onClick={() => setSelectedQuestion(feedItem)}
                >
                  {feedItem.status}
                </button>
              </div>
            ))
          ) : (
            <p>No feed items available.</p>
          )}
        </div>
      </div>
      {selectedQuestion && (
        <AnswerPopup
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onSubmit={handleAnswerSubmit}
        />
      )}
    </div>
  );
};

export default StudentFeed;
