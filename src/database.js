// export a startDatabase function that sets up our in-memory MongoDB database.

// It checks if an instance of the database already exists. If it doesn’t, it bootstraps it with a users collection and seeds the collection with the Users array we defined earlier in our data.js file.

const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const data = require("./data");

let database = null;

const mongo = new MongoMemoryServer();

async function startDatabase() {
  const mongoDBURL = await mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  });

  //Seed database
  if  (!database) {
    database = connection.db();
    await database.collection("users").insertMany(data.Users);
  }

  return databse;
}

async function stopDatabase() {
  await mongo.stop();
}

module.exports = {
  startDatabase,
  stopDatabase,
};
