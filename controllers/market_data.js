const fetch = require('node-fetch');
const { ONE_TOKEN, PROVIDER, AXION, USDT, COINGECKO_VOLUME_INFO_ENDPOINT } = require('../config');
const { Fetcher, ChainId, Route, WETH, Trade, TokenAmount, TradeType } = require('@uniswap/sdk');

const getAxnPerEth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const PAIR = await Fetcher.fetchPairData(WETH[AXION.chainId], AXION, PROVIDER);
            const TRADE = new Trade(
                new Route([PAIR], WETH[AXION.chainId]),
                new TokenAmount(WETH[AXION.chainId], ONE_TOKEN), // 1 ETH
                TradeType.EXACT_INPUT
            )
            
            resolve({ axn: TRADE.executionPrice.toSignificant(6) });
        } catch (err) { reject(err) }
    })
}

const getUsdtPerAxn = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let AXIONwETHPair = await Fetcher.fetchPairData(AXION, WETH[ChainId.MAINNET], PROVIDER)
            let wETHUSDTPair = await Fetcher.fetchPairData(WETH[ChainId.MAINNET], USDT, PROVIDER)

            const TRADE = new Trade(
                new Route([AXIONwETHPair, wETHUSDTPair], AXION),
                new TokenAmount(AXION, ONE_TOKEN + "0"),
                TradeType.EXACT_INPUT
            )

            resolve({usdt: TRADE.executionPrice.toSignificant(6)})
        } catch (err) { reject(err) }
    })
}

const getMarketCap = async () => {
    // Calculated on the front end
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