import axios from "axios";
const BASE_URL = "http://localhost:8088/api/auth";

const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { signup, login };
