
//if mo gamit tag psgc API para sa address
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://psgc.gitlab.io/api/', // Replace with the actual PSGC API URL
  timeout: 5000, // Optional: Set timeout
});

export const getProvinces = async () => {
  try {
    const response = await api.get('/provinces');
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const getCities = async (provinceCode) => {
  try {
    const response = await api.get(`/cities?province=${provinceCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const getBarangays = async (cityCode) => {
  try {
    const response = await api.get(`/barangays?city=${cityCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching barangays:', error);
    throw error;
  }
};
