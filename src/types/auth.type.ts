interface ILoginDTO {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  id: number;
}

interface ISignUpDTO {
  username: string;
  password: string;
}

interface IUser {
  id: number;
  username: string;
  companyId: number;
}

export type { ILoginDTO, ILoginResponse, ISignUpDTO, IUser };