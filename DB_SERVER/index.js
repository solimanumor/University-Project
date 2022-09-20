const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// const stripe = require('stripe')(process.env.STRIPE_SECRET);
// const fileUpload = require('express-fileupload');

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
// app.use(fileUpload());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gn5t9gw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {

        await client.connect();
        console.log("database connected");
        const database = client.db('db1')
        const registerCollection = database.collection('register_data');
        
        app.post('/register', async(req, res) => {
            console.log('register url hitting', req.body)
            const newUser = req.body;
            const result = await registerCollection.insertOne(newUser);
            res.json(result);
            res.send('POST request to the homepage')
          })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})
