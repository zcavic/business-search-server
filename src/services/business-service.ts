import axios from 'axios';

async function getAll(filter: string): Promise<Business[]> {
  const allBusinesses = [
    new Business(await fetchBusiness('GXvPAor1ifNfpF0U5PTG0w')), // code smell, valid ids
    new Business(await fetchBusiness('ohGSnJtMIC5nPfYRi_HTAg')),
  ].filter((b) =>
    filter != ''
      ? b.address.includes(filter) ||
        b.name.toLowerCase().includes(filter.toLowerCase())
      : true,
  );
  return allBusinesses;
}

async function get(placeId: string): Promise<BusinessDetails> {
  return new BusinessDetails(await fetchBusiness(placeId));
}

// API requests

async function fetchBusiness(placeId: string): Promise<Response> {
  const { data: business } = await axios.get<Response>(
    `https://storage.googleapis.com/coding-session-rest-api/${placeId}`, // code smell, store base url in .env
    {},
  );
  return business;
}

// Data mapping

interface Response {
  local_entry_id: string;
  displayed_what: string;
  displayed_where: string;
  opening_hours: object;
}

class Business {
  // code smell, move data object in separate folder
  id: string;
  name: string;
  address: string;

  constructor(business: Response) {
    this.id = business.local_entry_id;
    this.name = business.displayed_what;
    this.address = business.displayed_where;
  }
}

class BusinessDetails {
  id: string;
  name: string;
  address: string;
  openingHours: object;
  website: string;
  phone: string;

  constructor(business: Response) {
    this.id = business.local_entry_id;
    this.name = business.displayed_what;
    this.address = business.displayed_where;
    this.openingHours = business.opening_hours;
    this.website = 'test.com';
    this.phone = '111111';
  }
}

export { getAll, get };
