import { Geolocation } from '@capacitor/geolocation'
import { ref } from 'vue'

export interface UserLocation {
  lat: number
  lng: number
}

export const useGeolocation = () => {
  const location = ref<UserLocation | null>(null)
  const locationError = ref<string | null>(null)
  const loading = ref(false)

  const getCurrentPosition = async (): Promise<UserLocation | null> => {
    loading.value = true
    locationError.value = null

    try {
      // Esto automáticamente pide permisos al usuario si no los ha dado
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      })

      location.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      return location.value
    } catch (error: any) {
      locationError.value = error.message || 'No se pudo obtener la ubicación'
      return null
    } finally {
      loading.value = false
    }
  }

  const checkPermissions = async () => {
    const status = await Geolocation.checkPermissions()
    return status.location // 'prompt' | 'granted' | 'denied'
  }

  const requestPermissions = async () => {
    const status = await Geolocation.requestPermissions()
    return status.location
  }

  return {
    location,
    locationError,
    loading,
    getCurrentPosition,
    checkPermissions,
    requestPermissions,
  }
}