const express = require('express');
const router = express.Router();

// Home page route (renders a view with real-time coin data)
const axios = require('axios');
router.get('/', async (req, res) => {
  try {
    // Fetch top 15 coins from CoinGecko
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 15,
        page: 1,
        price_change_percentage: '24h,7d'
      }
    });
    const coins = response.data.map((coin, idx) => ({
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h_in_currency?.toFixed(2),
      change7d: coin.price_change_percentage_7d_in_currency?.toFixed(2),
      marketCap: coin.market_cap,
      volume: coin.total_volume
    }));
    res.render('home', { title: 'My Crypto Home', coins });
  } catch (err) {
    console.error('Error fetching coin data:', err.message);
    // If rate limited, use mock data
    let coins = [];
    if (err.response && err.response.status === 429) {
      coins = [
        { name: 'Bitcoin', price: 65000, change24h: '1.2', change7d: '5.6', marketCap: 1200000000000, volume: 35000000000 },
        { name: 'Ethereum', price: 3200, change24h: '0.8', change7d: '3.1', marketCap: 400000000000, volume: 18000000000 },
        { name: 'Solana', price: 150, change24h: '-0.5', change7d: '2.0', marketCap: 65000000000, volume: 2500000000 }
      ];
    }
    res.render('home', { title: 'My Crypto Home', coins });
  }
});

// Import and use API routes
router.use('/api', require('./api'));

module.exports = router;
