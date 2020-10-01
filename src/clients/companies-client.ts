import { get } from 'https';
import CONF from '../configuration/global-configuration';

export async function getCompaniesWithName(
  name: string
): Promise<{
  etablissement: Array<{ geo_adresse: string; nom_raison_sociale: string }>;
}> {
  return new Promise<string>((resolve, reject) => {
    get(`${CONF.companyDataApi}/full_text/${name}`, res => {
      const { statusCode } = res;

      if (statusCode !== 200)
        reject(`Request failed with status code: ${statusCode}`);

      let rawData = '';
      res.on('data', chunk => (rawData += chunk));
      res.on('end', () => resolve(rawData));
      res.on('error', reject);
    }).on('error', reject);
  }).then(JSON.parse);
}

export async function getCompanyWithSiren(
  siren: string
): Promise<{
  siege_social: { geo_adresse: string; nom_raison_sociale: string };
}> {
  return new Promise<string>((resolve, reject) => {
    get(`${CONF.companyDataApi}/siren/${siren}`, res => {
      const { statusCode } = res;

      if (statusCode !== 200)
        reject(`Request failed with status code: ${statusCode}`);

      let rawData = '';
      res.on('data', chunk => (rawData += chunk));
      res.on('end', () => resolve(rawData));
      res.on('error', reject);
    }).on('error', reject);
  }).then(JSON.parse);
}

export async function getCompanyWithSiret(
  siret: string
): Promise<{
  etablissement: { geo_adresse: string; nom_raison_sociale: string };
}> {
  return new Promise<string>((resolve, reject) => {
    get(`${CONF.companyDataApi}/siret/${siret}`, res => {
      const { statusCode } = res;

      if (statusCode !== 200)
        reject(`Request failed with status code: ${statusCode}`);

      let rawData = '';
      res.on('data', chunk => (rawData += chunk));
      res.on('end', () => resolve(rawData));
      res.on('error', reject);
    }).on('error', reject);
  }).then(JSON.parse);
}

export async function getCompaniesWithAdress(
  adress: string
): Promise<{
  etablissement: Array<{ geo_adresse: string; nom_raison_sociale: string }>;
}> {
  return new Promise<string>((resolve, reject) => {
    get(`${CONF.companyDataApi}/full_text/${adress}`, res => {
      const { statusCode } = res;

      if (statusCode !== 200)
        reject(`Request failed with status code: ${statusCode}`);

      let rawData = '';
      res.on('data', chunk => (rawData += chunk));
      res.on('end', () => resolve(rawData));
      res.on('error', reject);
    }).on('error', reject);
  }).then(JSON.parse);
}

export default {
  getCompaniesWithName: getCompaniesWithName,
  getCompaniesWithAdress: getCompaniesWithAdress,
  getCompanyWithSiren: getCompanyWithSiren,
  getCompanyWithSiret: getCompanyWithSiret,
};
