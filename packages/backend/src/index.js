const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const main = async () => {
  const PORT = process.env.PORT | 8080;
  const app = express();

  let db;

  const uri =
    "mongodb://dbuser:thisIsReallyStrongPassword123@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db("dev");

    console.log("Connected successfully to server");
  } catch (e) {
    console.error(e);
  }

  app.use(cors());

  app.get("/", async (_, res) => {
    if (!db) {
      return res.send("Waiting for DB connection...");
    }

    const result = await db.collection("test").find().toArray();
    res.send(result);
  });

  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
};

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
