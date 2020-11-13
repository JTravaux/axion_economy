const Web3 = require('web3');
const { ethers } = require('ethers');
const { ChainId, Token } = require('@uniswap/sdk');

const AXION_CONTRACT = "0x7d85e23014f84e6e21d5663acd8751bef3562352";
const USDT_CONTRACT = "0xdac17f958d2ee523a2206206994597c13d831ec7";

const IGNORED_ADDRESSES = [
    "0xe8b283b606a212d82036f74f88177375125440f6" /* DEV FUND */,
    // "0x28697b4a1618a77b1d61a85e99174616b519f629" /* PYRA CONTRACT */,
    // "0x63499caacfd364c516075245a2950e830a910b90" /* UNI */
]

const ETHPLORER_API = "EK-f48kD-FeUA5G1-do7UA"
const ETHPLORER_TOKEN_HOLDERS_ENDPOINT = `https://api.ethplorer.io/getTopTokenHolders/${AXION_CONTRACT}?apiKey=${ETHPLORER_API}&limit=1000`
const BLOXY_TOKEN_HOLDERS_ENDPOINT = `https://api.bloxy.info/token/token_holders_list?token=${AXION_CONTRACT}&limit=100000&key=ACCRtzFY9yPTF&format=structure`
const COINGECKO_VOLUME_INFO_ENDPOINT = "https://api.coingecko.com/api/v3/coins/hex2t?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";

const ONE_TOKEN = "1000000000000000000";
const PROVIDER = new ethers.providers.EtherscanProvider("homestead", "2AVWB5E47AG32JUNASSZM83A7XE71MQ92R");
const USDT = new Token(ChainId.MAINNET, Web3.utils.toChecksumAddress(USDT_CONTRACT), 6);
const AXION = new Token(ChainId.MAINNET, Web3.utils.toChecksumAddress(AXION_CONTRACT), 18);

module.exports = {
    USDT,
    AXION,
    PROVIDER,
    ONE_TOKEN,
    AXION_CONTRACT,
    IGNORED_ADDRESSES,
    BLOXY_TOKEN_HOLDERS_ENDPOINT,
    COINGECKO_VOLUME_INFO_ENDPOINT,
    ETHPLORER_TOKEN_HOLDERS_ENDPOINT,
}