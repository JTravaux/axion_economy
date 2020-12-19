const express = require('express');
const staking_router = express.Router();
const { getStakingStats, getEcosystemLevels } = require('../controllers/staking');
const { readFile } = require('../helpers')

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
        console.log("staking_routes error: ", err);
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
        console.log("staking_routes error: ", err);
        res.status(500).send(stakingEcoCache);
    }
})

const STAKE_EVENTS_FILE = "stake_events_raw.txt";
const UNSTAKE_EVENTS_FILE = "unstake_events_raw.txt";

staking_router.get('/all-stake-events', async (req, res) => {
    try {
        const STAKE_EVENTS = await readFile(STAKE_EVENTS_FILE);
        res.status(200).send(STAKE_EVENTS)
    } catch (err) {
        console.log("staking_routes error: ", err);
        res.status(500).send({message: "There was an error reading STAKE events."});
    }
})

staking_router.get('/all-unstake-events', async (req, res) => {
    try {
        const STAKE_EVENTS = await readFile(UNSTAKE_EVENTS_FILE);
        res.status(200).send(STAKE_EVENTS)
    } catch (err) {
        console.log("staking_routes error: ", err);
        res.status(500).send({ message: "There was an error reading STAKE events." });
    }
})

module.exports = staking_router;