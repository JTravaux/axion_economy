const express = require('express');
const staking_router = express.Router();
const { getStakingStats, getEcosystemLevels } = require('../controllers/staking');

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
    } catch (err) {
        console.log(err);
        res.status(500).send(totalsCache);
    }
})

let stakingEcoCache;
let stakingEcoUpdater;
staking_router.get('/ecosystem', async (req, res) => {
    try {
        if (!stakingEcoUpdater) {
            stakingEcoCache = await getEcosystemLevels();
            stakingEcoUpdater = setInterval(async () => {
                stakingEcoCache = await getEcosystemLevels();
            }, (1025 * 60) * updateMinutes)
            res.status(200).send(stakingEcoCache)
        }
        else res.status(200).send(stakingEcoCache);
    } catch (err) {
        console.log(err);
        res.status(500).send(stakingEcoCache);
    }
})

module.exports = staking_router;