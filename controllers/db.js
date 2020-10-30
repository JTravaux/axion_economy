const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://JTravaux:9rgQNQPcA6QhETF8@axionstatsdb.4l8x2.mongodb.net/AxionStats?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true });

module.exports = {
    db
}