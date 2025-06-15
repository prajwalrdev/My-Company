const fetch = require('node-fetch');
const { deleteSubmission } = require('@netlify/functions');

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
    const { submissionId } = event.path.split('/').pop();

    // Delete submission from Netlify
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/submissions/${submissionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + process.env.NETLIFY_API_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete submission');
    }

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