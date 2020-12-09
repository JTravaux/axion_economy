const fs = require("fs");
const { CONTRACTS, ONE_TOKEN_18 , web3 } = require('../config');
const { calculateEcosystemLevels, splitInteger, uniqueify } = require('../helpers');

const CONTRACT_FIRST_BLOCK = 11236016;
const STAKE_EVENTS_FILE = "stake_events_raw.txt";
const UNSTAKE_EVENTS_FILE = "unstake_events_raw.txt";

const _saveEvents = (path, events) => {
    const SORTED_EVENTS = events.sort((a, b) => b.block - a.block);
    fs.writeFile(path, JSON.stringify(SORTED_EVENTS), (err) => {
        if (err) console.log(err);
    });
}

const _readSavedEvents = path => {
    return new Promise(resolve => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) return resolve([])
            else return resolve(JSON.parse(data))
        });
    })
}

const _cleanData = data => data.map(d => {
    return {
        address: d.returnValues.account,
        stakeNum: d.returnValues.sessionId,
        amount: d.returnValues.amount,
        start: d.returnValues.start,
        end: d.returnValues.end,
        shares: d.returnValues.shares,
        block: d.blockNumber
    }
})

// Get "type" events from the staking contract.
const _getEvents = async (type, fromBlock, toBlock) => {
    return new Promise(resolve => {
        CONTRACTS.staking.getPastEvents(type, { fromBlock, toBlock }, async (error, events) => {
            if (error) {
                const CURRENT_BLOCK = await web3.eth.getBlockNumber();
                const BLOCKS_FROM_START = CURRENT_BLOCK - CONTRACT_FIRST_BLOCK;
                const BLOCK_CHUNKS = splitInteger(BLOCKS_FROM_START, 10)
                
                let promises = [];
                let startBlock = CONTRACT_FIRST_BLOCK;
                let endBlock = CONTRACT_FIRST_BLOCK + BLOCK_CHUNKS[0];

                for (let i = 0; i < BLOCK_CHUNKS.length; ++i) {
                    promises.push(_getEvents(type, startBlock, endBlock));
                    const newStartBlock = endBlock + 1;
                    startBlock = newStartBlock;
                    endBlock = newStartBlock + BLOCK_CHUNKS[i]
                }

                const RESULTS = await Promise.all(promises)
                resolve([].concat.apply([], RESULTS))
            }
            else {
                const CLEANED_DATA = _cleanData(events);
                resolve(CLEANED_DATA)
            }
        })
    })
}

const _processEvents = (stake_events, unstake_events) => {
    let uniqueAddresses = [];
    let total_axn_staked = 0;
    let total_stake_length = 0;
    let total_active_stakes_5555 = 0
    let total_axn_staked_5555 = 0;
    let total_active_stakes = (stake_events.length - unstake_events.length);

    stake_events.forEach(ev => {
        if (unstake_events.find(ue => ue.stakeNum === ev.stakeNum)) 
            return;

        const amount = ev.amount / ONE_TOKEN_18; // TODO: do properly
        const length = Math.floor((ev.end - ev.start) / 86400);

        total_axn_staked += amount;
        total_stake_length += length;

        if (amount >= 2500000 && length === 5555) {
            total_active_stakes_5555++;
            total_axn_staked_5555 += amount
        }

        if (length > 5555)
            console.error("ABOVE 5555 DAYS", ev)

        if(!uniqueAddresses.includes(ev.address))
            uniqueAddresses.push(ev.address)
    })

    return {
        total_axn_staked,
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
        _readSavedEvents(STAKE_EVENTS_FILE), 
        _readSavedEvents(UNSTAKE_EVENTS_FILE) 
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
    let results = _processEvents(ALL_STAKE_EVENTS, ALL_UNSTAKE_EVENTS);
    results["block"] = Math.max(lastSavedStakeEventBlock, lastSavedUnstakeEventBlock);
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

const getEcosystemLevels = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let unique_addresses = {}
            const STAKE_EVENTS = await _readSavedEvents(STAKE_EVENTS_FILE);
            const UNSTAKE_EVENTS = await _readSavedEvents(UNSTAKE_EVENTS_FILE);
            
            STAKE_EVENTS.filter(s => !UNSTAKE_EVENTS.find(u => u.stakeNum === s.stakeNum)).forEach(e => { 
                if (!unique_addresses[e.address])
                    unique_addresses[e.address] = [e]
                else
                    unique_addresses[e.address].push(e)
            })

            resolve(calculateEcosystemLevels(unique_addresses));
        } catch (err) { reject(err) }
    })
}

const getStakerEcoData = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let unique_addresses = {}
            const STAKE_EVENTS = await _readSavedEvents(STAKE_EVENTS_FILE);
            const UNSTAKE_EVENTS = await _readSavedEvents(UNSTAKE_EVENTS_FILE);

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

module.exports = {
    getStakingStats,
    getStakerEcoData,
    getEcosystemLevels
}