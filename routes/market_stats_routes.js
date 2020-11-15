const { getAxnPerEth, getUsdtPerAxn, getVolume, getMarketCap, getTotalSupply } = require('../controllers/market_data');

const express = require('express');
const holder_router = express.Router();

holder_router.get('/axn-eth', async (req, res) => {
    try {
        const result = await getAxnPerEth();
        res.status(200).send(result)
    } catch (err) { 
        console.log(err)
        res.sendStatus(500);
    }
})

holder_router.get('/usdt-axn', async (req, res) => {
    try {
        const result = await getUsdtPerAxn();
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})

holder_router.get('/volume', async (req, res) => {
    try {
        const result = await getVolume();
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})

holder_router.get('/market-cap', async (req, res) => {
    try {
        const result = await getMarketCap();
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})

holder_router.get('/total-supply', async (req, res) => {
    try {
        const result = await getTotalSupply();
        res.status(200).send({total_supply: result})
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
})

module.exports = holder_router;