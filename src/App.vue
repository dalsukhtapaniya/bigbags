<template>
  <div id="app" class="bg-custom-bg min-h-screen
    px-[16px] lg:px-[100px] lg:pt-[44px] pt-[16px] lg:pb-[44px]">
    <!-- Navbar -->
    <header class="header">
      <img src="./assets/logo.svg" alt="logo" class="w-auto h-[32px] lg:h-[36px]">
      <span class="header-text hidden lg:block">Eliminate jargon, Trade top 100 memes</span>
      <a href="#" class="btn community-button px-[14px] py-[9px]">
        <img src="./assets/icons/telegram.svg" alt="telegram" class="w-auto h-[24px]">
        <span>Join Community</span>
      </a>
    </header>

    <div class="header-text block lg:hidden flex justify-center mt-[54px]">
      <span>Eliminate jargon, Trade top 100 memes</span>
    </div>

    <!-- Filter Section -->
    <div class="flex flex-col sm:flex-row justify-center my-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <a href="#" class="filter px-[14px] py-[8px] rounded-full"
        :class="currentCategory === 'solana-meme-coins' ? 'filterActive' : 'filterInactive'"
        @click="fetchTokens('solana-meme-coins')">
        <img src="./assets/icons/solana.png" alt="Network Icon" class="w-auto h-[20px]">
        <span>Solana</span>
      </a>
      <a href="#" class="filter px-[14px] py-[8px] rounded-full"
        :class="currentCategory === 'pump-fun' ? 'filterActive' : 'filterInactive'"
        @click="fetchTokens('pump-fun')">
        <img src="./assets/icons/pump.png" alt="Network Icon" class="w-auto h-[20px]">
        <span>Pump Fun</span>
      </a>
      <a href="#" class="filter px-[14px] py-[8px] rounded-full"
        :class="currentCategory === 'base-meme-coins' ? 'filterActive' : 'filterInactive'"
        @click="fetchTokens('base-meme-coins')">
        <img src="./assets/icons/base.png" alt="Network Icon" class="w-auto h-[20px]">
        <span>Base</span>
      </a>
      <!-- <a href="#" class="filter px-[14px] py-[8px] rounded-full"
        :class="currentCategory === 'binance-smart-chain' ? 'filterActive' : 'filterInactive'"
        @click="fetchTokens('binance-smart-chain')">
        <img src="./assets/icons/solana.png" alt="Network Icon" class="w-auto h-[20px]">
        <span>BNB</span>
      </a>
      <a href="#" class="filter px-[14px] py-[8px] rounded-full"
        :class="currentCategory === 'meme-token' ? 'filterActive' : 'filterInactive'"
        @click="fetchTokens('meme-token')">
        <img src="./assets/icons/solana.png" alt="Network Icon" class="w-auto h-[20px]">
        <span>Meme</span>
      </a> -->
    </div>

    <!-- Pool Table -->
    <div class="overflow-x-auto">
      <div v-if="loading" class="flex justify-center items-center">
        <img src="./assets/icons/loadingSpinner.svg" alt="loading"
          class="w-auto h-[44px] mt-[100px]">
      </div>
      <table v-else class="min-w-full text-center text-white"
        style="border-spacing: 0 10px;">
        <thead>
          <tr class="table-head">
            <th class="py-3 px-5 text-left">TOKEN</th>
            <th class="py-3 px-5">PRICE</th>
            <th class="py-3 px-5">
              <a href="#" @click="sortBy24h">
                24H
              </a>
            </th>
            <th class="py-3 px-5" @click="sortBy7d">
              <a href="#" @click="sortBy7d">
                7D
              </a>
            </th>
            <th class="py-3 px-5" @click="sortByMcap24h">
              <a href="#" @click="sortByMcap24h">
                MCAP 24H
              </a>
            </th>
            <th class="py-3 px-5" @click="sortByTotalMcap">
              <a href="#" @click="sortByTotalMcap">
                TOTAL MCAP</a>
            </th>
            <th class="py-3 px-5" @click="sortByTotalVolume">
              <a href="#" @click="sortByTotalVolume">
                TOTAL VOL
              </a>
            </th>
            <th class="py-3 px-5">ATH</th>
            <th class="py-3 px-5"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="token in tokens" :key="token.id">
          <td class="py-[12px] px-[12px] flex items-center min-w-[160px]"
            style="position: sticky; left: 0;">
            <img :src="token.image" alt="Token Icon" class="w-[44px] h-[44px] mr-2 rounded-full">
            <div class="flex flex-col items-start text-left">
              <span class="text-white" style="text-transform: uppercase;">{{ token.symbol }}</span>
              <span class="text-white text-sm opacity-50">{{token.name}}
              </span>
            </div>
          </td>
          <td class="py-3 px-5">${{ token.current_price }}</td>
          <td class="py-3 px-5" :class="token.price_change_percentage_24h_in_currency > 0 ?
            'text-green-500' : 'text-red-500'">
            {{ token.price_change_percentage_24h_in_currency ?
            token.price_change_percentage_24h_in_currency.toFixed(2) + '%' : 'N/A' }}
          </td>
          <td class="py-3 px-5" :class="token.price_change_percentage_7d_in_currency > 0 ?
            'text-green-500' : 'text-red-500'">
            {{ token.price_change_percentage_7d_in_currency ?
            token.price_change_percentage_7d_in_currency.toFixed(2) + '%' : 'N/A' }}
          </td>
          <td class="py-3 px-5">{{ shortData(token.market_cap_change_24h) }}</td>
          <td class="py-3 px-5">{{ shortData(token.market_cap) }}</td>
          <td class="py-3 px-5">{{ shortData(token.total_volume) }}</td>
          <td class="py-3 px-5">${{ token.ath }}</td>
          <td class="py-[12px] px-[12px]">
            <a href="#" class="btn button-trade px-[14px] py-[9px]"
              @click="fetchTokenAddress(token.id, currentCategory)">
              <span v-if="!loadingStates[token.id]">Trade Now</span>
              <img v-else src="./assets/icons/loadingSpinner.svg" alt="loading"
                class="w-auto h-[24px]">
            </a>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <footer
      class="footer w-full bottom-0 left-0
            sm:relative lg:fixed
            lg:h-[44px] sm:h-auto md:h-[44px]
            flex flex-col sm:flex-row items-center justify-between
            px-[16px] lg:px-[100px] md:px-[16px]
            py-[16px] lg:py-0 md:py-[16px]">
      <span class="opacity-50">© BigBags 2024</span>
      <div class="flex items-center gap-[12px]">
        <span class="opacity-50">Follow us</span>
        <a href="https://t.me/bigbagsapp" target="_blank" class="flex items-center gap-[8px]">
          <img src="./assets/icons/telegram.svg" alt="Telegram" class="w-auto h-[20px]" />
          <span>Telegram</span>
        </a>
        <a href="https://x.com/bigbagsapp" target="_blank" class="flex items-center gap-[8px]">
          <img src="./assets/icons/x.svg" alt="Xtwitter" class="w-auto h-[20px]" />
          <span>X/Twitter</span>
        </a>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';
// import shortNum from 'number-shortener';
import shortNum from 'number-abbreviate';
// import coingeckoService from '@/services/api';
export default {
  data() {
    return {
      tokens: [],
      loading: false,
      loadingStates: {},
      currentCategory: 'solana-meme-coins',
    };
  },
  created() {
    this.fetchTokens('solana-meme-coins');
    // this.fetchCategories();
    // this.fetchPoolAddress();
  },
  methods: {
    async fetchTokens(list) {
      this.loading = true;
      this.currentCategory = list;
      const API_BASE_URL = 'https://api.coingecko.com/api/v3/';
      const API_KEY = process.env.COINGECKO_API_KEY;
      try {
        const response = await axios.get(`${API_BASE_URL}/coins/markets?vs_currency=usd&category=${list}&order=volume_desc&price_change_percentage=24h%2C7d`, {
          // params: {
        //   category: 'layer-1',
        //   // order: 'volume_desc',
        //   // per_page: 100,
        //   // page: 1,
        //   // price_change_percentage: '7d,24h',
        // },
          headers: {
            accept: 'application/json',
            'x-cg-pro-api-key': API_KEY,
          },
        });

        // this.tokens = response.data;
        this.tokens = response.data.sort((a, b) => {
          const aValue = a.price_change_percentage_7d_in_currency ?? -Infinity;
          const bValue = b.price_change_percentage_7d_in_currency ?? -Infinity;
          return bValue - aValue;
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    shortData(data) {
      return shortNum(data, 2);
    },

    async fetchCategories() {
      const API_BASE_URL = 'https://api.coingecko.com/api/v3';
      const API_KEY = process.env.COINGECKO_API_KEY;

      const response = await axios.get(`${API_BASE_URL}/coins/categories`, {
        headers: {
          'x-cg-pro-api-key': API_KEY,
        },
      });
      console.log(response.data);
      response.data.forEach((category) => {
        if (category.id === 'solana-meme-coins') {
          console.log(true);
        }
      });
    },

    async fetchTokenAddress(id, category) {
      this.loadingStates[id] = true;
      const API_BASE_URL = 'https://api.coingecko.com/api/v3';
      const API_KEY = process.env.COINGECKO_API_KEY;

      try {
        const response = await axios.get(`${API_BASE_URL}/coins/${id}`, {
          headers: {
            'x-cg-pro-api-key': API_KEY,
          },
        });

        const tokenAddress = response.data.contract_address;
        let URL = '';
        if (category === 'solana-meme-coins') {
          URL = `https://jup.ag/swap/SOL-${tokenAddress}?referrer=9AtCDBSqsET7ST3nDQc9Li7gLF49dnRrH7E6jwKSWozc&feeBps=50`;
        } else if (category === 'pump-fun') {
          URL = `https://jup.ag/swap/SOL-${tokenAddress}?referrer=9AtCDBSqsET7ST3nDQc9Li7gLF49dnRrH7E6jwKSWozc&feeBps=50`;
        } else if (category === 'base-meme-coins') {
          URL = `https://app.uniswap.org/swap?outputCurrency=${tokenAddress}&chain=base`;
        }
        window.open(URL, '_blank').focus();
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingStates[id] = false;
      }
    },

    sortBy24h() {
      this.tokens.sort((a, b) => {
        const aValue = a.price_change_percentage_24h_in_currency ?? -Infinity;
        const bValue = b.price_change_percentage_24h_in_currency ?? -Infinity;
        return bValue - aValue;
      });
    },

    sortBy7d() {
      this.tokens.sort((a, b) => {
        const aValue = a.price_change_percentage_7d_in_currency ?? -Infinity;
        const bValue = b.price_change_percentage_7d_in_currency ?? -Infinity;
        return bValue - aValue;
      });
    },

    sortByMcap24h() {
      this.tokens.sort((a, b) => {
        const aValue = a.market_cap_change_24h ?? -Infinity;
        const bValue = b.market_cap_change_24h ?? -Infinity;
        return bValue - aValue;
      });
    },

    sortByTotalMcap() {
      this.tokens.sort((a, b) => {
        const aValue = a.market_cap ?? -Infinity;
        const bValue = b.market_cap ?? -Infinity;
        return bValue - aValue;
      });
    },

    sortByTotalVolume() {
      this.tokens.sort((a, b) => {
        const aValue = a.total_volume ?? -Infinity;
        const bValue = b.total_volume ?? -Infinity;
        return bValue - aValue;
      });
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
  text-align: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 400;
}

.filterActive {
  color: #FFFFFF;
  border: 1px solid #2AB229;
}

.filterInactive {
  color: #FFFFFF80;
  border: 1px solid #FFFFFF20;
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
  white-space: nowrap;
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

.footer {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
  background-color: #0F1F22;
}
</style>
