const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  // Get MongoDB URI from environment variable
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'MongoDB URI not configured',
        message: 'Please set MONGODB_URI environment variable'
      })
    };
  }

  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    
    // Test the connection
    const db = client.db(process.env.MONGODB_DB_NAME || 'contact_form_db');
    const collection = db.collection(process.env.MONGODB_COLLECTION || 'submissions');
    
    // Try a simple operation
    const result = await collection.find({}).limit(1).toArray();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully connected to MongoDB',
        details: {
          database: db.databaseName,
          collection: collection.collectionName,
          documentCount: result.length
        }
      })
    };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to connect to MongoDB',
        message: error.message
      })
    };
  } finally {
    // Close the connection
    await client.close();
  }
}; 