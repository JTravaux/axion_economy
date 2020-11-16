const { getEstimatedTrees, getPastEvents } = require('../controllers/auction');

const express = require('express');
const auction_router = express.Router();

auction_router.get('/trees', async (req, res) => {
    try {
        const results = await getEstimatedTrees();
        res.status(200).send(results)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = auction_router;