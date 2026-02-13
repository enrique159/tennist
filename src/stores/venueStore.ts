import { defineStore } from 'pinia'
import {
  getNearbyVenues as getNearbyVenuesUseCase
} from '@/app/modules/venues/VenueRepository'
import { FindNearbyVenuesParams, Venue } from '@/types'
import { ref } from 'vue'
import { AuthHeader } from '@/app/network/domain/interfaces'

export const useVenueStore = defineStore('venue', () =>{
  // STATE ☁️
  const venues = ref<Venue[]>([])
  
  // GETTERS 🫰
  
  // ACTIONS 🚀
  const setVenues = (newVenues: Venue[]) => {
    venues.value = newVenues
  }
  
  // FETCH API ⚡️
  const getNearbyVenues = async (params: FindNearbyVenuesParams, authHeader: AuthHeader) => {
    const action = getNearbyVenuesUseCase(params, authHeader)
    action.then((response) => {
        setVenues(response.data)
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
  }
  
  return {
    venues,
    getNearbyVenues
  }
})