const { getAxnPerEth, getUsdtPerAxn, getVolume } = require('../../controllers/market_data');

const express = require('express');
const holder_router = express.Router();

holder_router.get('/axn-eth', async (req, res) => {
    const result = await getAxnPerEth();
    res.status(200).send(result)
})

holder_router.get('/usdt-axn', async (req, res) => {
    const result = await getUsdtPerAxn();
    res.status(200).send(result)
})

holder_router.get('/volume', async (req, res) => {
    const result = await getVolume();
    res.status(200).send(result)
})

module.exports = holder_router;