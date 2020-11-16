const { CONTRACTS, ONE_TOKEN_18, web3 } = require('../config');

// METHODS
const get5555Stats = () => {
    return new Promise((resolve, reject) => {
        CONTRACTS.staking.getPastEvents('Stake', { fromBlock: 11236016, toBlock: 11266284 }, (error, events) => {
            if (error) {
                reject({ message: error.message });
                return;
            }

            let count_5555 = 0
            let count_5555_axn = 0;

            const EVENTS = events.map(ev => {
                const amount = ev.returnValues.amount / ONE_TOKEN_18;
                const length = Math.floor((ev.returnValues.end - ev.returnValues.start) / 86400);

                if (amount >= 2500000 && length === 5555) {
                    count_5555++;
                    count_5555_axn += amount
                }

                return { amount: ev.returnValues.amount / ONE_TOKEN_18 }
            })

            resolve({
                num_5555_stakers: count_5555,
                total_5555_axn_staked: count_5555_axn,
                total_stakers: EVENTS.length,
                total_staked: EVENTS.reduce((a, b) => a + b, 0)
            });
        })
    })
}

module.exports = {
    get5555Stats,
}