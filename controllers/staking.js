const fs = require("fs");
const { CONTRACTS, ONE_TOKEN_18 , web3 } = require('../config');
const { splitInteger, uniqueify, readFile } = require('../helpers');

const CONTRACT_FIRST_BLOCK = 11248075;
const CONTRACT_FIRST_BLOCK_V2 = 11472614;
const STAKE_EVENTS_FILE = "stake_events_raw.txt";
const UNSTAKE_EVENTS_FILE = "unstake_events_raw.txt";

const _saveEvents = (path, events) => {
    const SORTED_EVENTS = events.sort((a, b) => b.block - a.block);
    fs.writeFile(path, JSON.stringify(SORTED_EVENTS), (err) => {
        if (err) console.log(err);
    });
}

const _cleanData = (data, type) => {

    let dat = [...data];
    if (type === "Stake")
        dat = dat.filter(d => +d.returnValues.sessionId >= 23439)

    return dat.map(d => {
        return {
            address: d.returnValues.account,
            stakeNum: d.returnValues.sessionId,
            amount: d.returnValues.amount,
            start: d.returnValues.start,
            end: d.returnValues.end,
            shares: d.returnValues.shares,
            block: d.blockNumber,
            txID: d.transactionHash
        }
    })
}

const _cleanDataV1 = (data, type) => {

    let dat = [...data];
    if (type === "Stake")
        dat = dat.filter(d => +d.returnValues.sessionId <= 23438)

    return dat.map(d => {
        return {
            address: d.returnValues.account,
            stakeNum: d.returnValues.sessionId,
            amount: d.returnValues.amount,
            start: d.returnValues.start,
            end: d.returnValues.end,
            shares: d.returnValues.shares,
            block: d.blockNumber,
            txID: d.transactionHash
        }
    })
}

const _getEventsV1 = async (type, startBlock, endBlock) => {
    return new Promise(resolve => {
        CONTRACTS.staking_v1.getPastEvents(type, { fromBlock: startBlock, toBlock: endBlock }, async (error, events) => {
            if (error && !error.message.includes("request rate limited")) {
                const CURRENT_BLOCK = await web3.eth.getBlockNumber();
                const BLOCKS_FROM_START = CURRENT_BLOCK - CONTRACT_FIRST_BLOCK;
                const BLOCK_CHUNKS = splitInteger(BLOCKS_FROM_START, 25)

                let promises = [];
                let startBlock = CONTRACT_FIRST_BLOCK;
                let endBlock = CONTRACT_FIRST_BLOCK + BLOCK_CHUNKS[0];

                console.log(BLOCK_CHUNKS.length)
                for (let i = 0; i < BLOCK_CHUNKS.length; ++i) {
                    promises.push(_getEventsV1(type, startBlock, endBlock));
                    const newStartBlock = endBlock + 1;
                    startBlock = newStartBlock;
                    endBlock = newStartBlock + BLOCK_CHUNKS[i]
                }

                const RESULTS = await Promise.all(promises)
                resolve([].concat.apply([], RESULTS))
            } else if (error && error.message.includes("request rate limited")) {
                console.log("staking.js - ERROR - Rate Limited")
                resolve([])
            }
            else {
                const CLEANED_DATA = _cleanDataV1(events, type);
                resolve(CLEANED_DATA)
            }
        })
    })
}

// Get "type" events from the staking contract.
const _getEvents = async (type, fromBlock, toBlock) => {
    return new Promise(resolve => {
        CONTRACTS.staking.getPastEvents(type, { fromBlock, toBlock }, async (error, events) => {
            if (error && !error.message.includes("request rate limited")) {
                const CURRENT_BLOCK = await web3.eth.getBlockNumber();
                const BLOCKS_FROM_START = CURRENT_BLOCK - CONTRACT_FIRST_BLOCK_V2;
                const BLOCK_CHUNKS = splitInteger(BLOCKS_FROM_START, 10)
                
                let promises = [];
                let startBlock = CONTRACT_FIRST_BLOCK_V2;
                let endBlock = CONTRACT_FIRST_BLOCK_V2 + BLOCK_CHUNKS[0];

                for (let i = 0; i < BLOCK_CHUNKS.length; ++i) {
                    promises.push(_getEvents(type, startBlock, endBlock));
                    const newStartBlock = endBlock + 1;
                    startBlock = newStartBlock;
                    endBlock = newStartBlock + BLOCK_CHUNKS[i]
                }

                const RESULTS = await Promise.all(promises)
                resolve([].concat.apply([], RESULTS))
            } else if (error && error.message.includes("request rate limited")) {
                console.log("staking.js - ERROR - Rate Limited")
                resolve([])
            }
            else {
                const CLEANED_DATA = _cleanData(events, type);
                resolve(CLEANED_DATA)
            }
        })
    })
}

const _processEvents = (stake_events, unstake_events) => {
    let uniqueAddresses = [];
    let total_axn_staked = 0;
    let total_stake_length = 0;
    let total_active_shares = 0;
    let total_active_stakes_5555 = 0
    let total_axn_staked_5555 = 0;
    let total_active_stakes = (stake_events.length - unstake_events.length);

    stake_events.forEach(ev => {
        if (unstake_events.find(ue => ue.stakeNum === ev.stakeNum)) 
            return;

        const amount = ev.amount / ONE_TOKEN_18; // TODO: do properly
        const shares = ev.shares / ONE_TOKEN_18; // TODO: do properly
        const length = Math.floor((ev.end - ev.start) / 86400);

        total_axn_staked += amount;
        total_stake_length += length;
        total_active_shares += shares;

        if (amount >= 2500000 && length === 5555) {
            total_active_stakes_5555++;
            total_axn_staked_5555 += amount
        }

        if(ev.shares === 0)
            console.log("0 SHARES", ev)

        if(!uniqueAddresses.includes(ev.address))
            uniqueAddresses.push(ev.address)
    })

    return {
        total_axn_staked,
        total_active_shares,
        total_active_stakes,
        total_axn_staked_5555,
        total_active_stakes_5555,
        
        unique_holders: uniqueAddresses.length,
        avg_axn: total_axn_staked / total_active_stakes,
        avg_days: total_stake_length / total_active_stakes
    }
}

const _calculateStakingStats = async () => {

    // Get saved stakes & unstakes from file
    const SAVED_EVENTS = await Promise.all([ 
        readFile(STAKE_EVENTS_FILE), 
        readFile(UNSTAKE_EVENTS_FILE) 
    ])

    let lastSavedStakeEventBlock = CONTRACT_FIRST_BLOCK;
    let lastSavedUnstakeEventBlock = CONTRACT_FIRST_BLOCK;

    if(SAVED_EVENTS[0].length > 0)
        lastSavedStakeEventBlock = SAVED_EVENTS[0][0].block;
    if (SAVED_EVENTS[1].length > 0)
        lastSavedUnstakeEventBlock = SAVED_EVENTS[1][0].block;

    // Get updated stakes & unstakes from last saved block
    const NEW_EVENTS = await Promise.all([
        _getEvents("Stake", lastSavedStakeEventBlock + 1, 'latest'), 
        _getEvents("Unstake", lastSavedUnstakeEventBlock + 1, 'latest') 
    ])

    const ALL_STAKE_EVENTS = uniqueify([...SAVED_EVENTS[0], ...NEW_EVENTS[0]]);
    const ALL_UNSTAKE_EVENTS = uniqueify([...SAVED_EVENTS[1], ...NEW_EVENTS[1]]);
    
    _saveEvents(STAKE_EVENTS_FILE, ALL_STAKE_EVENTS);
    _saveEvents(UNSTAKE_EVENTS_FILE, ALL_UNSTAKE_EVENTS);

    // Return the results
    let results = _processEvents(SAVED_EVENTS[0], SAVED_EVENTS[1]);
    results["block"] = Math.max(lastSavedStakeEventBlock+1, lastSavedUnstakeEventBlock+1);
    results["timestamp"] = Date.now();
    return results;
}

const getStakingStats = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const RESULTS = await _calculateStakingStats();
            resolve(RESULTS);
        } catch (err) { reject(err) }
    })
}

const getActiveStakesByAddress = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let unique_addresses = {}
            const STAKE_EVENTS = await readFile(STAKE_EVENTS_FILE);
            const UNSTAKE_EVENTS = await readFile(UNSTAKE_EVENTS_FILE);

            STAKE_EVENTS.filter(s => !UNSTAKE_EVENTS.find(u => u.stakeNum === s.stakeNum)).forEach(e => {
                if (!unique_addresses[e.address])
                    unique_addresses[e.address] = [e]
                else
                    unique_addresses[e.address].push(e)
            })

            resolve(unique_addresses);
        } catch (err) { reject(err) }
    })
}

const getCompletedStakesByAddress = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let unique_addresses = {}
            const UNSTAKE_EVENTS = await readFile(UNSTAKE_EVENTS_FILE);

            UNSTAKE_EVENTS.forEach(e => {
                if (!unique_addresses[e.address])
                    unique_addresses[e.address] = [e]
                else
                    unique_addresses[e.address].push(e)
            })

            resolve(unique_addresses);
        } catch (err) { reject(err) }
    })
}


const getStakeUnstakeEvents = async (num) => {
    return new Promise(async (resolve, reject) => {
        try {
            const STAKE_EVENTS = await readFile(STAKE_EVENTS_FILE);
            const STAKE_EVENTS_ADJUSTED = STAKE_EVENTS.map(s => {
                s.type = "Stake";
                return s;
            })

            const UNSTAKE_EVENTS = await readFile(UNSTAKE_EVENTS_FILE);
            const UNSTAKE_EVENTS_ADJUSTED = UNSTAKE_EVENTS.map(s => {
                s.type = "Unstake";
                return s;
            })

            const EVENTS = [...STAKE_EVENTS_ADJUSTED, ...UNSTAKE_EVENTS_ADJUSTED].sort((a, b) => b.block - a.block)
            resolve(EVENTS.slice(0, num))
        } catch (err) { reject(err) }
    })
}

const getTotalShares = () => CONTRACTS.staking.methods.sharesTotalSupply().call();

module.exports = {
    _getEvents,
    _getEventsV1,
    getTotalShares,
    getStakingStats,
    getCompletedStakesByAddress,
    getStakeUnstakeEvents,
    getActiveStakesByAddress,
}