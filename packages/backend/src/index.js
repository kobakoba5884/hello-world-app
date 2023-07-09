const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const main = async () => {
  const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
  const MONGO_INITDB_ROOT_USERNAME =
    process.env.MONGO_INITDB_ROOT_USERNAME || "dbuser";
  const MONGO_INITDB_ROOT_PASSWORD =
    process.env.MONGO_INITDB_ROOT_PASSWORD || "thisIsReallyStrongPassword123";
  const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE || "dev";
  const MONGO_INITDB_COLLECTION = process.env.MONGO_INITDB_COLLECTION || "test";
  const MONGO_HOST = process.env.MONGO_HOST || "mongodb";
  const MONGO_PORT = process.env.MONGO_PORT || "27017";

  const app = express();

  let db;

  const uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=admin&readPreference=primary&ssl=false&directConnection=true`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db(MONGO_INITDB_DATABASE);

    console.log("Connected successfully to server");
  } catch (e) {
    console.error(e);
  }

  app.use(cors());

  app.get("/", async (_, res) => {
    if (!db) {
      return res.send("Waiting for DB connection...");
    }

    const result = await db
      .collection(MONGO_INITDB_COLLECTION)
      .find()
      .toArray();
    res.send(result);
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${BACKEND_PORT}`);
  });
};

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
