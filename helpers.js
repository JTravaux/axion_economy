const { ONE_TOKEN_18 } = require('./config');

const calculateEcosystemLevels = data => {
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
        addresses: []
    }

    let formattedData = [];

    Object.keys(data).forEach(d => {
        let balance = 0;
        data[d].forEach(r => {
            balance += (r.amount / ONE_TOKEN_18)
        })
        formattedData.push({ address: d, balance })
    })

    formattedData.forEach(r => {
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
    results.addresses = formattedData.map(d => d.address)
    results.totals.last_updated = Date.now();

    return results;
}

const splitInteger = (number, parts) => {
    const remainder = number % parts
    const baseValue = (number - remainder) / parts

    return Array(parts).fill(baseValue).fill(baseValue + 1, parts - remainder)
}

module.exports = {
    splitInteger,
    calculateEcosystemLevels
}