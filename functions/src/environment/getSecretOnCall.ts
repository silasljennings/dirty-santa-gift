import { authenticateContext, getProjectIdFromCall } from "../authentication/01-authentication";
import { getSecret } from "./01-environment";

export const getSecretOnCall = async (req: any) => {
    try {
        const { auth } = req;
        authenticateContext(auth);
        const projectId = getProjectIdFromCall(auth);
        const secret = await getSecret(req, projectId);
        return { secret: secret };
    } catch (error) {
        console.error(error);
        return { error: 'There was an error in the request'}
    }
}