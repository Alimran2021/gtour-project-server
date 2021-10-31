const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pdsxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        client.connect()
        const database = client.db("GTour")
        const serviceCollection = database.collection("services")
        const ordersCollection = database.collection("orders")

        // GET SERVICE API
        app.get('/services', async (req, res) => {
            const service = serviceCollection.find({})
            const result = await service.toArray()
            res.json(result)
        })
        // POST ORDER API
        app.post('/orders', async (req, res) => {
            const order = await ordersCollection.insertOne(req.body)
            res.json(order)



        })
        // GET MYORDER API
        app.get("/myOrders/:email", async (req, res) => {
            const result = await ordersCollection.find({
                email: req.params.email,
            }).toArray();
            res.send(result);

        });
        // GET ALL MANAGE ORDERS
        app.get('/orders', async (req, res) => {
            const orders = ordersCollection.find({})
            const manageOrder = await orders.toArray()
            res.json(manageOrder)

        })
        // GET NEW SERVICE
        app.post('/services', async (req, res) => {
            const newService = await serviceCollection.insertOne(req.body)
            res.json(newService)
        })

        // DELETE API
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await ordersCollection.deleteOne(query)
            console.log('this item be deleted', result)
            res.json(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    console.log('this is root route')
    res.send('connect database')
})

app.listen(port, () => {
    console.log('connected to port', port)
})