const cors = require('cors');
const path = require('path');
const express = require('express');
const holder_routes = require('./routes/holder_routes');
const market_stats_routes = require('./routes/market_stats_routes');

const app = express();
const PORT = 80;

// app.use(cors());
app.use(express.json());
app.use('/ecosystem', holder_routes);
app.use('/stats', market_stats_routes);
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

// Server React site
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});