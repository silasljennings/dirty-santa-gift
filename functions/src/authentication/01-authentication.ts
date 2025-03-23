import { HttpsError } from "firebase-functions/v2/https";
import { getAuth } from "firebase-admin/auth"

const authenticateRequest = (req)=> {
    if (!req.auth) {
        throw new HttpsError('failed-precondition', 'The function must be executed while authenticated.');
    }
}

const authenticateContext = (auth) => {
    if (!auth) {
        throw new HttpsError('failed-precondition', 'The function must be executed while authenticated.');
    }
}

const getProjectIdFromCall = (auth) => {
    if (auth && auth.token) {
        return auth.token.aud;
    } else {
        throw new HttpsError('failed-precondition', 'The function must be executed while authenticated.')
    }
}

const getProjectIdFromRequest = async (req) => {
    const auth = getAuth();
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        throw new HttpsError('unauthenticated', 'No Firebase ID token was provided.');
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
        // Verify and decode the ID token
        const decodedToken = await auth.verifyIdToken(idToken);

        // Check for the 'aud' claim in the decoded token
        if (!decodedToken.aud) {
            throw new HttpsError('failed-precondition', 'The function did not have auth token aud.');
        }
        return decodedToken.aud;
    } catch (error) {
        throw new HttpsError('unauthenticated', 'Error verifying the Firebase ID token.');
    }
}

const authenticateAdminExecution = (context)=> {
    if (!(context.auth?.token && context.auth?.token?.admin)) {
        throw new HttpsError(
            'permission-denied',
            'Must be an administrative user to initiate.'
        );
    }
}

export {
    authenticateContext,
    authenticateRequest,
    getProjectIdFromCall,
    getProjectIdFromRequest,
    authenticateAdminExecution,
}