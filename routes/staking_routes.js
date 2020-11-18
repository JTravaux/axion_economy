const { getPastEvents } = require('../controllers/staking');

const express = require('express');
const staking_router = express.Router();

staking_router.get('/totals', async (req, res) => {
    try {
        const data = await getPastEvents();
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})


module.exports = staking_router;