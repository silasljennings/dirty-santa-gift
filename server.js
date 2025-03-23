// backend/index.js
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Initialize Firebase Admin with your project configuration
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://prod-dirtysantagift.firebasestorage.app'
});

const bucket = admin.storage().bucket();

app.get('/get-image', async (req, res) => {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // formats to yyyy-mm-dd
  const filePath = `${dateString}/santa.jpeg`;
  console.log("Attempting to fetch:", filePath);

  try {
    // Check if file exists
    const [exists] = await bucket.file(filePath).exists();

    if (!exists) {
      console.log(`File not found, fetching default image...`);

      // Fallback to default image if not found
      const defaultFilePath = 'default/santa.png';  // default image path
      const [defaultExists] = await bucket.file(defaultFilePath).exists();

      if (!defaultExists) {
        return res.status(404).json({ error: `Both ${filePath} and the default image not found` });
      }

      const file = bucket.file(defaultFilePath);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });

      return res.status(200).json({ url });
    }

    // If file exists, return the signed URL for the requested image
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    console.log("Successfully generated signed URL for image:", filePath);
    return res.status(200).json({ url });

  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({
      error: error.message,
      code: error.code,
      details: error.toString()
    });
  }
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

