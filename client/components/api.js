
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Signup failed', error);
    return { success: false };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    return { success: false };
  }
};

export const addResult = async (resultData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/results`, resultData);
    return response.data;
  } catch (error) {
    console.error('Submit result failed', error);
    return { success: false };
  }
};

export const getResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/results`);
    return response.data;
  } catch (error) {
    console.error('Get results failed', error);
    return { success: false };
  }
};

export const deleteResult = async (student_name) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/results`, { data: { student_name } });
    return response.data;
  } catch (error) {
    console.error('Delete result failed', error);
    return { success: false };
  }
};
