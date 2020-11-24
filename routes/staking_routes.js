const express = require('express');
const staking_router = express.Router();
const { getStakingStats, getLastCheckedBlock } = require('../controllers/staking');

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

staking_router.get('/get-block/:id', async (req, res) => {
    if(req.params.id === "travaux") {
        try {
            const BLOCK = await getLastCheckedBlock()
            res.status(200).send({ block: BLOCK });
        } catch (err) { res.status(500).send({ block: 0 }) }
    } else res.sendStatus(500)
})

module.exports = staking_router;