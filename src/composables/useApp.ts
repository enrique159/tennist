import { ISignInRequestPayload } from '@/app/auth/interfaces'
import { useAppStore } from '@/stores/appStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useApp = () => {
  const appStore = useAppStore()
  const { user, stats } = storeToRefs(appStore)

  const wins = computed(() => {
    return stats.value.wins < 10 ? `0${stats.value.wins}` : `${stats.value.wins}`
  })

  const firstName = computed(() => {
    return user.value.fullName.split(' ')[0]
  })

  const setToken = (token: string) => {
    appStore.setToken(token)
  }

  const setUser = (user: any) => {
    appStore.setUser(user)
  }

  const validToken = () => {
    return appStore.getStateToken.length > 0
  }

  // API
  const signIn = (payload: ISignInRequestPayload) => {
    return appStore.signIn(payload)
  }

  return {
    user,
    stats,
    wins,
    validToken,
    firstName,

    setToken,
    setUser,

    signIn
  }
}