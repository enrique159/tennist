import { ISignInRequestPayload, ISignUpRequestPayload } from '@/app/auth/interfaces'
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
    return user.value.fullName && user.value.fullName.length > 0 && user.value.fullName.split(' ')[0]
  })

  const setToken = (token: string) => {
    appStore.setToken(token)
  }

  const setUser = (user: any) => {
    appStore.setUser(user)
  }

  const validToken = () => {
    return appStore.getStateToken?.length > 0
  }

  const signOut = () => {
    appStore.setToken('')
    appStore.setUser({})
  }

  // API
  const signIn = (payload: ISignInRequestPayload) => {
    return appStore.signIn(payload)
  }

  const signUp = (payload: ISignUpRequestPayload) => {
    return appStore.signUp(payload)
  }

  return {
    user,
    stats,
    wins,
    validToken,
    firstName,

    setToken,
    setUser,
    signOut,

    signIn,
    signUp
  }
}