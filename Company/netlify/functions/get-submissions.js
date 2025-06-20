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

  try {
    const submissionsSnapshot = await db.collection('submissions')
      .orderBy('timestamp', 'desc')
      .get();

    const submissions = [];
    submissionsSnapshot.forEach(doc => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(submissions)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 