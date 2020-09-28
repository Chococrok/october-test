import CompaniesClient from '../../src/clients/companies-client';
import CONF from '../../src/configuration/global-configuration';
import https from 'https';
import assert from 'assert';
import fs from 'fs';

const serverOptions = {
  key: fs.readFileSync('test/ressource/keys/key.pem'),
  cert: fs.readFileSync('test/ressource/keys/cert.pem'),
};
const serverResponse = {
  etablissement: [
    { geo_addresse: 'OK', nom_raison_sociale: 'OK' },
    { geo_addresse: 'NOK', nom_raison_sociale: 'NOK' },
  ],
};
const server = https.createServer(serverOptions, (req, res) => {
  res.write(JSON.stringify(serverResponse));
  res.end();
});

describe('companies-client', function () {
  describe(`#${CompaniesClient.getCompanies.name}()`, function () {
    before(function () {
      // @ts-ignore
      CONF.companyDataApi = 'https://localhost:8080';
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      server.listen(8080, 'localhost', () => {
        console.log(`test server running at ${CONF.companyDataApi}`);
      });
    });

    it('Should get an object with an array of companies', async function () {
      const result = await CompaniesClient.getCompanies('OK');
      assert.deepStrictEqual(result, serverResponse);
    });

    after(function () {
      server.close();
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = undefined;
    });
  });
});
