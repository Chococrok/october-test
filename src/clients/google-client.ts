import puppeteer from 'puppeteer';

export async function searchCompaniesFromGoogle(params: {
  companyName: string;
  companyAdress: string;
}): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://google.com/search?q=${
      params.companyName
    }+${params.companyAdress.replace(/\s/g, '+')}`,
    { waitUntil: 'domcontentloaded' }
  );
  await page.waitForSelector('#rhs');
  const result = (await page.evaluate(
    'document.getElementById("rhs").innerHTML'
  )) as string;

  await browser.close();

  return result;
}

export default {
  searchCompanyInfoFromGoogle: searchCompaniesFromGoogle,
};
