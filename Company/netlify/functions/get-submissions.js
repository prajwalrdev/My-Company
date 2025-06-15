const { getSubmissions } = require('@netlify/functions');

exports.handler = async function(event, context) {
  // Check for admin authentication
  if (!isAdmin(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    const submissions = await getSubmissions('contact');
    return {
      statusCode: 200,
      body: JSON.stringify(submissions)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching submissions' })
    };
  }
};

function isAdmin(event) {
  // Implement your admin authentication logic here
  // This is a simple example - you should use a more secure method
  const authHeader = event.headers.authorization;
  return authHeader === 'Bearer your-secret-token';
} 