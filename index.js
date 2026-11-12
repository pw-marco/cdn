const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_URL = 'https://cdn.studypika.eu.cc';

// Homepage par locked message dikhane ke liye
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Locked</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #0f172a;
          color: #f8fafc;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: #1e293b;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 500px;
        }
        h2 { color: #ef4444; margin-bottom: 15px; }
        p { font-size: 16px; line-height: 1.6; color: #cbd5e1; }
        a { color: #38bdf8; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>API IS LOCKED</h2>
        <p>Contact Owner to use this API</p>
        <p>Owner telegram I'd :- <a href="https://t.me/officialmarco22" target="_blank">@officialmarco22</a></p>
        <p>Owner telegram Channel:- <a href="https://t.me/official_marco_22" target="_blank">@official_marco_22</a></p>
      </div>
    </body>
    </html>
  `);
});

// Baaki sabhi paths ke liye target URL par proxy karna
app.use('/', createProxyMiddleware({
  target: TARGET_URL,
  changeOrigin: true,
  secure: true,
  on: {
    error: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error or target down.');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
