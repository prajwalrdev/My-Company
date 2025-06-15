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

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { submissionId } = event.path.split('/').pop();
    const updates = JSON.parse(event.body);

    // Update submission in Netlify
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/submissions/${submissionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.NETLIFY_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error('Failed to update submission');
    }

    const updatedSubmission = await response.json();

    // If there's a reply, send email
    if (updates.reply) {
      // Send email using your preferred email service
      // Example using SendGrid:
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: updatedSubmission.data.email,
        from: process.env.ADMIN_EMAIL,
        subject: 'Re: ' + (updatedSubmission.data.subject || 'Your message to BlockB Tech'),
        text: updates.reply,
        html: updates.reply
      };

      await sgMail.send(msg);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedSubmission)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 