export interface Court {
  _id: string
  name: string
  address: string
  city: string
  state: string
  courts: number
  type: CourtType 
  phone: string
  website?: string
  imageCover?: string
  images?: string[]
  socials?: string[]
  schedule?: Schedule
}

export type Schedule = {
  [key in TDay]: {
    start: string
    end: string
  }
}

const DAYS = {
  MO: 'MO',
  TU: 'TU',
  WE: 'WE',
  TH: 'TH',
  FR: 'FR',
  SA: 'SA',
  SU: 'SU'
} as const;

type TDay = keyof typeof DAYS

export enum CourtType {
  HARD = 'hard',
  GRASS = 'grass',
  CLAY = 'clay',
}