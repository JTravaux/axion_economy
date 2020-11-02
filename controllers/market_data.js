const Web3 = require('web3');
const fetch = require('node-fetch');
const { ethers } = require('ethers');
const { Fetcher, ChainId, Token, Route, WETH, Trade, TokenAmount, TradeType } = require('@uniswap/sdk');

const AXION_CONTRACT = "0xda4c5aea122260e70616e979592735f12fe20499";
const PROVIDER = new ethers.providers.EtherscanProvider("homestead", "2AVWB5E47AG32JUNASSZM83A7XE71MQ92R");

const getAxnPerEth = () => {
    return new Promise(async (resolve, reject) => {
        const AXION = new Token(ChainId.MAINNET, Web3.utils.toChecksumAddress(AXION_CONTRACT), 18);

        try {
            const PAIR = await Fetcher.fetchPairData(WETH[AXION.chainId], AXION, PROVIDER);
            const TRADE = new Trade(
                new Route([PAIR], WETH[AXION.chainId]),
                new TokenAmount(WETH[AXION.chainId], "1000000000000000000"), // 1 ETH
                TradeType.EXACT_INPUT
            )

            resolve({ axn: TRADE.executionPrice.toSignificant(6) });
        } catch (err) { reject(err) }
    })
}

const getUsdtPerAxn = () => {
    return new Promise(async (resolve, reject) => {
        const AXION = new Token(ChainId.MAINNET, Web3.utils.toChecksumAddress(AXION_CONTRACT), 18);
        const USDT = new Token(ChainId.MAINNET, Web3.utils.toChecksumAddress('0xdac17f958d2ee523a2206206994597c13d831ec7'), 6);

        try {
            let AXIONwETHPair = await Fetcher.fetchPairData(AXION, WETH[ChainId.MAINNET], PROVIDER)
            let wETHUSDTPair = await Fetcher.fetchPairData(WETH[ChainId.MAINNET], USDT, PROVIDER)

            const TRADE = new Trade(
                new Route([AXIONwETHPair, wETHUSDTPair], AXION),
                new TokenAmount(AXION, "10000000000000000000"),
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
        fetch("https://api.coingecko.com/api/v3/coins/hex2t?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false").then(result => {
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