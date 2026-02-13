import { NetworkMessage } from "@/app/network/domain/interfaces/NetworkMessage"

export interface Response<T> {
  meta?: MetaPage
  data: T
  warnings?: NetworkMessage[]
  errors?: NetworkMessage[]
}

export type MetaPage = {
  totalItems?: number
  totalPages?: number
  page?: number
  offset?: number
  endOffset?: number
  limit?: number
  hasMore?: boolean
}
