import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createPractice as createPracticeUseCase,
  getMyPractices as getMyPracticesUseCase,
  getMyPracticeStats as getMyPracticeStatsUseCase,
} from '@/app/modules/practices/PracticeRepository'
import { AuthHeader } from '@/app/network/domain/interfaces'
import {
  CreatePracticePayload,
  FindPracticesParams,
  Practice,
  PracticeStats,
} from '@/types'

export const usePracticeStore = defineStore('practice', () => {
  // STATE ☁️
  const practices = ref<Practice[]>([])
  const practiceStats = ref<PracticeStats | null>(null)

  // ACTIONS 🚀
  const setPractices = (newPractices: Practice[]) => {
    practices.value = newPractices
  }

  const addPractice = (practice: Practice) => {
    practices.value.unshift(practice)
  }

  const setPracticeStats = (stats: PracticeStats) => {
    practiceStats.value = stats
  }

  // FETCH API ⚡️
  const createPractice = async (
    payload: CreatePracticePayload,
    authHeader: AuthHeader,
  ) => {
    const action = createPracticeUseCase(payload, authHeader)
    action
      .then((response) => {
        addPractice(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const getMyPractices = async (
    params: FindPracticesParams,
    authHeader: AuthHeader,
  ) => {
    const action = getMyPracticesUseCase(params, authHeader)
    action
      .then((response) => {
        setPractices(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const getMyPracticeStats = async (
    params: FindPracticesParams,
    authHeader: AuthHeader,
  ) => {
    const action = getMyPracticeStatsUseCase(params, authHeader)
    action
      .then((response) => {
        setPracticeStats(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  return {
    practices,
    practiceStats,
    createPractice,
    getMyPractices,
    getMyPracticeStats,
  }
})
