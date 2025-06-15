const { MongoClient } = require('mongodb');

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'contact_form_db';
const COLLECTION_NAME = process.env.MONGODB_COLLECTION || 'submissions';

// Validate environment variables
if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(1);
}

// Create MongoDB client with connection pooling
const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
});

let isConnected = false;

const connect = async () => {
  if (isConnected) {
    return client;
  }

  try {
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const disconnect = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await client.close();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};

const getCollection = async () => {
  const client = await connect();
  return client.db(DB_NAME).collection(COLLECTION_NAME);
};

module.exports = {
  connect,
  disconnect,
  getCollection,
  client
}; 