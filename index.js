const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pdsxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        client.connect()
        const database = client.db("GTour")
        const serviceCollection = database.collection("services")

        // GET SERVICE API
        app.get('/services', async (req, res) => {
            const service = serviceCollection.find({})
            const result = await service.toArray()
            res.json(result)
        })

    }
    finally {

    }
}
run().catch(console.dir)
app.get('/hello', (req, res) => {
    console.log('kuch bhi')
    res.send('hitting check')
})

app.get('/', (req, res) => {
    console.log('this is root route')
    res.send('connect database')
})

app.listen(port, () => {
    console.log('connected to port', port)
})