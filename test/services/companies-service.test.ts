import CompaniesService from '../../src/services/companies-service';
import CONF from '../../src/configuration/global-configuration';
import http from 'http';
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
const serverAPI = https.createServer(serverOptions, (req, res) => {
  res.write(JSON.stringify(serverResponse));
  res.end();
});

const serverHTML = http.createServer((_, res) => {
  fs.readFile('test/ressource/html/google-october.html', (err, data) => {
    if (err) throw err;

    res.write(data);
    res.end();
  });
});

describe('web-parser-service', function () {
  describe(`#${CompaniesService.getPhoneNumber.name}()`, function () {
    before(function () {
      // @ts-ignore
      CONF.companyDataApi = 'https://localhost:8080/';
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      serverAPI.listen(8080, 'localhost', () => {
        console.log(`test server running at ${CONF.companyDataApi}`);
      });

      // @ts-ignore
      CONF.webParser.URL = 'http://localhost:8081/';

      serverHTML.listen(8081, 'localhost', () => {
        console.log(`test server running at ${CONF.webParser.URL}`);
      });
    });

    it('Should get an object with company name and phone', async function () {
      const result = await CompaniesService.getPhoneNumber({ name: 'october' });
      assert.deepStrictEqual(result, {
        companyName: 'october',
        phone: '01 82 83 28 00',
      });
    });

    after(function () {
      serverAPI.close();
      serverHTML.close();
    });
  });
});
