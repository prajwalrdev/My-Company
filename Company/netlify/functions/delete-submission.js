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

  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const submissionId = event.path.split('/').pop();
    
    // Delete submission from Firestore
    await db.collection('submissions').doc(submissionId).delete();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission deleted successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

function isAdmin(event) {
  // Implement your admin authentication logic here
  // This is a simple example - you should use a more secure method
  const authHeader = event.headers.authorization;
  return authHeader === 'Bearer your-secret-token';
} 