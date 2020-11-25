const fs = require("fs");
const { getAll, addMany } = require('../controllers/db');
const { calculateEcosystemLevels, splitInteger } = require('../helpers');
const { CONTRACTS, ONE_TOKEN_18 , web3} = require('../config');

const CONTRACT_FIRST_BLOCK = 11236016;
const BLOCK_FILE_PATH = `last_block.txt`;

const _saveBlock = block => {
    fs.writeFile(BLOCK_FILE_PATH, `${block}`, (err) => {
        if (err) console.log(err);
    });
}

const _readSavedBlock = () => {
    return new Promise(resolve => {
        fs.readFile(BLOCK_FILE_PATH, "utf-8", (err, data) => {
            if (err) return resolve(CONTRACT_FIRST_BLOCK);
            else return resolve(Number(data))
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

const _saveRawDataToDB = raw => {
    if(raw[0].length > 0)
        addMany("stake_events_raw", raw[0])
    if (raw[1].length > 0)
        addMany("unstake_events_raw", raw[1])
}

// Get "type" events from the staking contract.
const _getEvents = async (type, fromBlock, toBlock) => {
    const CURRENT_BLOCK = await web3.eth.getBlockNumber();
    process.env.BLOCK = CURRENT_BLOCK
    _saveBlock(CURRENT_BLOCK);

    return new Promise(resolve => {
        CONTRACTS.staking.getPastEvents(type, { fromBlock, toBlock }, async (error, events) => {
            if (error) {
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

const _calculateStakingStats = async (host) => {

    // Get saved stakes & unstakes from DB
    const SAVED_EVENTS = await Promise.all([ 
        getAll("stake_events_raw"), 
        getAll("unstake_events_raw") 
    ])

    // Get updated stakes & unstakes from last saved block
    const LAST_CHECKED_BLOCK = await _readSavedBlock();
    const NEW_EVENTS = await Promise.all([
        _getEvents("Stake", LAST_CHECKED_BLOCK + 1, 'latest'), 
        _getEvents("Unstake", LAST_CHECKED_BLOCK + 1, 'latest') 
    ])

    if (!host.includes("localhost")) 
        _saveRawDataToDB(NEW_EVENTS);
   
    let results = _processEvents(
        SAVED_EVENTS[0].concat(NEW_EVENTS[0]), 
        SAVED_EVENTS[1].concat(NEW_EVENTS[1])
    );

    // Return the results
    results["block"] = LAST_CHECKED_BLOCK;
    results["timestamp"] = Date.now();
    return results;
}

const getStakingStats = async (host) => {
    return new Promise(async (resolve, reject) => {
        try {
            const RESULTS = await _calculateStakingStats(host);
            resolve(RESULTS);
        } catch (err) { reject(err) }
    })
}

const getEcosystemLevels = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let unique_addresses = {}
            const STAKE_EVENTS = await getAll("stake_events_raw");
            const UNSTAKE_EVENTS = await getAll("unstake_events_raw");
            
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
            const STAKE_EVENTS = await getAll("stake_events_raw");
            const UNSTAKE_EVENTS = await getAll("unstake_events_raw");

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
    getEcosystemLevels,
    getLastCheckedBlock: _readSavedBlock
}