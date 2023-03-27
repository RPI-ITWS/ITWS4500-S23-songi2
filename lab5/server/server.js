const request = require('request');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const fs = require('fs');
// This is to have the port can connect to data from other port
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('../client/build'));
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.use('/node', express.static(path.join(__dirname, '../client/build')));

// Connecting Mong
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://saja0930:96btDor4ByE2NiNX@websci.atlvojr.mongodb.net/Web_Sci?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//-----------this is for GET -------------
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

    // Delete all documents in the soccer_data collection
    await db.collection('soccer_data').deleteMany({});

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


  //-----------this is for DELETE ------------------
// Delete all teams from database
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

//This will delete the team with corresponding id and number
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

//-------------this is for POST----------------
app.get("/newDoc.json", (req, res) => {
  if (fs.existsSync("./newDoc.json")) {
    const data = fs.readFileSync("./newDoc.json", "utf8");
    res.send(data);
  } else {
    res.send({ parameters: { team: "" } });
  }
});

app.put("/newDoc.json", (req, res) => {
  const data = req.body;
  fs.writeFile("./newDoc.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error writing to file.");
    } else {
      res.send("Successfully updated file.");
    }
  });
});

// This should post a new document to the databse
app.post('/db', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('Web_Sci');
    
    // Insert the JSON data into the database
    console.log(req.body);
    const newDoc = req.body;
    await db.collection('soccer_data').insertOne(newDoc);
    
    res.send("Successfully inserted document into database.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting document into database.");
  }
});

//-----------this is for PUT -------------
app.put('/db', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('Web_Sci');
    const newTeamName = req.body.newTeamName;
    await db.collection('soccer_data').updateMany({}, { $set: { "response.$[elem].team.name": newTeamName } }, { arrayFilters: [{ "elem.team.id": { $exists: true } }] });
    client.close();
    res.status(200).json({ message: "All teams' names have been updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.put('/db/:tId', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('Web_Sci');
    const tId = parseInt(req.params.tId);
    const newTeamName = req.body.newTeamName;
    await db.collection('soccer_data').updateOne({ "response.team.id": tId }, { $set: { "response.$.team.name": newTeamName } });
    client.close();
    res.status(200).json({ message: `Team with ID ${tId}'s name has been updated.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

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

app.listen(3000, '127.0.0.1');
console.log('Server is Running!');
