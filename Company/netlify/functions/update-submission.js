const { db } = require('./utils/firebase-config');
const sgMail = require('@sendgrid/mail');

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
    const submissionId = event.path.split('/').pop();
    const updates = JSON.parse(event.body);

    // Get the current submission
    const submissionRef = db.collection('submissions').doc(submissionId);
    const submissionDoc = await submissionRef.get();
    
    if (!submissionDoc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Submission not found' })
      };
    }

    const currentData = submissionDoc.data();

    // Update submission in Firestore
    await submissionRef.update(updates);

    // If there's a reply, send email
    if (updates.reply) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: currentData.email,
        from: process.env.ADMIN_EMAIL,
        subject: 'Re: ' + (currentData.subject || 'Your message to BlockB Tech'),
        text: updates.reply,
        html: updates.reply
      };

      await sgMail.send(msg);
    }

    // Get the updated submission
    const updatedDoc = await submissionRef.get();
    const updatedSubmission = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };

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