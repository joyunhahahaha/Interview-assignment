export interface Company {
  brn: string;
  resident_registration_number: string;
  resident_type: boolean;
  ceo_name: string;
  sub_business_number: number;
  business_type: string;
  item: string;
  zipcode: string;
  address: string;
  phone: string;
  fax: string;
  department: string;
  manager: string;
  printable_company_name: string;
  guarantee_amount: string;
  credit_limit: string;
  bank: string;
  account_holder: string;
  account_number: string;
  email: string;
  category1: string;
  category2: string;
  contract_start: string;
  contract_end: string;
  note: string;
  is_active: boolean;
}

export interface Client {
  code: string;
  brn: string;
  name: string;
  type: string;
}

export interface ClientWithCompanyDetails extends Client {
  company: Company; // company를 필수로 설정
}