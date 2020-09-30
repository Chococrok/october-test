import fs from 'fs';
import path from 'path';
import jsonValidator from 'jsonschema';
import logger, { setLogLevel } from './logger';
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
    logger.debug(`Using configuration file: "${confFilePath}".`);
    fileContent = JSON.parse(fs.readFileSync(confFilePath, 'utf-8'));
  } catch (error) {
    logger.error(`Could not read configuration file at: "${confFilePath}".`);
    throw error;
  }

  try {
    jsonValidator.validate(
      fileContent,
      JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8')),
      { throwError: true }
    );
  } catch (error) {
    logger.error(
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
let globalConf = { ...fileConf, ...envConf };

setLogLevel(globalConf.logLevel);

setInterval(() => {
  try {
    const newFileConf = getConfigurationFileContent();
    globalConf = { ...newFileConf, ...envConf };

    setLogLevel(globalConf.logLevel);
  } catch (error) {
    logger.warn('Could not refresh configuration');
    logger.debug(error);
  }
}, 1000 * 30);

export default globalConf as Readonly<typeof globalConf>;
