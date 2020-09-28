import fs from 'fs';
import path from 'path';
import jsonValidator from 'jsonschema';
import { FileConfiguration } from './configuration-file-schema';

function getEnvVariable(envName: string, mandatory?: boolean): string {
  const envValue = process.env[envName];

  if (mandatory && (envValue === undefined || envValue === ''))
    throw `Missing mandatory environment variable: ${envName}`;

  return envValue || '';
}

function getConfigurationFileContent(): FileConfiguration {
  const confFilePath =
    getEnvVariable('CONFIGURATION_FILE') ||
    path.resolve(process.cwd(), 'configuration-default.json');
  const schemaFilePath = path.resolve(
    __dirname,
    'schema',
    'configuration-file-schema.json'
  );

  let fileContent = {};

  try {
    console.info(`Using configuration file: "${confFilePath}".`);
    fileContent = JSON.parse(fs.readFileSync(confFilePath, 'utf-8'));
  } catch (error) {
    console.error(`Could not read configuration file at: "${confFilePath}".`);
    throw error;
  }

  try {
    jsonValidator.validate(
      fileContent,
      JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8')),
      { throwError: true }
    );
  } catch (error) {
    console.error(
      `An error occured while validating configuration file at: "${confFilePath}".`
    );
    throw error;
  }

  return fileContent as FileConfiguration;
}

const envConf = {
  HOST: getEnvVariable('SERVER_HOST', true),
  PORT: +getEnvVariable('SERVER_PORT', true),
  CONTEXT_ROOT: getEnvVariable('CONTEXT_ROOT'),
};
const fileConf = getConfigurationFileContent();
const globalConf = { ...fileConf, ...envConf };

export default globalConf as Readonly<typeof globalConf>;
