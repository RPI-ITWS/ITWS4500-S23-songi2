const express = require('express')
const request = require('request');
const app = express()
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const uri = 'mongodb+srv://loadedskiffer:Miles1010@cluster0.dzoet5k.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const cors = require('cors');
const { json } = require('body-parser');
app.use(cors({
    origin: 'http://localhost:3000'
  }))

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//global variabls for averages
WIND_SPEED_AVERAGE = 1.582
AIR_TEMP_AVERAGE = 281.574
WIND_STRESS_AVERAGE = 0.03995


app.use(express.static('./public'))  
// app.use(express.static('./build/static'))

//Grab all locations
app.get("/data", async (req, res) => {
    try{
        await client.connect();
        const db = client.db("WindData");
        const collection = db.collection("locations");
        console.log(collection)
        try {
            const cursor = await collection.find();
            const data = await cursor.toArray();
            console.log(data)
            res.status(200).json(data);
        } catch(err){
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching data" }); 
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while connecting" }); 
    }
    finally {
        await client.close();
    }    
})

//Grab location corresponding to state
app.get("/data/:state/:category/:sort", async (req, res) => {
    const state = req.params.state;
    const category = req.params.category;
    const sort = req.params.sort;
    
    try {
      await client.connect();
      const db = client.db("WindData");
      const collection = db.collection("locations");
      
      // Create the query object based on the state parameter
      const query = { state: state };
      
      // Create the sort object based on the category and sort parameters
      let sortObj = {};
      sortObj[category] = sort === "asc" ? 1 : -1;
  
      // Limit the number of results to 50
      const limit = 50;
      
      const cursor = await collection.find(query).sort(sortObj).limit(limit);
      const data = await cursor.toArray();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching data" });
    } finally {
      await client.close();
    }
  });
  
//just a test route that grabs 1 location with the specified id
app.get("/data/:id", async (req, res) => {
    try{
        await client.connect();
        const db = client.db("WindData");
        const collection = db.collection("locations");
        console.log(collection)
        try {
            const id = req.params.id;
            console.log(id)
            if (id) {
                const query = { id: Number(id) };
                console.log(query)
                const cursor = await collection.findOne(query);
                console.log(cursor)
                if (!cursor) {
                    console.log('not found')
                    res.status(200).json(cursor)
                } else {
                    res.status(200).json(cursor);
                }
            } 
        }catch(err){
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching data" }); 
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while connecting" }); 
    }
    finally {
        await client.close();
    }    
})

//test route to try sorting stuff
app.get("/sort", async (req, res) => {
    try{
        await client.connect();
        const db = client.db("WindData");
        const collection = db.collection("locations");
        console.log(collection)
        try {
            const query = {'state': 'New York'};
            console.log(query)
            const cursor = await collection.find(query).sort({'air_temp':-1}).limit(20).toArray();
            if (!cursor) {
                console.log('not found')
                res.status(200).json(cursor)
            } else {
                res.status(200).json(cursor);
            }
        }catch(err){
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching data" }); 
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while connecting" }); 
    }
    finally {
        await client.close();
    }    
})


app.listen(3001, '127.0.0.1');
// app.listen(port, () => console.log(`Server running on port ${port}`))