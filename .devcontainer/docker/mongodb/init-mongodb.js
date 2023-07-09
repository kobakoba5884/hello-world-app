const databaseName = process.env.MONGO_INITDB_DATABASE || "dev";
const collectionName = process.env.MONGO_INITDB_COLLECTION || "test";

// Create a new database.
use(databaseName);

// Create a new collection.
db.createCollection(collectionName);

// Create a new Document
db[collectionName].insertOne({ hello: "hello" });
