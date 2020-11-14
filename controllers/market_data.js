const web3 = require('web3');
const fetch = require('node-fetch');
const { Fetcher, ChainId, Route, WETH, Trade, TokenAmount, TradeType } = require('@uniswap/sdk');
const { ONE_TOKEN_18, PROVIDER, AXION, USDT, COINGECKO_VOLUME_INFO_ENDPOINT, CONTRACTS } = require('../config');

// METHODS
const getAxnPerEth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const PAIR = await Fetcher.fetchPairData(WETH[AXION.chainId], AXION, PROVIDER);
            const TRADE = new Trade(
                new Route([PAIR], WETH[AXION.chainId]),
                new TokenAmount(WETH[AXION.chainId], ONE_TOKEN_18),
                TradeType.EXACT_INPUT
            )
            
            resolve({ axn: TRADE.executionPrice.toSignificant(6) });
        } catch (err) { reject(err) }
    })
}

let lastPrice;
const getUsdtPerAxn = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let AXIONwETHPair = await Fetcher.fetchPairData(AXION, WETH[ChainId.MAINNET], PROVIDER)
            let wETHUSDTPair = await Fetcher.fetchPairData(WETH[ChainId.MAINNET], USDT, PROVIDER)

            const TRADE = new Trade(
                new Route([AXIONwETHPair, wETHUSDTPair], AXION),
                new TokenAmount(AXION, ONE_TOKEN_18),
                TradeType.EXACT_INPUT
            )

            lastPrice = TRADE.executionPrice.toSignificant(6);
            resolve({usdt: TRADE.executionPrice.toSignificant(6)})
        } catch (err) { reject(err) }
    })
}

const getMarketCap = async () => {
    return new Promise((resolve, reject) => {
        CONTRACTS.token.methods.totalSupply().call().then(async (supply) => {
            const ADJUSTED_SUPPLY = web3.utils.toBN(supply).div(web3.utils.toBN(ONE_TOKEN_18)).toNumber();
    
            if (lastPrice) {
                const MARKET_CAP = ADJUSTED_SUPPLY * Number(lastPrice);
                resolve({ market_cap: MARKET_CAP });
            } else {
                try {
                    const PRICE = await getUsdtPerAxn();
                    const MARKET_CAP = ADJUSTED_SUPPLY * Number(PRICE.usdt)
                    resolve({ market_cap: MARKET_CAP });
                } catch (err) { reject(err) }
            }
        }).catch(err => reject(err))
    })
}

const getVolume = () => {
    return new Promise((resolve, reject) => {
        fetch(COINGECKO_VOLUME_INFO_ENDPOINT).then(result => {
            result.json().then(res => {
                resolve({ 
                    usd: res.market_data.total_volume.usd, 
                    eth: res.market_data.total_volume.eth
                });
            })
        }).catch(err => reject(err))
    })
}

module.exports = {
    getVolume,
    getMarketCap,
    getAxnPerEth,
    getUsdtPerAxn,
}