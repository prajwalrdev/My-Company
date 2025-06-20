const { db } = require('./utils/firebase-config');

exports.handler = async function(event, context) {
  // Check for admin token
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  const token = authHeader.split(' ')[1];
  if (token !== process.env.ADMIN_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid token' })
    };
  }

  const submissionId = event.path.split('/').pop();

  try {
    const submissionDoc = await db.collection('submissions').doc(submissionId).get();
    
    if (!submissionDoc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Submission not found' })
      };
    }

    const submission = {
      id: submissionDoc.id,
      ...submissionDoc.data()
    };

    return {
      statusCode: 200,
      body: JSON.stringify(submission)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching submission' })
    };
  }
}; 