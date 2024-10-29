import { NetworkMessage } from "@/app/network/domain/interfaces/NetworkMessage"

export interface Response<T> {
  meta?: any
  data: T
  warnings?: NetworkMessage[]
  errors?: NetworkMessage[]
}
