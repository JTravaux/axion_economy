const { get5555Stats } = require('../controllers/staking');

const express = require('express');
const staking_router = express.Router();

staking_router.get('/events/staking/past', async (req, res) => {
    try {
        const data = await get5555Stats();
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})


module.exports = staking_router;