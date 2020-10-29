const { getAllHolders, get1000Holders } = require('../../controllers/holders');

const express = require('express');
const holder_router = express.Router();

let holders_cache;
let holder_updater;

holder_router.get('/holders/all', async (req, res) => {
    if(!holders_cache) {
        const holders = await getAllHolders();

        // Homemade cache
        holders_cache = holders;
        holder_updater = setInterval(async () => {
            const holders = await getAllHolders();
            holders_cache = holders;
            console.log("Updated Holders")
        }, 3600000) // 1 hour

        res.status(200).send(holders)
    } else res.status(200).send(holders_cache)
})

holder_router.get('/holders/top', async (req, res) => {
    const holders = await get1000Holders();
    res.status(200).send(holders)
})

holder_router.get('/holders/cache/clear/:password', async (req, res) => {
    if(req.params.password === "AxIoNsPoKe42069") {
        holders_cache = await getAllHolders();
        res.status(200).send(holders_cache)
    }
    else res.status(401).send("Not Authorized");
})

module.exports = holder_router;