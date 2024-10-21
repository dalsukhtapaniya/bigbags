import { generateHTMLContent } from './imageTemplate.mjs';
import { TwitterApi } from 'twitter-api-v2';
import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';
import { fetchTokens } from '../services/api.mjs';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function createImage(topToken, category) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  
  const htmlContent = generateHTMLContent(topToken);
  await page.setContent(htmlContent);
  await page.setViewport({ width: 680, height: 680 });

  const imageBuffer = await page.screenshot({ type: 'png' });
  await browser.close();

  console.log(`Image created successfully for ${category}`);
  return imageBuffer;
}

async function postToTwitter(imageBuffer, category) {
  try {
    const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, { type: 'png' });
    await twitterClient.v2.tweet({
      text: `Check out the top performering token on BigBags! 🚀 #BigBags #CryptoTrading`,
      media: { media_ids: [mediaId] },
    });
    console.log(`Posted to Twitter successfully for category: ${category}`);
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    throw error;
  }
}

async function runSocialPoster(category) {
  const tokens = await fetchTokens(category);
  
  if (tokens.length > 0) {
    const topToken = tokens[0];
    const imageBuffer = await createImage(topToken, category);
    if (imageBuffer) {
      await postToTwitter(imageBuffer, category);
    }
  } else {
    console.log('No data found for the specified category.');
  }
}

export default runSocialPoster;
