import { defineStore } from 'pinia'
import {
  signIn as signInUseCase,
  signUp as signUpUseCase,
} from '@/app/auth/SignInRepository'
import {
  updateUserExperience as updateUserExperienceUseCase,
} from '@/app/modules/users/UserRepository'
import { ISignInRequestPayload, ISignUpRequestPayload } from '@/app/auth/interfaces'
import { User, UserExperience } from '@/types'
import { AuthHeader } from '@/app/network/domain/interfaces'

interface IAppState {
  token: string
  user: User
  stats: any
}

export const useAppStore = defineStore('app', {
  state: (): IAppState => ({
    token: '',
    user: {} as User,
    stats: {
      wins: 28,
      games: 14,
      aces: 4,
    }
  }),
  getters: {
    getStateToken: (state) => state.token,
    getStateUser: (state) => state.user,
    getStateStats: (state) => state.stats,
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    setWins(wins: number) {
      this.stats.wins = wins
    },


    // FETCH API 🚀
    async signIn(payload: ISignInRequestPayload) {
      const action = signInUseCase(payload)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    async signUp(payload: ISignUpRequestPayload) {
      const action = signUpUseCase(payload)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },
    
    async updateUserExperience(payload: Partial<UserExperience>, authHeader: AuthHeader) {
      const action = updateUserExperienceUseCase(payload, this.user.id!, authHeader)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    }
  }
})