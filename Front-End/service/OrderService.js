import axios from "axios";

const BASE_URL = "http://localhost:8088/api/orders";

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, orderData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { createOrder };
