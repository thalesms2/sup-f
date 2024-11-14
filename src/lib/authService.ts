import { cookies } from "next/headers";
import type { ILoginDTO, ILoginResponse, ISignUpDTO } from "@/types/auth.type";

const API_URL = `${process.env.API_URL}/auth`;

const submitLogin = async (data: ILoginDTO): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const result: ILoginResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    throw error;
  }
};

const validateSession = async (): Promise<boolean> => {
  "use server";

  if ((await cookies()).has("token")) {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(`${API_URL}/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(
        `Erro na validação do token de autenticação: ${response.statusText}`
      );
    }
    const result = await response.json();
    return result;
  }
  return false;
};

const logout = async (): Promise<void> => {
  "use server";

  (await cookies()).delete("token");
  (await cookies()).delete("user");
};

const signUp = async (data: ISignUpDTO): Promise<void> => {
  "use server";
  
  const response = await fetch(`${API_URL}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(
      `Erro na validação do token de autenticação: ${response.statusText}`
    );
  }
  const result = await response.json();
  return result;
};

export { submitLogin, validateSession, logout, signUp };
