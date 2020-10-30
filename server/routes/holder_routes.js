const { getAllHolders, get1000Holders } = require('../../controllers/holders');
const { db } = require('../../controllers/db');

const express = require('express');
const holder_router = express.Router();

let holders_cache;
let holder_updater;

const _saveToDB = data => {
    db.connect(async (err) => {
        if(!err) {
            const collection = db.db("AxionStats").collection("ecosystem_change");
            collection.insertOne(data);
            db.close();
        }
    });
}

holder_router.get('/holders/all', async (req, res) => {
    if(!holders_cache) {
        const holders = await getAllHolders();
        holders_cache = holders;
        _saveToDB(holders);

        holder_updater = setInterval(async () => {
            const holders = await getAllHolders();
            holders_cache = holders;
            _saveToDB(holders);
        }, 3600000) // 1 hour

        res.status(200).send(holders)
    } else setTimeout(() => { res.status(200).send(holders_cache) }, 500);
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