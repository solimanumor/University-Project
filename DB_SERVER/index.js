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
        const registerCollection2 = database.collection('register_data2');

        const second_database = client.db('db2')
        const second_registerCollection = second_database.collection('second_register_data');
//--------------------copy one collection to anouther collection function ------------
        // registerCollection2.find().forEach(
        //     function(x){
        //         second_registerCollection.insert(x)
        //     }
        // );
//------------------------------------------------------------------
        app.post('/register', async(req, res) => {
            console.log('register url hitting', req.body)
            const newUser = req.body;
            const result = await registerCollection.insertOne(newUser);
            //const result2 = await registerCollection2.insertOne(newUser);
            
            res.json(result);
            
            
            
          })

          app.post('/register2', async(req, res) => {
            console.log('register url hitting', req.body)
            const newUser = req.body;
            const result2 = await registerCollection2.insertOne(newUser);
            //const result2 = await registerCollection2.insertOne(newUser);
            
            res.json(result2);
            
            })

        app.post('/second_register', async(req, res) => {
            console.log('second register url hitting', req.body)
            const newUser = req.body;
            const result = await second_registerCollection.insertOne(newUser);
            
            res.json(result);
            
          })

          app.get('/second_register', async (req, res) => {
            const cursor = second_registerCollection.find({});
            const result = await cursor.toArray();
            res.json(result);
        });
        app.delete('/second_register', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log('proxy database deleted')
            const result = await second_registerCollection.deleteMany({});
            res.json(result);
        });

        

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

// app.post('/', async(req, res) => {
            
//     const newUser = req.body;
//     const result = await registerCollection.copyTo(second_registerCollection);
    
//     res.json(result);
    
//   })