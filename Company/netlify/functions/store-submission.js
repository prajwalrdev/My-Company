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

// Create MongoDB client
const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
    
    // Connect to MongoDB
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Add timestamp and status
    const submission = {
      ...formData,
      timestamp: new Date(),
      status: 'new',
      visitor_info: formData.visitor_info || {}
    };

    // Insert the submission
    const result = await collection.insertOne(submission);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Submission stored successfully',
        submissionId: result.insertedId
      })
    };
  } catch (error) {
    console.error('Error storing submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error storing submission',
        details: error.message
      })
    };
  } finally {
    // Don't close the connection here as it's reused
    // The connection will be closed when the function is cold-started
  }
}; 