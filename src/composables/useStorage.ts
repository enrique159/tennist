import { getCurrentInstance } from 'vue'

type valueStorage = {
  key: string,
  value: string | number | boolean | object | null
}

export const useStorage = () => {
  // Get instance of current vue app
  const app = getCurrentInstance()
  if (!app) throw new Error('No vue app found')

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

  return {
    storage,

    // Methods
    getAllStorageValues,
    setStorageValue,
    getStorageValue,
    removeStorageValue,
    clearStorage,
  }
}