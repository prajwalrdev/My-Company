const { db } = require('./utils/firebase-config');

// Collection name for submissions
const COLLECTION_NAME = 'submissions';

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
    
    // Add timestamp and status
    const submission = {
      ...formData,
      timestamp: new Date(),
      status: 'new',
      visitor_info: formData.visitor_info || {}
    };

    // Add the submission to Firestore
    const docRef = await db.collection(COLLECTION_NAME).add(submission);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Submission stored successfully',
        submissionId: docRef.id
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
  }
}; 