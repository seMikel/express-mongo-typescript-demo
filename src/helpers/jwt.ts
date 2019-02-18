import * as expressJwt from 'express-jwt';

export function jwt(secret: string, safeRoutes: string[] = []) {
    return expressJwt({ secret, requestProperty: 'auth' }).unless({ path: safeRoutes });
}
