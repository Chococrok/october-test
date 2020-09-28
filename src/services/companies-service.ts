import WebParser from './web-parser-service';
import CompaniesClient from '../clients/companies-client';
import PhoneCacheService from './phonecache-service';

export async function getPhoneNumber(companyName: string): Promise<string> {
  if (PhoneCacheService.existsAndIsValid(companyName))
    return PhoneCacheService.getPhone(companyName);

  const companies = await CompaniesClient.getCompanies(companyName);
  const company = companies.etablissement.find(
    c => c.nom_raison_sociale.toUpperCase() === companyName.toUpperCase()
  );
  const phone = await WebParser.searchCompaniesInfo({
    companyName,
    companyAdress: company?.geo_adresse || '',
  });

  PhoneCacheService.setPhone(companyName, phone);

  return phone;
}

export default {
  getPhoneNumber,
};
