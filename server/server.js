import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data;
};

export const signUp = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, { email, password });
  return response.data;
};

export const getResults = async () => {
  const response = await axios.get(`${API_BASE_URL}/results`);
  return response.data;
};

export const addResult = async (result) => {
  const response = await axios.post(`${API_BASE_URL}/results`, result);
  return response.data;
};

export const deleteResult = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/results/${id}`);
  return response.data;
};
