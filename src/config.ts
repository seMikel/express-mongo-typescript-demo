export const config = {
    port: 3000,
    connectionString: 'mongodb://localhost/mongoose-example',
    secret: 'JWT TOKENS SECRET, SO SECRETIVE',
    safeRoutes: ['/users/login', '/users/register', '/products']
};

export interface AppConfig {
    port: number,
    connectionString: string,
    secret: string,
    safeRoutes: string[]
}
