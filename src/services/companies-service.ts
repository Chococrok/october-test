import GoogleClient from '../clients/google-client';
import CompaniesClient from '../clients/companies-client';
import PhoneCacheService from './phonecache-service';

export async function getPhoneNumber(companyName: string): Promise<string> {
  if (PhoneCacheService.existsAndIsValid(companyName))
    return PhoneCacheService.getPhone(companyName);

  const companies = await CompaniesClient.getCompanies(companyName);
  const company = companies.etablissement.find(
    c => c.nom_raison_sociale.toUpperCase() === companyName.toUpperCase()
  );
  const rawHTML = await GoogleClient.searchCompanyInfoFromGoogle({
    companyName,
    companyAdress: company?.geo_adresse || '',
  });

  const phone = extractPhoneFromHTML(rawHTML);

  PhoneCacheService.setPhone(companyName, phone);

  return phone;
}

function extractPhoneFromHTML(str: string) {
  return (str.match(/<span>((?:\d\d\s?){5})<\/span>/m) || [])[1];
}

export default {
  getPhoneNumber,
};
