import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateHTMLContent(token) {
  const percentageChange = token.price_change_percentage_24h.toFixed(2);
  const percentageColor = percentageChange >= 0 ? '#27E926' : '#FF3535';
  const bgImageUrl = 'https://i.postimg.cc/PrJsbBf5/template.png';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
        body {
          font-family: 'Space Grotesk', sans-serif;
          background-image: url('${bgImageUrl}');
          background-size: cover;
          background-position: center;
          width: 680px;
          height: 680px;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .token-icon {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .token-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .token-symbol {
          font-size: 60px;
          font-weight: bold;
          color: white;
          margin-bottom: 10px;
        }
        .price-change {
          font-size: 100px;
          font-weight: bold;
          color: ${percentageColor};
          margin-bottom: 10px;
        }
        .time-period {
          font-size: 32px;
          color: white;
          opacity: 0.6;
        }
      </style>
    </head>
    <body>
      <div class="token-icon">
        <img src="${token.image}" alt="${token.symbol} icon">
      </div>
      <div class="token-symbol">$${token.symbol}</div>
      <div class="price-change">${percentageChange}%</div>
      <div class="time-period">Last 24H</div>
    </body>
    </html>
  `;
}