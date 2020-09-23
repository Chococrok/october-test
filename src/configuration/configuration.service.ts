import {GlobalConfigurationType} from './configuration.type';
import {config} from 'dotenv';

config();

function getEnvVariable(envName: string): string {
    const envValue = process.env[envName];

    if (envValue == undefined || envValue == '') throw `Missing mandatory environment variable: ${envName}`;

    return envValue;
};

export const GLOBAL_CONFIGURATION: GlobalConfigurationType = {
    HOST: getEnvVariable('SERVER_HOST'),
    PORT: +getEnvVariable('SERVER_PORT'),
    ENTREPRISE_DATA_API: getEnvVariable('ENTREPRISE_DATA_API')
}