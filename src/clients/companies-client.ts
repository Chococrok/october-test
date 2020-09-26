import {get} from 'https';
import { GLOBAL_CONFIGURATION } from '../configuration';

export async function getCompanies(name: string): Promise<object> {
    return new Promise<string>((resolve, reject) => {
        get(`${GLOBAL_CONFIGURATION.COMPANY_DATA_API}/full_text/${name}`,res => {
            const { statusCode } = res;

            if (statusCode !== 200) reject(`Request failed with status code: ${statusCode}`);

            let rawData = '';
            res.on('data', chunk => rawData += chunk);
            res.on('end', () => resolve(rawData));
            res.on('error', reject);
        });
    }).then(JSON.parse);
}

export default {
    getCompanies: getCompanies,
};