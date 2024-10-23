import { createStore } from 'vuex';
import { fetchTokens, fetchTokenAddress } from '../services/api.js';

export default createStore({
  state: {
    tokens: [],
    currentCategory: 'solana-meme-coins',
    loading: false,
  },
  mutations: {
    setTokens(state, tokens) {
      state.tokens = tokens;
    },
    setCurrentCategory(state, category) {
      state.currentCategory = category;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    async fetchTokens({ commit }, category) {
      commit('setLoading', true);
      try {
        const data = await fetchTokens(category);
        const sortedData = data.sort((a, b) => {
          const aValue = a.price_change_percentage_7d_in_currency ?? -Infinity;
          const bValue = b.price_change_percentage_7d_in_currency ?? -Infinity;
          return bValue - aValue;
        });
        commit('setTokens', sortedData);
        commit('setCurrentCategory', category);
      } catch (error) {
        console.error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async fetchTokenAddress(_, { id, category }) {
      try {
        const tokenAddress = await fetchTokenAddress(id);
        let URL = '';
        if (category === 'solana-meme-coins' || category === 'pump-fun') {
          URL = `https://jup.ag/swap/SOL-${tokenAddress}?referrer=9AtCDBSqsET7ST3nDQc9Li7gLF49dnRrH7E6jwKSWozc&feeBps=50`;
        } else if (category === 'base-meme-coins') {
          URL = `https://app.uniswap.org/swap?outputCurrency=${tokenAddress}&chain=base`;
        }
        window.open(URL, '_blank').focus();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
