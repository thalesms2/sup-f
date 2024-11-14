"use server";

import CompanyForm from "./companyForm";
import { createCompany } from "@/lib/companyService";

export default async function CreateCompany() {
  return <CompanyForm createCompanyAction={createCompany} />;
}
