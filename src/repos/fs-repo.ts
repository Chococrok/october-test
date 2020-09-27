import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

const getCachePath = (name: string) => path.resolve(os.homedir(), `.${name}`);

export async function save(name: string, o: any) {
  const toSave = typeof o === 'string' ? o : JSON.stringify(o);
  await fs.writeFile(getCachePath(name), toSave);
}

export async function load(name: string): Promise<object> {
  const fileContent = await fs.readFile(getCachePath(name));
  return JSON.parse(fileContent.toString());
}

export default {
  save,
  load,
};
