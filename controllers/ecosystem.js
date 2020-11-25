const { ONE_TOKEN_18 } = require('../config.js');
const { getLiquidEcoData } = require('./holders');
const { getStakerEcoData } = require('./staking');
const { calculateEcosystemLevels } = require('../helpers');

const calculateEcosystem = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const LIQUID_DATA = await getLiquidEcoData();
            const STAKER_DATA = await getStakerEcoData();
            let liquid = []
            let staked = []
            let combined = [];

            // Format LIQUID data
            liquid = [
                ...LIQUID_DATA.filter(h =>
                    h.balance >= 1 &&
                    h.address_type === "Wallet" &&
                    h.address !== "0xe8b283b606a212d82036f74f88177375125440f6"
                ).map(l => { return { address: l.address.toUpperCase(), balance: l.balance } })
            ]

            // Format STAKER data
            Object.keys(STAKER_DATA).forEach(addr => {
                let balance = 0;
                STAKER_DATA[addr].forEach(r => { balance += (r.amount / ONE_TOKEN_18) })
                staked.push({ address: addr.toUpperCase(), balance })
            })

            // Combine address who have both staked & liquid AXN
            staked.concat(liquid).forEach(tc => {
                const ADDRESS = tc.address;
                const BALANCE = tc.balance;
                const IDX = combined.findIndex(c => c.address === ADDRESS);
                if (IDX === -1)
                    combined.push(tc)
                else
                    combined[IDX].balance += BALANCE
            })

            const RESULT = calculateEcosystemLevels(liquid, staked, combined)
            resolve(RESULT)
        } catch (err) {
            console.log(err);
            reject(err)
        }
    })
}

module.exports = {
    calculateEcosystem
}