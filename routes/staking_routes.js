const express = require('express');
const staking_router = express.Router();
const { readFile, saveToFile } = require('../helpers')
const { addOne } = require('../controllers/db.js');

const { getStakingStats, getActiveStakesByAddress, getCompletedStakesByAddress, getStakeUnstakeEvents, getTotalShares, _getEvents, _getEventsV1 } = require('../controllers/staking');
const { ONE_TOKEN_18 } = require('../config');

let totalsCache;
let updateMinutes = 5;
const UPDATE_MS = (1000 * 60) * updateMinutes;

staking_router.get('/totals', async (req, res) => {
    try {
        if (!totalsCache){

            // Get and save results
            totalsCache = await getStakingStats();
            addOne("staking_stats", totalsCache);

            // Refresh stats
            setInterval(async () => {
                totalsCache = await getStakingStats();
            }, UPDATE_MS);

            // Update DB every 30 mins
            setInterval(() => { addOne("staking_stats", totalsCache) }, (1000 * 60) * 30);

            // Return result
            res.status(200).send(totalsCache)
        }
        else res.status(200).send(totalsCache);
    } catch (err) {
        console.log("staking_routes error: ", err);
        res.status(500).send(totalsCache);
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
        res.status(500).send({ message: "There was an error reading UNSTAKE events." });
    }
})

let stakesByAddressCache;
let totalSharesCache;
staking_router.get('/stakes/active/:addr', async (req, res) => {
    const REQ_ADDR = req.params.addr
    
    try {
        if (!stakesByAddressCache) {
            stakesByAddressCache = await getActiveStakesByAddress();
            setInterval(async () => {
                stakesByAddressCache = await getActiveStakesByAddress();
            }, UPDATE_MS)
        }

        let result = [];
        if (stakesByAddressCache[REQ_ADDR])
            result = stakesByAddressCache[REQ_ADDR];

        if (!totalSharesCache) {
            totalSharesCache = await getTotalShares();
            setInterval(async () => {
                totalSharesCache = await getTotalShares();
            }, UPDATE_MS)
        }

        const TOTAL_AXN_STAKED = result.reduce((a, b) => a + (b.amount / ONE_TOKEN_18), 0);
        const TOTAL_SHARES_STAKES = result.reduce((a, b) => a + (b.shares / ONE_TOKEN_18), 0);

        let totals = {
            total_axn: TOTAL_AXN_STAKED,
            total_shares: TOTAL_SHARES_STAKES,
            global_shares: totalSharesCache / ONE_TOKEN_18
        }

        res.status(200).send({
            stakes: result,
            totals
        })
    } catch (err) {
        console.log("staking_routes error: ", err);
        res.status(500).send({ message: "There was an error reading active stakes for " + req.params.addr });
    }
})

let completedStakesByAddressCache;
staking_router.get('/stakes/complete/:addr', async (req, res) => {
    const REQ_ADDR = req.params.addr

    try {
        if (!completedStakesByAddressCache) {
            completedStakesByAddressCache = await getCompletedStakesByAddress();
            setInterval(async () => {
                completedStakesByAddressCache = await getCompletedStakesByAddress();
            }, UPDATE_MS)
        }

        let result = [];
        if (completedStakesByAddressCache[REQ_ADDR])
            result = completedStakesByAddressCache[REQ_ADDR];

        res.status(200).send(result)
    } catch (err) {
        console.log("staking_routes error: ", err);
        res.status(500).send({ message: "There was an error reading completed stakes for " + req.params.addr });
    }
})

staking_router.get('/latest-events/:num?', async (req, res) => {
    let num = Number(req.params.num);
    if(isNaN(num))
        num = 20

    try {
        const LATEST_EVENTS = await getStakeUnstakeEvents(num);
        res.status(200).send(LATEST_EVENTS)
    } catch (err) {
        console.log("staking_routes error: ", err);
        res.status(500).send({ message: "There was an error reading latest events" });
    }
})

// staking_router.get('/fetch-events/all/stake', async (req, res) => {
//     const results = await _getEventsV1("Stake", 11248075, 11472614)
//     const results2 = await _getEvents("Stake", 11472615, 11642551)
//     const RES = results.concat(results2)
//     const SORTED_RESULT = RES.sort((a, b) => b.block - a.block)

//     saveToFile("stake_events_raw.txt", SORTED_RESULT)
//     res.status(200).send(SORTED_RESULT)
// })

// staking_router.get('/fetch-events/all/unstake', async (req, res) => {
//     const results = await _getEventsV1("Unstake", 11248075, 11472614)
//     const results2 = await _getEvents("Unstake", 11472615, 11642551)
//     const RES = results.concat(results2)
//     const SORTED_RESULT = RES.sort((a, b) => b.block - a.block)

//     saveToFile("unstake_events_raw.txt", SORTED_RESULT)
//     res.status(200).send(SORTED_RESULT)
// })

const PASSWORD = "AxionDev79"
staking_router.get('/fetch-total-staked', async (req, res) => {
    const KEY = req.query.key;

    if (!KEY || KEY !== PASSWORD) {
        res.sendStatus(403);
        return;
    }

    const TYPE = req.query.type || "cached";

    let STAKE_EVENTS;
    let UNSTAKE_EVENTS;
    let SORTED_STAKES;
    let SORTED_UNSTAKES;

    const STAKE_EVENTS_FILE = "events_stake.txt";
    const UNSTAKE_EVENTS_FILE = "events_unstake.txt";

    if(TYPE === "fresh") {
        ////////////////
        // FRESH DATA //
        ///////////////
        const V1_START_BLOCK = 11248075;
        const V1_END_BLOCK = 11472614;
        const V2_START_BLOCK = 11472615;
        const V2_END_BLOCK = req.query.end || "latest";

        const stakes_v1 = await _getEventsV1("Stake", V1_START_BLOCK, V1_END_BLOCK)
        const stakes_v2 = await _getEvents("Stake", V2_START_BLOCK, V2_END_BLOCK)

        const unstakes_v1 = await _getEventsV1("Unstake", V1_START_BLOCK, V1_END_BLOCK)
        const unstakes_v2 = await _getEvents("Unstake", V2_START_BLOCK, V2_END_BLOCK)

        STAKE_EVENTS = stakes_v1.concat(stakes_v2);
        SORTED_STAKES = STAKE_EVENTS.sort((a, b) => +b.block - +a.block)
        saveToFile(STAKE_EVENTS_FILE, SORTED_STAKES)

        UNSTAKE_EVENTS = unstakes_v1.concat(unstakes_v2);
        SORTED_UNSTAKES = UNSTAKE_EVENTS.sort((a, b) => +b.block - +a.block)
        saveToFile(UNSTAKE_EVENTS_FILE, SORTED_UNSTAKES)
    } else {
        ////////////////
        // FILE DATA //
        ///////////////
        STAKE_EVENTS = await readFile(STAKE_EVENTS_FILE)
        SORTED_STAKES = [...STAKE_EVENTS];

        UNSTAKE_EVENTS = await readFile(UNSTAKE_EVENTS_FILE)
        SORTED_UNSTAKES = [...UNSTAKE_EVENTS];
    }
  
    // Filter for active stakes
    const ACTIVE_STAKES = STAKE_EVENTS.filter(se => UNSTAKE_EVENTS.findIndex(ue => +ue.stakeNum === +se.stakeNum) === -1)

    // Build the result
    const RESULT = {
        stakes: ACTIVE_STAKES.length,
        total_staked_bn: ACTIVE_STAKES.reduce((a, b) => a + +b.amount, 0).toLocaleString('fullwide', { useGrouping: false }),
        total_shares_bn: ACTIVE_STAKES.reduce((a, b) => a + +b.shares, 0).toLocaleString('fullwide', { useGrouping: false }),
        last_event_block: Math.max(SORTED_STAKES[0].block, SORTED_UNSTAKES[0].block)
    }

    res.status(200).send(RESULT)
})

module.exports = staking_router;