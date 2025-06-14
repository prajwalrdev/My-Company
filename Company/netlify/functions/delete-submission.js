const { deleteSubmission } = require('@netlify/functions');

exports.handler = async function(event, context) {
  // Check for admin authentication
  if (!isAdmin(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  const submissionId = event.path.split('/').pop();

  try {
    await deleteSubmission('contact', submissionId);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission deleted successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error deleting submission' })
    };
  }
};

function isAdmin(event) {
  // Implement your admin authentication logic here
  // This is a simple example - you should use a more secure method
  const authHeader = event.headers.authorization;
  return authHeader === 'Bearer your-secret-token';
} 