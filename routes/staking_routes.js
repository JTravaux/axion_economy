const express = require('express');
const staking_router = express.Router();
const { getStakingStats, getLastCheckedBlock, getEcosystemLevels } = require('../controllers/staking');

let totalsCache;
let totalsUpdater;
let updateMinutes = 10;

staking_router.get('/totals', async (req, res) => {
    const HOST = req.headers.host;

    try {
        if (!totalsUpdater){
            totalsCache = await getStakingStats(HOST);
            totalsUpdater = setInterval(async () => {
                totalsCache = await getStakingStats(HOST);
            }, (1000 * 60) * updateMinutes)
            res.status(200).send(totalsCache)
        }
        else res.status(200).send(totalsCache);
    } catch (err) {
        console.log(err);
        res.status(500).send(totalsCache);
    }
})

staking_router.get('/get-block/:id', async (req, res) => {
    if(req.params.id === "travaux") {
        try {
            const BLOCK = await getLastCheckedBlock()
            res.status(200).send({ block: BLOCK });
        } catch (err) { res.status(500).send({ block: 0 }) }
    } else res.sendStatus(500)
})

staking_router.get('/block-env-test', async (req, res) => {
    res.status(200).send({ block: process.env.BLOCK });
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