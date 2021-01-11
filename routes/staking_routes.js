const express = require('express');
const staking_router = express.Router();
const { readFile } = require('../helpers')
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


// staking_router.get('/fetch-all-events/:type', async (req, res) => {
//     const results = await _getEvents(req.params.type, 11472614, 'latest')
//     console.log(results.length)
//     res.status(200).send(results.sort((a, b) => b.stakeNum - a.stakeNum))
// })

// staking_router.get('/fetch-all-events/v1/:type', async (req, res) => {
//     const results = await _getEventsV1(req.params.type, 11248075, 'latest')
//     console.log(results.length)
//     res.status(200).send(results.sort((a, b) => b.stakeNum - a.stakeNum))
// })

// staking_router.get('/fetch-events/all/stake', async (req, res) => {
//     const results = await _getEventsV1("Stake", 11248075, 11472614)
//     const results2 = await _getEvents("Stake", 11472615, 'latest')

//     const arr = {};
//     const RES = results.concat(results2)

//     // res.status(200).send(results.sort((a, b) => b.stakeNum - a.stakeNum))

//     // RES.forEach(i => {
//     //     const ADDR = i.address;
//     //     const NUM = Number(i.stakeNum)
//     //     if (!arr[ADDR])
//     //         arr[ADDR] = [NUM]
//     //     else {
//     //         if (!arr[ADDR].includes(NUM))
//     //             arr[ADDR].push(NUM)
//     //     }
           
//     // })

//     res.status(200).send(RES.sort((a, b) => b.block - a.block))
// })

// staking_router.get('/fetch-events/all/unstake', async (req, res) => {
//     const results = await _getEventsV1("Unstake", 11248075, 11472614)
//     const results2 = await _getEvents("Unstake", 11472615, 'latest')

//     const arr = {};
//     const RES = results.concat(results2)

//     console.log(results.concat(results2).length)
//     res.status(200).send(RES.sort((a, b) => b.block - a.block))

//     // res.status(200).send(results.concat(results2).forEach(i => {
//     //     const ADDR = i.address;
//     //     if (!arr[ADDR])
//     //         arr[ADDR] = [i.stakeNum]
//     //     else
//     //         arr[ADDR].push(i.stakeNum)
//     // }))
// })

module.exports = staking_router;