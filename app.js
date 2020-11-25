require('dotenv').config();
const path = require('path');
const express = require('express');
const market_stats_routes = require('./routes/market_stats_routes');
const bpd_routes = require('./routes/bpd_routes');
const auction_routes = require('./routes/auction_routes');
const staking_routes = require('./routes/staking_routes');
const eco_routes = require('./routes/eco_routes');

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(cors());
app.use(express.json());
app.use('/eco', eco_routes);
app.use('/bpd', bpd_routes);
app.use('/auction', auction_routes);
app.use('/staking', staking_routes);
app.use('/stats', market_stats_routes);
app.use(express.static(path.join(__dirname, './frontend')));

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

// Serve React site
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});


/*
CURRENT ROUTES
    staking/totals

    stats/axn-eth
    stats/usdt-axn
    stats/volume
    stats/market-cap
    stats/total-supply

    eco/totals

    bpd/pools
    bpd/next
*/