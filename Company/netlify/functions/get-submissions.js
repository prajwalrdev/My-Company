const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');

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

  try {
    // Initialize Octokit
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    // Get form submissions from Netlify
    const response = await fetch('https://api.netlify.com/api/v1/sites/' + process.env.NETLIFY_SITE_ID + '/submissions', {
      headers: {
        'Authorization': 'Bearer ' + process.env.NETLIFY_API_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    const submissions = await response.json();

    // Transform submissions to match the expected format
    const transformedSubmissions = submissions.map(submission => ({
      _id: submission.id,
      timestamp: submission.created_at,
      name: submission.data.name,
      email: submission.data.email,
      message: submission.data.message,
      status: submission.data.status || 'new',
      attachment: submission.data.attachment,
      visitor_info: submission.data.visitor_info || {}
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(transformedSubmissions)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 