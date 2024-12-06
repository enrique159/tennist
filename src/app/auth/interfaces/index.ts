import { User } from "@/types";

export interface ISignInRequestPayload {
  emailPhone: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: User;
}

export interface ISignUpRequestPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ISignUpResponse {
  token: string;
  user: User;
}