export const config = {
    port: 3000,
    connectionString: 'mongodb://localhost/mongoose-example'
};

export interface AppConfig {
    port: number,
    connectionString: string
}
