const fetch = require('node-fetch');
const { USDT, BLOXY_GET_ETH_BALANCE } = require('../config');
const { Fetcher, Route, WETH} = require('@uniswap/sdk');

let lastEthPrice = 0;
let lastEthBalance = 0;
let ethPriceUpdater = null;
let ethBalanceUpdater = null;

// METHODS
const _startETHPriceAutoUpdater = () => {
    ethPriceUpdater = setInterval(async () => {
        try {
            const pair = await Fetcher.fetchPairData(USDT, WETH[USDT.chainId])
            lastEthPrice = new Route([pair], WETH[USDT.chainId]).midPrice.toSignificant(6);
        } catch (err) {
            clearInterval(ethPriceUpdater);
            ethPriceUpdater = null;
        }
    }, 1000 * (60 * 10)) // 10 minutes
}

const _startBalanceAutoUpdater = () => {
    ethBalanceUpdater = setInterval(async () => {
        try {
            const RES = await fetch(BLOXY_GET_ETH_BALANCE);
            const RES_JSON = await RES.json()
            lastEthBalance = RES_JSON[0].received_amount;
        } catch (err) {
            clearInterval(ethBalanceUpdater);
            ethBalanceUpdater = null;
        }
    }, 1000 * (60 * 1)) // 1 minute
}

const getEstimatedTrees = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get ETH Price
            if (!ethPriceUpdater) {
                const pair = await Fetcher.fetchPairData(USDT, WETH[USDT.chainId])
                lastEthPrice = new Route([pair], WETH[USDT.chainId]).midPrice.toSignificant(6);
                _startETHPriceAutoUpdater();
            }

            // Get ETH Balance
            if (!ethBalanceUpdater) {
                const RES = await fetch(BLOXY_GET_ETH_BALANCE);
                const RES_JSON = await RES.json()
                lastEthBalance = RES_JSON[0].received_amount;
                _startBalanceAutoUpdater();
            }

            // Calculate Trees
            const ONE_PERCENT_ETH = lastEthBalance * 0.01; // 1% of the funds in this address
            const USDT_FOR_TREES = ONE_PERCENT_ETH * Number(lastEthPrice);

            // Save result and block number to
            resolve({ 
                trees: Math.floor(USDT_FOR_TREES / 0.10), 
                amount: USDT_FOR_TREES,
                eth: ONE_PERCENT_ETH
            })
        } catch (err) { reject(err) }
    })
}

module.exports = {
    getEstimatedTrees,
}