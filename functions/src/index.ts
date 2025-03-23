// Import necessary modules using modular imports
import { app } from "./startup/apps"
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import axios from 'axios';
import FormData from 'form-data'
import {getSecretFromManager} from "./environment/getSecretFromManager";

import dotenv from 'dotenv';
import {resolveObjectURL} from "node:buffer";
dotenv.config(); // Load environment variables from the .env file


//gs://prod-dirtysantagift.firebasestorage.app
// Cloud Function to generate the image on a daily schedule at 3 AM (Gen 2)
export const generateDailyImage = onSchedule({ memory: '2GiB', schedule: '0 4 * * *'}, async (event) => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const STABILITY_API_KEY = await getSecretFromManager("STABILITY_API_KEY");

    // Step 1: Generate the dynamic prompt with today's date
    const prompt = `Today is ${formattedDate}, generate an accurate image representation of what Santa might be doing today.
    Be as creative as you wish in the style, genre, and setting.`;

    try {
        // Step 2: Prepare the payload for Stability AI API
        const payload = {
            prompt: prompt,
            output_format: "webp", // Or use other formats if needed
        };

        // Step 3: Call Stability AI API to generate the image
        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
            axios.toFormData(payload, new FormData()),
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer ${STABILITY_API_KEY}`,
                    Accept: "image/*"
                },
            },
        );

        // Check if the response status is 200 (success)
        if (response.status === 200) {
            // Check that the response data is valid binary data
            if (Buffer.isBuffer(response.data)) {
                console.log('Valid image data received');

                // Proceed to save the file to Firebase Storage
                const storage = getStorage();
                const bucket = storage.bucket();
                const filePath = `${formattedDate}/santa.jpeg`;
                const file = bucket.file(filePath);

                // Save the binary data (image) to Firebase Storage
                await file.save(response.data, {
                    contentType: 'image/jpeg',
                    public: true,  // Make the image publicly accessible
                });

                console.log('Image saved to Firebase Storage:', filePath);
            } else {
                console.error('Invalid image data received');
            }
        } else {
            console.error(`Failed to generate image. Status: ${response.status}`);
        }


    } catch (error) {
        console.error("Error generating or saving image:", error);
        throw new Error('Image generation or saving failed.');
    }
});
