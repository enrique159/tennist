import { Court } from '@/types'
import { defineStore } from 'pinia'

interface ICourtState {
  courts: Court[]
}

export const useCourtStore = defineStore('court', {
  state: (): ICourtState => ({
    courts: []
  }),
  getters: {
    getStateCourts: (state) => state.courts
  },
  actions: {
    setCourts(courts: Court[]) {
      this.courts = courts
    },
    addCourt(court: Court) {
      this.courts.push(court)
    },
    removeCourt(court: Court) {
      this.courts = this.courts.filter((c) => c._id !== court._id)
    }
  }
})