"use server";

import LoginForm from "./loginForm";
import { cookies } from "next/headers";
import { submitLogin } from "@/lib/authService";
import { redirect } from "next/navigation";
import type { ILoginDTO } from "@/types/auth.type";

export default async function Login() {
  async function onSubmit(data: ILoginDTO) {
    "use server";
    const response = await submitLogin({
      username: data.username,
      password: data.password,
    });
    (await cookies()).set("token", response.token);
    (await cookies()).set("user", response.id.toString());
    redirect("/ticket");
  }

  return <LoginForm loginAction={onSubmit} />;
}
