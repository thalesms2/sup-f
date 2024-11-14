import type { ICompanyDTO, ICompany } from "@/types/company.type";
import { cookies } from "next/headers";

const API_URL = `${process.env.API_URL}/company`;

const createCompany = async (data: ICompanyDTO): Promise<ICompany> => {
  "use server";
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export { createCompany };
