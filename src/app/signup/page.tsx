"use server";

import { signUp } from "@/lib/authService";
import { ISignUpDTO } from "@/types/auth.type";
import  SignUpForm  from "./signupForm";

export default async function SignUp() {
  async function onSubmit(data: ISignUpDTO) {
    "use server";
    const response = await signUp(data);

    console.log(response);
  }

  return <SignUpForm signUpAction={onSubmit} />;
}
