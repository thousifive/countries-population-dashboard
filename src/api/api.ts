import axios from "axios";

const API_URL = "https://api.sampleapis.com/countries/countries";

export const getCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data", error);
    return [];
  }
};
