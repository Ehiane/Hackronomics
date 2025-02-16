const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config();  // Load environment variables


require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });  // Load environment variables from one folder up
const uri = process.env.MONGO_URI;  // Use .env variable

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// funtion to connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to the Hackronomics MongoDB Database!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

export default connectDB;