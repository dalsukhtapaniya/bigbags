import runSocialPoster from './socialPoster.mjs';
import dotenv from 'dotenv';

dotenv.config();

const categories = ['solana-meme-coins', 'pump-fun', 'base-meme-coins'];

async function testSocialPoster() {
  console.log('Starting social poster test...');

  for (const category of categories) {
    console.log(`Testing category: ${category}`);
    try {
      await runSocialPoster(category);
      console.log(`Test for ${category} completed successfully.`);
    } catch (error) {
      console.error(`Error testing ${category}:`, error);
    }
    console.log('---');
  }

  console.log('Social poster test completed.');
}

testSocialPoster().catch(console.error);
