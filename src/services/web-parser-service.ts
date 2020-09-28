import CONF from '../configuration/global-configuration';
import puppeteer from 'puppeteer';

export async function searchCompaniesInfo(params: {
  companyName: string;
  companyAdress: string;
}): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `${CONF.webParser.URL}${params.companyName}+${params.companyAdress.replace(
      /\s/g,
      '+'
    )}`,
    { waitUntil: 'domcontentloaded' }
  );

  if (CONF.webParser.baliseId) {
    await page.waitForSelector(`#${CONF.webParser.baliseId}`);
  }

  const result = (await page.evaluate(
    CONF.webParser.baliseId
      ? `document.getElementById("${CONF.webParser.baliseId}").innerHTML`
      : 'document.body.innerHTML'
  )) as string;

  await browser.close();

  const extractedPattern = extractPatternFromHTML(result);

  return extractedPattern;
}

function extractPatternFromHTML(str: string) {
  return (str.match(new RegExp(CONF.webParser.patternToExtract)) || [])[1];
}

export default {
  searchCompaniesInfo: searchCompaniesInfo,
};
