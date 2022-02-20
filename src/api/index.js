import axios from 'axios';

const BASE_URL = "http://localhost:4000";

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    console.log('this is the get something data', data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await fetch(`${BASE_URL}/api/products`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await fetch(`${BASE_URL}/api/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}