import { get } from 'https';
import CONF from '../configuration/global-configuration';

export async function getCompanies(
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

export default {
  getCompanies,
};
