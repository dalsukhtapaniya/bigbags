import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY; // Use environment variable

export default {
  async getSolanaTokens(page = 1, per_page = 250) {
    return axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        category: 'meme-token',
        order: 'market_cap_desc',
        per_page,
        page,
        price_change_percentage: '7d,24h',
      },
      headers: {
        'x-cg-pro-api-key': API_KEY,
      },
    });
  },
};
