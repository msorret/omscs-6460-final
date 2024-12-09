import axios from "axios";

const BASE_URL = "https://sheetdb.io/api/v1/f3t1sroop4up9";

export const getUserList = async () => {
  const response = await axios.get(`${BASE_URL}?sheet=User-List`);
  return response.data;
};

export const getClassList = async () => {
  const response = await axios.get(`${BASE_URL}?sheet=Class-List`);
  return response.data;
};

export const getQList = async () => {
  const response = await axios.get(`${BASE_URL}?sheet=Q-List`);
  return response.data;
};

export const getQResponses = async () => {
  const response = await axios.get(`${BASE_URL}?sheet=Q-Responses`);
  return response.data;
};

// Post a New Question to the Q-List Sheet
export const postQ = async (questionObject) => {
    try {
      const response = await axios.post(`${BASE_URL}?sheet=Q-List`, questionObject);
      console.log("Question posted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error posting question:", error);
      throw error;
    }
};
// Function to post a response to the Q-Responses sheet
export const postQResponse = async (response) => {
    try {
      const url = `${BASE_URL}?sheet=Q-Responses`;
      const res = await axios.post(url, response);
      console.log("Response submitted successfully:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error submitting response:", error);
      throw error; // Propagate the error for handling by the caller
    }
  };