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
    res.render('home', { title: 'My Crypto Home', coins: [] });
  }
});

// Import and use API routes
router.use('/api', require('./api'));

module.exports = router;
