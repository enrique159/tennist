import { User } from "@/types";

export interface ISignInRequestPayload {
  emailPhone: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: User;
}