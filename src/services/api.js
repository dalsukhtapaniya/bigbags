import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

export async function fetchTokens(category) {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/markets?vs_currency=usd&category=${category}&order=volume_desc&price_change_percentage=24h%2C7d`, {
      // params: {
      //   vs_currency: 'usd',
      //   category: category,
      //   order: 'volume_desc',
      //   price_change_percentage: '24h,7d',
      //   sparkline: true,
      // },
      headers: {
        accept: 'application/json',
        'x-cg-pro-api-key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
}

export async function fetchTokenAddress(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${id}`, {
      headers: {
        'x-cg-pro-api-key': API_KEY,
      },
    });
    return response.data.contract_address;
  } catch (error) {
    console.error('Error fetching token address:', error);
    throw error;
  }
}
