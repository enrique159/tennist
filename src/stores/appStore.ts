import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: 'David',
      email: 'david@gmail.com',
    },
    stats: {
      wins: 8,
      games: 14,
      aces: 4,
    }
  }),
  getters: {
    getStateUser: (state) => state.user,
    getStateStats: (state) => state.stats,
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setWins(wins: number) {
      this.stats.wins = wins
    }
  }
})