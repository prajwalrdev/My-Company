# Firebase Migration Setup Guide

## Overview
This project has been migrated from MongoDB to Firebase Firestore for better scalability and ease of use.

## Prerequisites
1. Node.js installed
2. Firebase project created
3. Netlify account

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "blockbtech")
4. Follow the setup wizard

### 2. Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

### 3. Generate Service Account Key
1. In Firebase Console, go to Project Settings (gear icon)
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Keep this file secure - it contains sensitive credentials

### 4. Set Environment Variables in Netlify
In your Netlify dashboard, go to Site Settings > Environment Variables and add:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-client-cert-url
```

Replace the values with those from your downloaded service account JSON file.

## Installation

### 1. Install Dependencies
```bash
cd Company
npm install
```

### 2. Test Firebase Connection
Deploy to Netlify and test the `/test-firebase` endpoint to verify the connection.

## API Endpoints

### Form Submission
- **POST** `/store-submission`
- Stores contact form submissions in Firestore

### Admin Functions (require admin token)
- **GET** `/get-submissions` - Get all submissions
- **GET** `/get-submission/:id` - Get specific submission
- **PUT** `/update-submission/:id` - Update submission
- **DELETE** `/delete-submission/:id` - Delete submission

## Security Rules
Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Common Issues
1. **Firebase connection failed**: Check environment variables
2. **Permission denied**: Verify Firestore security rules
3. **Module not found**: Run `npm install` to install dependencies

### Testing
Use the `/test-firebase` endpoint to verify your Firebase setup is working correctly.

## Migration Notes
- All MongoDB dependencies have been removed
- Functions now use Firebase Admin SDK
- Data structure remains the same for compatibility
- Email functionality still uses SendGrid 