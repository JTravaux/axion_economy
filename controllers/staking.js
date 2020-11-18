const { db } = require('../controllers/db');
const { CONTRACTS, ONE_TOKEN_18, web3 } = require('../config');

// METHODS
const CONTRACT_FIRST_BLOCK = 11236016;
let currentBlock;
let db_client;

const _getSavedData = () => {
    return new Promise(async (resolve, reject) => {
        if (db_client) {
            const RESULTS = await db_client.db("AxionStats").collection("staking_stats").find().limit(1).sort({ $natural: -1 }).toArray();
            resolve(RESULTS)
        }
        else {
            db.connect(async (err, client) => {
                if (!err) {
                    db_client = client;
                    const RESULTS = await db_client.db("AxionStats").collection("staking_stats").find().limit(1).sort({ $natural: -1 }).toArray();
                    resolve(RESULTS)
                } else reject(err)
            });
        }
    })
}

const _saveToDB = (data) => {
    const doc = {
        timestamp: Date.now(),
        block: currentBlock,
        staked: data[0],
        unstaked: data[1],
        totals: data[2]
    }

    if (db_client && data)
        db_client.db("AxionStats").collection("staking_stats").insertOne(doc).catch(err => console.log(err))
    else if (data) {
        db.connect(async (err, client) => {
            if (!err) {
                db_client = client;
                db.db("AxionStats").collection("staking_stats").insertOne(doc).catch(err => console.log(err))
            }
        });
    }
}

// Get "type" evenmts from the staking contract.
const _getEvents = (type, fromBlock, toBlock) => {
    return new Promise((resolve, reject) => {
        CONTRACTS.staking.getPastEvents(type, { fromBlock, toBlock }, (error, events) => {
            if (error)
                reject({ message: error.message });
            else resolve(events);
        })
    })
}

const _formatEvents = events => {
    let count_5555 = 0
    let count_5555_axn = 0;
    let average_total = 0;
    let average_length = 0;

    const EVENTS = events.map(ev => {
        const amount = ev.returnValues.amount / ONE_TOKEN_18;
        const length = Math.floor((ev.returnValues.end - ev.returnValues.start) / 86400);

        average_total += amount;
        average_length += length;

        if (amount >= 2500000 && length === 5555) {
            count_5555++;
            count_5555_axn += amount
        }

        return amount;
    })

    average_total /= events.length;
    average_length /= events.length;

    return {
        count_5555,
        count_5555_axn,
        events: EVENTS,
        average_amount: average_total,
        average_length: average_length,
    }
}

const finalizeEvents = events => {
    const EVENTS = _formatEvents(events)

    return ({
        average_length: EVENTS.average_length,
        average_amount: EVENTS.average_amount,

        num_5555_stakers: EVENTS.count_5555,
        total_5555_axn: EVENTS.count_5555_axn,

        total_stakers: EVENTS.events.length,
        total_staked: EVENTS.events.reduce((a, b) => a + b, 0)
    });
}

const _getPastStakeEvents = async () => {
    try {
        const EVENTS = await _getEvents("Stake", CONTRACT_FIRST_BLOCK, currentBlock);
        return finalizeEvents(EVENTS);
    } catch (err) {
        const HALF_BLOCK = Math.floor((CONTRACT_FIRST_BLOCK + currentBlock) / 2)
        const RESULTS = await Promise.all([
            _getEvents("Stake", CONTRACT_FIRST_BLOCK, HALF_BLOCK),
            _getEvents("Stake", HALF_BLOCK + 1, currentBlock)
        ])

        return finalizeEvents(RESULTS[0].concat(RESULTS[1]))
    }
}

const _getPastUnstakeEvents = async () => {
    const EVENTS = await _getEvents("Unstake", 'earliest', 'latest');
    return finalizeEvents(EVENTS);
}

let totalsCache;
let totalsUpdater;

const _fetchAllStakeEvents = () => {
    return new Promise((resolve, reject) => {
        Promise.all([_getPastStakeEvents(), _getPastUnstakeEvents()]).then(res => {
            let result = {
                timestamp: Date.now(),
                block: currentBlock,
                average_stake_length: res[0].average_length,
                average_stake_amount: res[0].average_amount,
                current_5555_club_members: (res[0].num_5555_stakers - res[1].num_5555_stakers),
                current_5555_club_staked_axn: (res[0].total_5555_axn - res[1].total_5555_axn),
                current_stakers: (res[0].total_stakers - res[1].total_stakers),
                current_axn_staked: (res[0].total_staked - res[1].total_staked),
            }

            totalsCache = result;
            _saveToDB(result);
            resolve(result);
        }).catch(err => { reject(err) })
    })
}

const startCacheUpdating = () => {
    totalsUpdater = setInterval(async () => { 
        currentBlock = await web3.eth.getBlockNumber();
        _fetchAllStakeEvents();
    }, 1000 * (60 * 10)) // 10 minutes
}

const getPastEvents = async () => {
    const BLOCK = await web3.eth.getBlockNumber();
    currentBlock = BLOCK;
    
    return new Promise(async (resolve, rehect) => {
        if (!totalsCache) {
            try {
                const RESULTS = await _fetchAllStakeEvents();
                startCacheUpdating();
                resolve(RESULTS);
            } catch (err) { reject(err) }
        } else resolve(totalsCache)
    })
}

module.exports = {
    getPastEvents,
}