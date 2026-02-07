import { getCurrentInstance } from 'vue'
import { useApp } from '@/composables/useApp'

type valueStorage = {
  key: string,
  value: string | number | boolean | object | null
}

export const useStorage = () => {
  // Get instance of current vue app
  const app = getCurrentInstance()
  if (!app) throw new Error('No vue app found')
  const { setToken, setUser } = useApp()

  // Get storage instance from app
  const storage = app.appContext.config.globalProperties.$ionicStorage

  // Methods
  // GET ALL STORAGE VALUES
  const getAllStorageValues = async() => {
    const keys = await storage.keys()
    const values = await Promise.all(keys.map(async(key: string) => {
      const value = await storage.get(key)
      return { key, value }
    }))
    return values
  }

  // SET STORAGE VALUE
  const setStorageValue = async(payload: valueStorage) => {
    console.log(payload)
    await storage.set(payload.key, payload.value)
  }

  // GET STORAGE VALUE
  const getStorageValue = async(key: string) => {
    const value = await storage.get(key)
    return value
  }

  // REMOVE STORAGE VALUE
  const removeStorageValue = async(key: string) => {
    await storage.remove(key)
  }

  // CLEAR STORAGE
  const clearStorage = async() => {
    await storage.clear()
  }

  // SET STORAGE INTO STATE MANAGEMENT
  const setupStorageInSession = async() => {
    const storageValues = await getAllStorageValues()
    storageValues.forEach((element: any) => {
      if (element.key === 'tennist_token') setToken(element.value)
      if (element.key === 'user') setUser(element.value)
    })
  }

  return {
    storage,

    // Methods
    getAllStorageValues,
    setStorageValue,
    getStorageValue,
    removeStorageValue,
    clearStorage,
    setupStorageInSession,
  }
}