import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const getMenuItems = async () => {
  const response = await axios.get(`${API_URL}/menu`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};
// Add these functions to your existing api.js file

// Get all menu categories
export const getAllMenu = async () => {
  const response = await axios.get(`${API_URL}/menu`);
  return response.data;
};

// Add a new item to a category
export const addItemToCategory = async (category, itemData) => {
  const response = await axios.post(`${API_URL}/menu/${category}/items`, itemData);
  return response.data;
};

// Delete an item from a category
export const deleteItemFromCategory = async (category, itemId) => {
  const response = await axios.delete(`${API_URL}/menu/${category}/items/${itemId}`);
  return response.data;
};

// Get all orders
export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/admin/orders`);
  return response.data;
};

// Mark order as done
export const markOrderAsDone = async (orderId) => {
  const response = await axios.put(`${API_URL}/admin/orders/${orderId}/done`);
  return response.data;
};

// Update order
export const updateOrder = async (orderId, updatedData) => {
  const response = await axios.put(`${API_URL}/admin/orders/${orderId}`, updatedData);
  return response.data;
};

// Delete order
export const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${API_URL}/admin/orders/${orderId}`);
  return response.data;
};
// Add to your existing api.js

// Submit feedback
export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(`${API_URL}/orders/feedback`, feedbackData);
  return response.data;
};

// Get all feedbacks
export const getAllFeedbacks = async () => {
  const response = await axios.get(`${API_URL}/orders/feedbacks`);
  return response.data;
};
