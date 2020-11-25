const fetch = require('node-fetch');
const { BLOXY_TOKEN_HOLDERS_ENDPOINT, ETHPLORER_TOKEN_HOLDERS_ENDPOINT } = require('../config');

const calculateEcosystem = data => {
    const res = data.filter(h => 
        h.balance >= 1 && 
        h.address_type === "Wallet" && 
        h.address !== "0xe8b283b606a212d82036f74f88177375125440f6"
    );

    const results = {
        totals: {
            holders: 0,
            held_axn: 0,
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
        tigerShark:{
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
        addresses: res.map(a => a.address)
    }

    res.forEach(r => {
        if (r.balance >= 1 && r.balance <= 999) {
            results.totals.holders++;
            results.shrimp.count++;
            results.totals.held_axn += r.balance;
            results.shrimp.totalAxn += r.balance;
        }
        else if (r.balance >= 1000 && r.balance <= 999999) {
            results.totals.holders++;
            results.crab.count++;
            results.totals.held_axn += r.balance;
            results.crab.totalAxn += r.balance;
        }
        else if (r.balance >= 1000000 && r.balance <= 9999999) {
            results.totals.holders++;
            results.fish.count++;
            results.totals.held_axn += r.balance;
            results.fish.totalAxn += r.balance;
        }
        else if (r.balance >= 10000000 && r.balance <= 49999999) {
            results.totals.holders++;
            results.octopus.count++;
            results.totals.held_axn += r.balance;
            results.octopus.totalAxn += r.balance;
        }
        else if (r.balance >= 50000000 && r.balance <= 99999999) {
            results.totals.holders++;
            results.dolphin.count++;
            results.totals.held_axn += r.balance;
            results.dolphin.totalAxn += r.balance;
        }
        else if (r.balance >= 100000000 && r.balance <= 499999999) {
            results.totals.holders++;
            results.tigerShark.count++;
            results.totals.held_axn += r.balance;
            results.tigerShark.totalAxn += r.balance;
        }
        else if (r.balance >= 500000000 && r.balance <= 999999999) {
            results.totals.holders++;
            results.greatWhite.count++;
            results.totals.held_axn += r.balance;
            results.greatWhite.totalAxn += r.balance;
        }
        else if (r.balance >= 1000000000) {
            results.totals.holders++;
            results.whale.count++;
            results.totals.held_axn += r.balance;
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

const getAllHolders = async () => {
    try {
        const res = await fetch(BLOXY_TOKEN_HOLDERS_ENDPOINT);
        const results = await res.json();

        let holders = results.map(h => { return { address: h.address, balance: h.balance, address_type: h.address_type }})
        return calculateEcosystem(holders);
    } catch (err) {
        console.log(err)
        return [];
    }
}

const getHolderCount = async () => {
    try {
        const res = await fetch(BLOXY_TOKEN_HOLDERS_ENDPOINT);
        const results = await res.json();
        return results.filter(h => h.balance >= 0.00000001).length; // 0.00000001 just made it closest to etherscan at the time.
    } catch (err) {
        console.log(err)
        return [];
    }
}

const get1000Holders = async () => {
    try {
        const res = await fetch(ETHPLORER_TOKEN_HOLDERS_ENDPOINT);
        const results = await res.json();

        let holders = results.holders.filter(h => h.balance >= 1).map(h => { return { address: h.address, balance: h.balance } })
        return calculateEcosystem(holders);
    } catch (err) {
        console.log(err)
        return [];
    }
}

module.exports = {
    getAllHolders,
    get1000Holders,
    getHolderCount,
}