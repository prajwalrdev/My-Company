const { db } = require('./utils/firebase-config');

exports.handler = async function(event, context) {
  try {
    // Test Firebase connection by trying to access the database
    const testCollection = db.collection('test');
    const testDoc = await testCollection.doc('test').get();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Firebase connection successful',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Firebase connection error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Firebase connection failed',
        details: error.message
      })
    };
  }
}; 