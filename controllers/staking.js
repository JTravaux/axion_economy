const { db } = require('../controllers/db');
const { CONTRACTS, ONE_TOKEN_18, web3 } = require('../config');

// METHODS
const CONTRACT_FIRST_BLOCK = 11236016;
let currentBlock;
let db_client;

const calculateEcosystem = data => {
    const results = {
        totals: {
            stakers: 0,
            staked_axn: 0,
            last_updated: 0,
        },
        shrimp: {
            count: 0,
            totalAxn: 0
        },
        crab: {
            count: 0,
            totalAxn: 0
        },
        fish: {
            count: 0,
            totalAxn: 0
        },
        octopus: {
            count: 0,
            totalAxn: 0
        },
        dolphin: {
            count: 0,
            totalAxn: 0
        },
        tigerShark: {
            count: 0,
            totalAxn: 0
        },
        greatWhite: {
            count: 0,
            totalAxn: 0
        },
        whale: {
            count: 0,
            totalAxn: 0
        },
    }

    data.forEach(r => {
        if (r.balance >= 1 && r.balance <= 999) {
            results.totals.stakers++;
            results.shrimp.count++;
            results.totals.staked_axn += r.balance;
            results.shrimp.totalAxn += r.balance;
        }
        else if (r.balance >= 1000 && r.balance <= 999999) {
            results.totals.stakers++;
            results.crab.count++;
            results.totals.staked_axn += r.balance;
            results.crab.totalAxn += r.balance;
        }
        else if (r.balance >= 1000000 && r.balance <= 9999999) {
            results.totals.stakers++;
            results.fish.count++;
            results.totals.staked_axn += r.balance;
            results.fish.totalAxn += r.balance;
        }
        else if (r.balance >= 10000000 && r.balance <= 49999999) {
            results.totals.stakers++;
            results.octopus.count++;
            results.totals.staked_axn += r.balance;
            results.octopus.totalAxn += r.balance;
        }
        else if (r.balance >= 50000000 && r.balance <= 99999999) {
            results.totals.stakers++;
            results.dolphin.count++;
            results.totals.staked_axn += r.balance;
            results.dolphin.totalAxn += r.balance;
        }
        else if (r.balance >= 100000000 && r.balance <= 499999999) {
            results.totals.stakers++;
            results.tigerShark.count++;
            results.totals.staked_axn += r.balance;
            results.tigerShark.totalAxn += r.balance;
        }
        else if (r.balance >= 500000000 && r.balance <= 999999999) {
            results.totals.stakers++;
            results.greatWhite.count++;
            results.totals.staked_axn += r.balance;
            results.greatWhite.totalAxn += r.balance;
        }
        else if (r.balance >= 1000000000) {
            results.totals.stakers++;
            results.whale.count++;
            results.totals.staked_axn += r.balance;
            results.whale.totalAxn += r.balance;
        }
    })

    results.shrimp.totalAxn = Math.floor(results.shrimp.totalAxn);
    results.crab.totalAxn = Math.floor(results.crab.totalAxn);
    results.fish.totalAxn = Math.floor(results.fish.totalAxn);
    results.octopus.totalAxn = Math.floor(results.octopus.totalAxn);
    results.dolphin.totalAxn = Math.floor(results.dolphin.totalAxn);
    results.tigerShark.totalAxn = Math.floor(results.tigerShark.totalAxn);
    results.greatWhite.totalAxn = Math.floor(results.greatWhite.totalAxn);
    results.whale.totalAxn = Math.floor(results.whale.totalAxn);

    results.totals.last_updated = Date.now();

    return results;
}

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

const _splitInteger = (number, parts) => {
    const remainder = number % parts
    const baseValue = (number - remainder) / parts

    return Array(parts).fill(baseValue).fill(baseValue + 1, parts - remainder)
}

const _saveToDB = (data) => {
    if (db_client && data)
        db_client.db("AxionStats").collection("staking_stats").insertOne(data).catch(err => console.log(err))
    else if (data) {
        db.connect(async (err, client) => {
            if (!err) {
                db_client = client;
                db.db("AxionStats").collection("staking_stats").insertOne(data).catch(err => console.log(err))
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

        const BLOCKS_FROM_START = currentBlock - CONTRACT_FIRST_BLOCK; // 65174
        const BLOCK_CHUNKS = _splitInteger(BLOCKS_FROM_START, 5)
      
        let startBlock = CONTRACT_FIRST_BLOCK;
        let endBlock = CONTRACT_FIRST_BLOCK + BLOCK_CHUNKS[0];
        let promises = [];

        for(let i = 0; i < BLOCK_CHUNKS.length; ++i){
            promises.push(_getEvents("Stake", startBlock, endBlock))
            startBlock = endBlock + 1;
            endBlock += BLOCK_CHUNKS[i+1]
        }
       
        try {
            const RESULTS = await Promise.all(promises)
            return finalizeEvents([].concat.apply([], RESULTS))
        } catch (err) {
            if (totalsCache)
                return totalsCache;
            else return null;
        }
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
    }, 1000 * (60 * 5)) // 10 minutes
}

const getPastEvents = async () => {
    const BLOCK = await web3.eth.getBlockNumber();
    currentBlock = BLOCK;
    
    return new Promise(async (resolve, reject) => {
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