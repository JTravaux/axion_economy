const { CONTRACTS, ONE_TOKEN_18, web3 } = require('../config');

// METHODS
const CONTRACT_FIRST_BLOCK = 11236016;
let latestBlockNumber;
let theresMore = false;

const _formatEvents = events => {
    let count_5555 = 0
    let count_5555_axn = 0;

    try {
        const EVENTS = events.map(ev => {
            const amount = ev.returnValues.amount / ONE_TOKEN_18;
            const length = Math.floor((ev.returnValues.end - ev.returnValues.start) / 86400);

            if (amount >= 2500000 && length === 5555) {
                count_5555++;
                count_5555_axn += amount
            }

            return ev.returnValues.amount / ONE_TOKEN_18
        })

        return {
            events: EVENTS,
            count_5555,
            count_5555_axn
        }
    } catch (err) {
        console.log(err.message)
        return null;
    }
}

const _getEvents = (fromBlock, toBlock) => {
    return new Promise((resolve, reject) => {
        CONTRACTS.staking.getPastEvents('Stake', { fromBlock, toBlock }, (error, events) => {
            if (error)
                resolve({ message: error.message });
            else resolve(events);
        })
    })
}

const finalizeEvents = (events) => {
    theresMore = false;
    const EVENTS = _formatEvents(events)

    return ({
        num_5555_stakers: EVENTS.count_5555,
        total_5555_axn_staked: EVENTS.count_5555_axn,
        total_stakers: EVENTS.events.length,
        total_staked: EVENTS.events.reduce((a, b) => a + b, 0)
    });
}

const _getPastEvents = async () => {
    const EVENTS = await _getEvents(CONTRACT_FIRST_BLOCK, latestBlockNumber);
    if (EVENTS.message) {
        latestBlockNumber = (CONTRACT_FIRST_BLOCK + latestBlockNumber) / 2
        theresMore = true;
        const EVENTS = await _getEvents(CONTRACT_FIRST_BLOCK, latestBlockNumber);
        return finalizeEvents(EVENTS)
    }
    else 
        return finalizeEvents(EVENTS)
}


const get5555Stats = async () => {
    const BLOCK = await web3.eth.getBlockNumber();
    latestBlockNumber = BLOCK;
    return _getPastEvents();
}

module.exports = {
    get5555Stats,
}