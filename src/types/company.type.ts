interface ICompany {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  doc: string;
  name: string;
  email: string;
  contact: string;
  isActive: boolean;
}

interface ICompanyDTO {
  doc: string;
  name: string;
  email: string;
  contact: string;
  isActive: string;
}

export type { ICompany, ICompanyDTO};	