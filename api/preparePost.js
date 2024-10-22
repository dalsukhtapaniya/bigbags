import runSocialPoster from '../../scripts/socialPoster.mjs';

export default async function handler(req, res) {
  try {
    // Assuming we want to post for a specific category or rotate through categories
    const category = 'solana-meme-coins'; // You can change or iterate this for different categories
    console.log(`Preparing post for category: ${category}`);
    
    await runSocialPoster(category);
    
    res.status(200).json({ success: true, message: `Post prepared successfully for ${category}` });
  } catch (error) {
    console.error("Error during post preparation:", error);
    res.status(500).json({ success: false, error: "Failed to prepare post" });
  }
}
