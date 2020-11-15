const { db } = require('../controllers/db');
const { getAllHolders, get1000Holders, getHolderCount } = require('../controllers/holders');

const express = require('express');
const holder_router = express.Router();

let holders_cache;
let holder_updater;

const _saveToDB = (data, ref) => {
    if (ref && ref.includes("localhost")) {
        console.log("Not Saved, on local.")
        return;
    }
    
    if(data) {
        db.connect(async (err) => {
            if (!err)
                db.db("AxionStats").collection("ecosystem_change").insertOne(data).catch(err => console.log(err))
        });
    }
}

holder_router.get('/holders/all', async (req, res) => {
    if(!holders_cache) {
        try {
            const holders = await getAllHolders();
            holders_cache = holders;
            _saveToDB(holders, req.headers.host);
          
            holder_updater = setInterval(async () => {
                const holders = await getAllHolders();
                holders_cache = holders;
                _saveToDB(holders, req.headers.host);
            }, 600000) //3600000 = 1 hour, 600000 = 10 minute

            res.status(200).send(holders)
        } catch (err) {
            console.log(err)
            res.sendStatus(500) 
        }
    } else setTimeout(() => { res.status(200).send(holders_cache) }, 500);
})

holder_router.get('/holders/top', async (req, res) => {
    try {
        const holders = await get1000Holders();
        res.status(200).send(holders)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

holder_router.get('/holders/count', async (req, res) => {
    try {
        const holders = await getHolderCount();
        res.status(200).send({num_holders: holders})
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

holder_router.get('/holders/cache/clear/:key', async (req, res) => {
    if(req.params.key === "travaux") {
        holders_cache = await getAllHolders();
        res.status(200).send(holders_cache)
    }
    else res.status(401).send({ message: "Not Authorized" });
})

holder_router.get('/holders/history/:num', async (req, res) => {
    db.connect(async (err) => {
        if (!err) {
            if (isNaN(Number(req.params.num))) 
                res.status(401).send({ message: `${req.params.num} is not a number.`, invalid_param: req.params.num })
            else {
                const history = await db.db("AxionStats").collection("ecosystem_change").find().limit(Number(req.params.num)).toArray()
                res.status(200).send(JSON.stringify(history))
            }
        } else res.sendStatus(500);
    });
})

module.exports = holder_router;