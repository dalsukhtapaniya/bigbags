<template>
  <div id="app" class="bg-custom-bg min-h-screen px-[16px] lg:px-[100px] lg:pt-[44px] pt-[16px]">
    <!-- Navbar -->
    <header class="header">
      <img src="./assets/logo.svg" alt="logo" class="w-auto h-[32px] lg:h-[36px]">
      <span class="header-text hidden lg:block">Eliminate jargon, Trade top pools</span>
      <a href="#" class="btn community-button px-[14px] py-[9px]">
        <img src="./assets/icons/telegram.svg" alt="telegram" class="w-auto h-[24px]">
        <span>Join Community</span>
      </a>
    </header>

    <div class="header-text block lg:hidden flex justify-center mt-[24px]">
      <span>Eliminate jargon, Trade top pools</span>
    </div>

    <!-- Filter Section -->
    <div class="flex flex-col sm:flex-row justify-center my-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="filter px-[14px] py-[8px] rounded-full">
        <img src="./assets/icons/network.svg" alt="Network Icon" class="w-auto h-[16px] opacity-50">
        <span class="opacity-50"> Network:</span>
        <img src="./assets/icons/solana.png" alt="Network Icon" class="w-auto h-[20px]">
        <span> Solana</span>
      </div>
      <div class="filter px-[14px] py-[8px] rounded-full">
        <img src="./assets/icons/clock.svg" alt="Network Icon" class="w-auto h-[16px] opacity-50">
        <span class="opacity-50"> Last:</span>
        <span> 7 Days</span>
      </div>
      <div class="filter px-[14px] py-[8px] rounded-full">
        <img src="./assets/icons/growth.svg" alt="Network Icon" class="w-auto h-[16px] opacity-50">
        <span class="opacity-50"> Growth:</span>
        <span class="text-green-500">20% +</span>
      </div>
    </div>

    <!-- Pool Table -->
    <div v-if="loading">Loading tokens...</div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-center text-white"
        style="border-spacing: 0 10px;">
        <thead>
          <tr class="table-head">
            <th class="py-3 px-5">TOKEN</th>
            <th class="py-3 px-5">PRICE</th>
            <th class="py-3 px-5">AGE</th>
            <th class="py-3 px-5">TXS</th>
            <th class="py-3 px-5">LIQUIDITY</th>
            <th class="py-3 px-5">VOL</th>
            <th class="py-3 px-5">24H</th>
            <th class="py-3 px-5">7D</th>
            <th class="py-3 px-5"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="token in tokens" :key="token.id">
            <td class="py-[12px] px-[12px] flex items-center min-w-[160px]">
              <img :src="token.image" alt="Token Icon" class="w-[44px] h-[44px] mr-2 rounded-full">
              <div class="flex flex-col items-start">
                <span class="text-white">{{ token.name }}</span>
                <span class="text-white text-sm opacity-50">Token</span>
              </div>
            </td>
            <td class="py-3 px-5">${{ token.current_price }}</td>
            <td class="py-3 px-5">7d</td>
            <td class="py-3 px-5">6969</td>
            <td class="py-3 px-5">{{ token.market_cap }}</td>
            <td class="py-3 px-5">{{ token.total_volume }}</td>
            <td class="py-3 px-5 text-green-500">
              {{ token.price_change_percentage_24h_in_currency }}</td>
            <td class="py-3 px-5 text-green-500">
              {{ token.price_change_percentage_7d_in_currency }}</td>
            <td class="py-[12px] px-[12px]">
              <a href="#" class="btn button-trade px-[14px] py-[9px] w-max lg:w-auto">
                <span>Trade Now</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import coingeckoService from '@/services/api';

export default {
  data() {
    return {
      tokens: [],
      loading: true,
    };
  },
  created() {
    this.fetchTokens();
  },
  methods: {
    async fetchTokens() {
      const API_BASE_URL = 'https://api.coingecko.com/api/v3';
      const API_KEY = process.env.COINGECKO_API_KEY;

      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          category: 'meme-token',
          order: 'market_cap_desc',
          per_page: 250,
          page: 1,
          price_change_percentage: '7d,24h',
        },
        headers: {
          'x-cg-pro-api-key': API_KEY,
        },
      });
      this.tokens = response.data;
      this.loading = false;
      console.log(this.tokens[1].name);
    },
  },
};
</script>

<style scoped>
/* You can add any custom styles here */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 24px;
  padding-right: 10px;
  background-color: #133B3A30;
  border: 1px solid #FFFFFF10;
  border-radius: 9999px;
  backdrop-filter: blur(24px);
  position: sticky;
  top: 44px;
  z-index: 10;
}

.header-text {
  font-size: 20px;
  font-weight: 500;
  background: radial-gradient(50% 50% at 50% 50%, #F6FFF7 0%, #CEFFD5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.community-button {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 9999px;
  background-color: #2AB229;
  border: 1px solid #FFFFFF10;
}

.community-button:hover {
  background-color: #158814;
}

.filter {
  color: #FFFFFF;
  border-radius: 9999px;
  text-align: center;
  border: 1px solid #FFFFFF20;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 400;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

td {
  background: linear-gradient(180deg, #1F3234 0%, #0E1E21 100%);
}

td:first-child
{
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
td:last-child
{
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
}

.table-head {
  color: #F6FFF760;
  font-size: 16px;
  font-weight: 500;
}

.rawborder {
  border: 1px solid #FFFFFF20;
}

.button-trade {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid #2AB229;
}

.button-trade:hover {
  background-color: #2AB229;
}
</style>
