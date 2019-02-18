import * as expressJwt from 'express-jwt';

export function jwt(secret: string, safeRoutes: string[] = []) {
    return expressJwt({ secret, requestProperty: 'uid' }).unless({ path: safeRoutes });
}
