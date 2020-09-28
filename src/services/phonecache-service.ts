import repo from '../repos/fs-repo';

const cacheMaxDuration = 1000 * 60 * 60 * 24;

class _PhoneCacheService {
  private cache: Record<string, { cachingDate: number; phone: string }> = {};
  private repoName = 'october_cache';

  constructor(
    private repo: {
      save: (name: string, x: any) => Promise<void>;
      load: (name: string) => Promise<any>;
    }
  ) {
    this.loadCache();
    setInterval(this.dumpCache.bind(this), 1000 * 60 * 2);
  }

  existsAndIsValid(companyName: string): boolean {
    return (
      this.cache[companyName] &&
      Date.now() - this.cache[companyName].cachingDate < cacheMaxDuration
    );
  }

  getPhone(companyName: string): string {
    return this.cache[companyName].phone;
  }

  setPhone(companyName: string, phone: string) {
    this.cache[companyName] = { phone, cachingDate: Date.now() };
  }

  private loadCache(): void {
    this.repo
      .load(this.repoName)
      .then(dump => (this.cache = dump))
      .catch(error => {
        console.warn('Could not load cache.');
        console.error(error);
      });
  }

  private dumpCache(): void {
    this.repo
      .save(this.repoName, this.cache)
      .then(() => console.trace('Cache saved.'))
      .catch(error => {
        console.warn('An error occured, could node save the cache.');
        console.error(error);
      });
  }
}

export default new _PhoneCacheService(repo);
