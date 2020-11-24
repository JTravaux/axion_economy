const express = require('express');
const staking_router = express.Router();
const { getStakingStats } = require('../controllers/staking');

let totalsCache;
let totalsUpdater;
let updateMinutes = 10;

staking_router.get('/totals', async (req, res) => {
    try {
        if (!totalsUpdater){
            totalsCache = await getStakingStats();
            totalsUpdater = setInterval(async () => {
                totalsCache = await getStakingStats();
            }, (1000 * 60) * updateMinutes)
            res.status(200).send(totalsCache)
        }
        else res.status(200).send(totalsCache);

        console.log(totalsCache)
    } catch (err) {
        console.log(err);
        res.status(500).send(totalsCache);
    }
})

module.exports = staking_router;