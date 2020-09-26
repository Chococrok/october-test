import { config } from 'dotenv';

config();

function getEnvVariable(envName: string): string {
  const envValue = process.env[envName];

  if (envValue === undefined || envValue === '')
    throw `Missing mandatory environment variable: ${envName}`;

  return envValue;
}

const conf = {
  HOST: getEnvVariable('SERVER_HOST'),
  PORT: +getEnvVariable('SERVER_PORT'),
  COMPANY_DATA_API: getEnvVariable('COMPANY_DATA_API'),
};

export const GLOBAL_CONFIGURATION = conf as Readonly<typeof conf>;
