const { getEstimatedTrees, getDailyAuctionAXN, getWeeklyAuctionAXN } = require('../controllers/auction');

const express = require('express');
const auction_router = express.Router();

auction_router.get('/trees', async (req, res) => {
    try {
        const results = await getEstimatedTrees();
        res.status(200).send(results)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

auction_router.get('/daily', async (req, res) => {
    try {
        const results = await getDailyAuctionAXN();
        res.status(200).send({ total: results })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

auction_router.get('/weekly', async (req, res) => {
    try {
        const results = await getWeeklyAuctionAXN();
        res.status(200).send({ total: results })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = auction_router;