import { authenticateRequest, getProjectIdFromRequest } from "../authentication/01-authentication";
import { getSecret } from "./01-environment";

export const getSecretOnRequest = (async (req: any) => {
    try {
        authenticateRequest(req);
        const projectId = await getProjectIdFromRequest(req);
        const secret = await getSecret(req, projectId);
        return { secret: secret };
    } catch (error) {
        console.error(error);
        return { secret: 'There was an error in the request'}
    }
})
