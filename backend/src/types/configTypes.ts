export interface ConfigAttributes {
    username: string;
    password: string | null;
    database: string;
    host: string;
    dialect: string;
    use_env_variable?: string;
}

export interface Config {
    development: ConfigAttributes;
    test: ConfigAttributes;
    production: ConfigAttributes;
}