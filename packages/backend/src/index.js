const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 8080;

let db;

MongoClient.connect(
  'mongodb://dbuser:thisIsReallyStrongPassword123@mongodb:27017/dev',
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('Connected successfully to server');
    db = client.db('dev');
  }
);

app.use(cors());

app.get('/', async (req, res) => {
  if (!db) {
    return res.send('Waiting for DB connection...');
  }

  const result = await db.collection('dev').find().toArray();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
