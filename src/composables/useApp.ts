import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useApp = () => {
  const appStore = useAppStore()
  const { user, stats } = storeToRefs(appStore)

  const wins = computed(() => {
    return stats.value.wins < 10 ? `0${stats.value.wins}` : `${stats.value.wins}`
  })

  return {
    user,
    stats,
    wins
  }
}