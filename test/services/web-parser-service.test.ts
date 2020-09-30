import WebParserService from '../../src/services/web-parser-service';
import CONF from '../../src/configuration/global-configuration';
import http from 'http';
import assert from 'assert';
import fs from 'fs';

const server = http.createServer((_, res) => {
  fs.readFile('test/ressource/html/google-october.html', (err, data) => {
    if (err) throw err;

    res.write(data);
    res.end();
  });
});

describe('web-parser-service', function () {
  describe(`#${WebParserService.searchCompaniesInfo.name}()`, function () {
    before(function () {
      this.timeout(3000)
      
      // @ts-ignore
      CONF.webParser.URL = 'http://localhost:8080/';

      server.listen(8080, 'localhost', () => {
        console.log(`test server running at ${CONF.webParser.URL}`);
      });
    });

    it('Should get an object with an array of companies', async function () {
      const result = await WebParserService.searchCompaniesInfo({
        companyName: '',
        companyAdress: '',
      });
      assert.strictEqual(result, '01 82 83 28 00');
    });

    after(function () {
      server.close();
    });
  });
});
