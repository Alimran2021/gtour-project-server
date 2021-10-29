const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('this is root route')
    res.send('connect database')
})

app.listen(port, () => {
    console.log('connected to port', port)
})