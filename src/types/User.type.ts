import Base from './Base.type'

export interface User extends Base {
  username: string
  email: string
  emailVerified: boolean
  password: string
  phoneNumber?: string
  phoneVerified: boolean
  fullName: string
  profileImageUrl?: string
  role?: Role
  gender?: Gender
  age?: number // Edad en años
  experience?: Experience
  playingTime?: number // Tiempo jugado en meses
  playingStyle?: PlayingStyle
  courtTypePreference?: CourtTypePreference
  gamePreference?: GamePreference
  gamesPerWeek?: number // Juegos jugados por semana
  playerGoals?: PlayerGoals
  dominantHand?: DominantHand
  status: string
  isDeleted: boolean
  lastLoginAt?: Date
  activationCode?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  twoFactorEnabled: boolean
  loginAttempts: number
  lockUntil?: Date
}

export interface UserExperience {
  role: Role | null
  gender: Gender | null
  age: number | null
  experience: Experience | null
  playingTime: number | null
  playingStyle: PlayingStyle | null
  courtTypePreference: CourtTypePreference | null
  gamePreference: GamePreference | null
  playerGoals: PlayerGoals | null
  gamesPerWeek: number | null
  dominantHand: DominantHand | null
}

enum Role {
  PLAYER = 'player',
  COACH = 'coach',
  COURT_OWNER = 'court_owner',
  ADMIN = 'admin',
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

enum Experience {
  BEGGINER = 'begginer',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  PRO = 'pro',
}

enum PlayingStyle {
  DEFENSIVE = 'defensive',
  AGRESSIVE = 'aggressive',
  GENERAL = 'general',
  NONE = 'none',
}

enum CourtTypePreference {
  CLAY = 'clay',
  GRASS = 'grass',
  HARD = 'hard',
}

enum GamePreference {
  SINGLES = 'singles',
  DOUBLES = 'doubles',
}

enum PlayerGoals {
  COMPETITIVE = 'competitive',
  RECREATIONAL = 'recreational',
  FITNESS = 'fitness',
  NONE = 'none',
}

enum DominantHand {
  LEFT = 'left',
  RIGHT = 'right',
  BOTH = 'both',
}

export {
  Role,
  Gender,
  Experience,
  PlayingStyle,
  CourtTypePreference,
  GamePreference,
  PlayerGoals,
  DominantHand,
}
