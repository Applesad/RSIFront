import axios from "axios";

export const addFlight = async (model) => {
  try {
    console.log(model)
    const response = await axios.post(
      "https://localhost:7289/Flight/AddFlight",
      model,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add flight");
  }
};
