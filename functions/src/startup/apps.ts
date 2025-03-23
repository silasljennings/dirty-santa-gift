import { config } from 'dotenv';
config();
import { cert, initializeApp } from 'firebase-admin/app';

const app = initializeApp();

const getServiceAccount = (environment: string): any => {
    const serviceAccountKeyString = process.env[`${environment.toUpperCase()}_SERVICE_ACCOUNT_KEY`];
    if (!serviceAccountKeyString) { throw new Error(`Service account key for environment ${environment} is not set.`); }
    const serviceAccountKey = JSON.parse(serviceAccountKeyString);
    if (!serviceAccountKey) { throw new Error(`Service account key for environment ${environment} is not set.`); }
    console.log(serviceAccountKey);
    return serviceAccountKey;
};

const prodServiceAccount = cert(getServiceAccount('prod'));

const prodApp = initializeApp({
    credential: prodServiceAccount,
    databaseURL: "https://prod-dirtysantagift.firebaseio.com"
}, 'prodApp');

export { app, prodApp}