const { getEstimatedTrees, getDailyAuctionAXN, getWeeklyAuctionAXN, getAuctions, getCurrentAuctionEnd } = require('../controllers/auction');

const express = require('express');
const auction_router = express.Router();

const AUTO_UPDATING_MINUTES = 10;

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

let auctionCache;
let auctionUpdater;
auction_router.get('/auctions', async (req, res) => {
    try {

        if (!auctionUpdater) {
            const result = await getAuctions();
            auctionCache = result

            auctionUpdater = setInterval(() => {
                getTotalSupply().then(res => { auctionCache = res }).catch(() => clearInterval(auctionUpdater))
            }, (1000 * 60) * AUTO_UPDATING_MINUTES)

            res.status(200).send(result)
        } else
            res.status(200).send(auctionCache)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

auction_router.get('/countdown', async (req, res) => {
    const result = await getCurrentAuctionEnd();
    res.status(200).send(result)
})

module.exports = auction_router;