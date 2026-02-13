import { useVenueStore } from "@/stores/venueStore";
import { storeToRefs } from "pinia";
import { useApp } from "./useApp";
import { FindNearbyVenuesParams } from "@/types";

export const useVenue = () => {
  const venueStore = useVenueStore()
  const { authHeader } = useApp()
  const { venues } = storeToRefs(venueStore)
  
  // Functions
  const getNearbyVenues = (params: FindNearbyVenuesParams) => {
    return venueStore.getNearbyVenues(params, authHeader.value)
  }
  
  return {
    venues,
    getNearbyVenues
  }
}