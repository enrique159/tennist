import { ID } from "./Id.type";

export type Client = {
  id: ID
  name: string
  lastnames?: string
  phone?: string
}