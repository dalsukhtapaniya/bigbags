import cron from 'node-cron';
import runSocialPoster from './socialPoster.mjs';

const categories = ['solana-meme-coins', 'pump-fun', 'base-meme-coins'];
let currentCategoryIndex = 0;

async function postForNextCategory() {
  const category = categories[currentCategoryIndex];
  try {
    console.log(`Posting for category: ${category}`);
    await runSocialPoster(category);
    console.log(`Posted successfully for ${category}`);
  } catch (error) {
    console.error(`Error posting for ${category}:`, error);
  }
  
  // Move to the next category
  currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
}

// Schedule posts every 2 hours
cron.schedule('0 */2 * * *', postForNextCategory);

console.log('Scheduler started. Posts will be made every 2 hours, cycling through categories.');

// Run once immediately when the script starts
postForNextCategory();
