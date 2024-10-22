const runSocialPoster = require('../src/scripts/socialPoster.mjs');

const categories = ['solana-meme-coins', 'pump-fun', 'base-meme-coins'];
let currentCategoryIndex = 0;

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const category = categories[currentCategoryIndex];
    try {
      await runSocialPoster(category);
      currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      res.status(200).json({ message: `Posted successfully for ${category}` });
    } catch (error) {
      console.error(`Error posting for ${category}:`, error);
      res.status(500).json({ error: `Failed to post for ${category}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
