import assert from 'assert';
import fsRepo from '../../src/repos/fs-repo';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

const getCachePath = (name: string) => path.resolve(os.homedir(), `.${name}`);

describe('fs-repo', function () {
  describe(`#${fsRepo.save.name}()`, function () {
    const testFileName = 'fs-repo.test';

    beforeEach(async function () {
      // make sure there is nothing before the each tests.
      try {
        await fs.unlink(getCachePath(testFileName));
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    });

    it('should save a file with the provided name and content', async function () {
      const toSave = { toto: 'titi' };

      await fsRepo.save(testFileName, toSave);

      const fileContent = await fs.readFile(getCachePath(testFileName));
      assert.strictEqual(fileContent.toString(), JSON.stringify(toSave));
    });
  });

  describe(`#${fsRepo.load.name}()`, function () {
    const testFileName = 'fs-repo.test';
    const toLoad = { toto: 'titi' };

    before(async function () {
      await fsRepo.save(testFileName, toLoad);
    });

    it('should laod a file with the provided name', async function () {
      await fsRepo.load(testFileName);

      const fileContent = await fs.readFile(getCachePath('.test'));
      assert.strictEqual(fileContent.toString(), JSON.stringify(toLoad));
    });
  });
});
