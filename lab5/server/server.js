const request = require('request');
const express = require('express');
const app = express();

// This is to have the port can connect to data from other port
const cors = require('cors');
app.use(cors());

// Connecting Mong
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://saja0930:96btDor4ByE2NiNX@websci.atlvojr.mongodb.net/Web_Sci?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// This will get all soccer_data from the database
app.get("/db", async (req, res) => {
    await client.connect();
    const db = client.db("Web_Sci");
    const collections = await db.collection("soccer_data").find().toArray();
    res.json(collections);
  });

// This will get corresponding team id with then number
app.get("/db/:number", async (req, res) => {
    await client.connect();
    const db = client.db("Web_Sci");
    const collection = db.collection("soccer_data");
    const team = await collection.findOne({
      "response.team.id": parseInt(req.params.number), //response.team.id is the number
    });
    if (!team) {
      res.status(404).json({ message: "team not found" });
    } else {
      res.json(team);
    }
});

// This will reset the database by iterating through the json file
app.post('/db/reset', async (req, res) => {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db('Web_Sci');
  
      const files = await fs.promises.readdir('./100_json_call');
  
      await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(async file => {
            const fileContent = await fs.promises.readFile('./100_json_call/' + file);
            const jsonData = JSON.parse(fileContent);
            await db.collection('soccer_data').insertOne(jsonData);
            console.log('Inserted ' + file + ' into soccer_data collection.');
          })
      );
  
      client.close();
      res.json({ message: 'Database Reset' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error resetting database' });
    }
  });

// Delete all pokemon from database
app.delete("/db", async (req, res) => {
    try {
      await client.connect();
      const db = client.db("Web_Sci");
      const collection = db.collection("soccer_data");
      await collection.deleteMany({});
      res.json({ message: "Database cleared" });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } finally {
      await client.close();
      console.log('Connection to MongoDB closed!');
    }
});

app.delete("/db/:number", async (req, res) => {
    await client.connect();
    const db = client.db("Web_Sci");
    const collection = db.collection("soccer_data");
    const team = await collection.deleteOne({
      "response.team.id": parseInt(req.params.number), //response.team.id is the number
    });
    if (!team) {
      res.status(404).json({ message: "team not found" });
    } else {
      res.json({message: "Team Data deleted"});
    }
});

//This will delete the team with corresponding id and number
const options = {
  method: 'GET',
  url: 'https://football98.p.rapidapi.com/premierleague/results',
  headers: {
    'X-RapidAPI-Key': 'e297e832a7mshf3f9db167479cc7p1fe24fjsn6456a0d675c1',
    'X-RapidAPI-Host': 'football98.p.rapidapi.com',
  },
  useQueryString: true
};

app.get('/match', function(req, res){
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parsed = JSON.parse(body);
      res.json(parsed);
    //   console.log(parsed);
    }
  });
});

app.listen(3001, '127.0.0.1');
console.log('Server is Running! at 5000');
