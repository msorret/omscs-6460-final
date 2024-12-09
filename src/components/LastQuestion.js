import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getQList, getQResponses, getClassList } from "../api/sheetdb";
import "./LastQuestion.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const LastQuestion = () => {
  const teacherID = "U-123456"; // Hardcoded teacher ID
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastQuestion = async () => {
      try {
        // Fetch questions, responses, and class list
        const [questions, responses, classList] = await Promise.all([
          getQList(),
          getQResponses(),
          getClassList(),
        ]);

        console.log("Fetched Questions:", questions);
        console.log("Fetched Responses:", responses);
        console.log("Fetched Class List:", classList);

        // Create a class map for easy lookup
        const classMap = classList.reduce((map, cls) => {
          map[cls.classID] = cls["class-name"];
          return map;
        }, {});

        console.log("Class Map:", classMap);

        // Filter questions for the teacher
        const teacherQuestions = questions.filter((q) => q["teacher-id"] === teacherID);
        console.log("Filtered Teacher Questions:", teacherQuestions);

        if (teacherQuestions.length === 0) {
          console.warn("No questions found for this teacher.");
          return;
        }

        // Sort by most recent due date
        const latestQuestion = teacherQuestions.sort(
          (a, b) => new Date(b["due-date"]) - new Date(a["due-date"])
        )[0];
        console.log("Latest Question:", latestQuestion);

        // Find the class name for the class ID in the question
        const classIDs = JSON.parse(latestQuestion["class-id-list"]);
        const classNames = classIDs.map((id) => classMap[id] || "Unknown Class").join(", ");

        setQuestionDetails({
          text: latestQuestion["question-content"],
          subtext:
            latestQuestion["multiple-submission-limit"] === "N/A"
              ? "One Correct Answer"
              : "Multiple Submissions Allowed",
          className: classNames, // Use class names
          type: latestQuestion["question-type"],
        });

        // Parse options and initialize response counts
        const options = JSON.parse(latestQuestion.options);
        console.log("Options for the Latest Question:", options);

        const responseCounts = options.reduce((acc, option) => {
          acc[option] = 0;
          return acc;
        }, {});
        console.log("Initialized Response Counts:", responseCounts);

        // Count responses for the latest question
        const questionResponses = responses.filter((res) => res["q-id"] === latestQuestion["q-id"]);
        console.log("Responses for the Latest Question:", questionResponses);

        questionResponses.forEach((res) => {
          if (responseCounts[res["user-answer"]] !== undefined) {
            responseCounts[res["user-answer"]] += 1;
          }
        });
        console.log("Final Response Counts:", responseCounts);

        // Prepare Chart.js data
        setChartData({
          labels: options,
          datasets: [
            {
              label: "Responses",
              data: options.map((option) => responseCounts[option] || 0),
              backgroundColor: "#4494ed",
            },
          ],
        });

        setChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching last question data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastQuestion();
  }, [teacherID]);

  if (loading) {
    return <div>Loading last question...</div>;
  }

  if (!questionDetails || !chartData || !chartOptions) {
    console.error("Missing Data:", { questionDetails, chartData, chartOptions });
    return <div>No data available for the last question.</div>;
  }

  return (
    <div className="last-question-container">
      <div className="last-question-header">
        <h2>My Last Q</h2>
        <div className="tags">
          <span className="tag purple">{questionDetails.className}</span>
          <span className="tag yellow">{questionDetails.type}</span>
        </div>
      </div>
      <div className="question-text">
        <p>{questionDetails.text}</p>
        <p className="subtext">{questionDetails.subtext}</p>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LastQuestion;
