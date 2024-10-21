export const sampleData = [
    {
        id: "solana-meme-coin-1",
        symbol: "GIGA",
        name: "GIGA",
        image: "https://pbs.twimg.com/profile_images/1838895713805021184/QQF7B-zL_400x400.png",
        price_change_24h: 0.01,
        price_change_percentage_24h: 18.5,
    },
    {
        id: "solana-meme-coin-2",
        symbol: "POPCAT",
        name: "POPCAT",
        image: "https://pbs.twimg.com/profile_images/1838895713805021184/QQF7B-zL_400x400.png",
        price_change_24h: 0.01,
        price_change_percentage_24h: 18.5,
    },
    {
        id: "solana-meme-coin-3",
        symbol: "WIF",
        name: "WIF",
        image: "https://pbs.twimg.com/profile_images/1838895713805021184/QQF7B-zL_400x400.png",
        price_change_24h: 0.01,
        price_change_percentage_24h: 18.5,
    },
    // You can add more sample coins here
  ];
  
  export function fetchSampleData(category) {
    console.log(`Fetching sample data for category: ${category}`);
    // In a real scenario, you might filter based on the category
    return sampleData;
  }