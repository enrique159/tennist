import { storeToRefs } from 'pinia'
import { usePracticeStore } from '@/stores/practiceStore'
import { useApp } from './useApp'
import { CreatePracticePayload, FindPracticesParams } from '@/types'

export const usePractice = () => {
  const practiceStore = usePracticeStore()
  const { authHeader } = useApp()
  const { practices, practiceStats } = storeToRefs(practiceStore)

  const createPractice = (payload: CreatePracticePayload) => {
    return practiceStore.createPractice(payload, authHeader.value)
  }

  const getMyPractices = (params: FindPracticesParams = {}) => {
    return practiceStore.getMyPractices(params, authHeader.value)
  }

  const getMyPracticeStats = (params: FindPracticesParams = {}) => {
    return practiceStore.getMyPracticeStats(params, authHeader.value)
  }

  return {
    practices,
    practiceStats,
    createPractice,
    getMyPractices,
    getMyPracticeStats,
  }
}
