import WebParser from './web-parser-service';
import CompaniesClient from '../clients/companies-client';
import PhoneCacheService from './phonecache-service';

export async function getPhoneNumber(params: {
  name?: string;
  siret?: string;
  siren?: string;
  adress?: string;
}): Promise<{ companyName: string; phone: string }> {
  if (params.siret) {
    return fromSiret(params.siret);
  } else if (params.siren) {
    return fromSiren(params.siren);
  } else if (params.name && params.adress) {
    return fromNameAndAdress(params.name, params.adress);
  } else if (params.name) {
    return fromNameOnly(params.name);
  } else if (params.adress) {
    return fromAdressOnly(params.adress);
  } else {
    return { companyName: '???', phone: 'I am not a god' };
  }
}

export default {
  getPhoneNumber,
};

async function fromNameOnly(
  companyName: string
): Promise<{ companyName: string; phone: string }> {
  if (PhoneCacheService.existsAndIsValid(companyName))
    return { companyName, phone: PhoneCacheService.getPhone(companyName) };

  const companies = await CompaniesClient.getCompaniesWithName(companyName);
  const company = companies.etablissement.find(
    c => c.nom_raison_sociale.toUpperCase() === companyName.toUpperCase()
  );
  const phone = await WebParser.searchCompaniesInfo({
    companyName,
    companyAdress: company?.geo_adresse || '',
  });

  PhoneCacheService.setPhone(companyName, phone);

  return { companyName, phone: phone || 'Not Found' };
}

async function fromAdressOnly(
  adress: string
): Promise<{ companyName: string; phone: string }> {
  const companies = await CompaniesClient.getCompaniesWithAdress(adress);
  const company = companies.etablissement.find(
    c => c.geo_adresse.toUpperCase() === adress.toUpperCase()
  );
  const phone = await WebParser.searchCompaniesInfo({
    companyName: company?.nom_raison_sociale || '',
    companyAdress: adress || '',
  });

  if (company?.nom_raison_sociale) {
    PhoneCacheService.setPhone(company?.nom_raison_sociale || adress, phone);
  }

  return {
    companyName: company?.nom_raison_sociale || '',
    phone: phone || 'Not Found',
  };
}

async function fromNameAndAdress(
  companyName: string,
  adress: string
): Promise<{ companyName: string; phone: string }> {
  if (PhoneCacheService.existsAndIsValid(companyName))
    return { companyName, phone: PhoneCacheService.getPhone(companyName) };

  const phone = await WebParser.searchCompaniesInfo({
    companyName,
    companyAdress: adress,
  });

  PhoneCacheService.setPhone(companyName, phone);

  return { companyName, phone: phone || 'Not Found' };
}

async function fromSiret(
  siret: string
): Promise<{ companyName: string; phone: string }> {
  const company = await CompaniesClient.getCompanyWithSiret(siret);

  const phone = await WebParser.searchCompaniesInfo({
    companyName: company.etablissement.nom_raison_sociale,
    companyAdress: company.etablissement.geo_adresse || '',
  });

  PhoneCacheService.setPhone(company.etablissement.nom_raison_sociale, phone);

  return {
    companyName: company.etablissement.nom_raison_sociale,
    phone: phone || 'Not Found',
  };
}

async function fromSiren(
  siren: string
): Promise<{ companyName: string; phone: string }> {
  const company = await CompaniesClient.getCompanyWithSiren(siren);

  const phone = await WebParser.searchCompaniesInfo({
    companyName: company.siege_social.nom_raison_sociale,
    companyAdress: company.siege_social.geo_adresse || '',
  });

  PhoneCacheService.setPhone(company.siege_social.nom_raison_sociale, phone);

  return {
    companyName: company.siege_social.nom_raison_sociale,
    phone: phone || 'Not Found',
  };
}
