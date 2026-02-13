const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, "/")


// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signup`
// USER ROUTES
const updateUserExperience = (baseUrl: string, userId: string) => `${finishSlash(baseUrl)}users/${userId}/experience`
const uploadUserImage = (baseUrl: string) => `${finishSlash(baseUrl)}users/upload-image`
const updateUser = (baseUrl: string, userId: string) => `${finishSlash(baseUrl)}users/${userId}`
// VENUE ROUTES
const createVenue = (baseUrl: string) => `${finishSlash(baseUrl)}venues`
const getVenueById = (baseUrl: string, venueId: string) => `${finishSlash(baseUrl)}venues/${venueId}`
const getNearbyVenues = (baseUrl: string) => `${finishSlash(baseUrl)}venues/nearby`
// VENUE IMAGE ROUTES
const uploadVenueImage = (baseUrl: string, venueId: string) => `${finishSlash(baseUrl)}venues/${venueId}/images`
const getVenueImages = (baseUrl: string, venueId: string) => `${finishSlash(baseUrl)}venues/${venueId}/images`
const deleteVenueImage = (baseUrl: string, imageId: string) => `${finishSlash(baseUrl)}venues/images/${imageId}`
const reorderVenueImage = (baseUrl: string, imageId: string) => `${finishSlash(baseUrl)}venues/images/${imageId}/order`
// COURT ROUTES
const createCourt = (baseUrl: string, venueId: string) => `${finishSlash(baseUrl)}venues/${venueId}/courts`
const getCourtsByVenue = (baseUrl: string, venueId: string) => `${finishSlash(baseUrl)}venues/${venueId}/courts`
// COURT SCHEDULE ROUTES
const createCourtSchedule = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/schedules`
const getCourtSchedules = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/schedules`
const updateCourtSchedule = (baseUrl: string, scheduleId: string) => `${finishSlash(baseUrl)}courts/schedules/${scheduleId}`
const deleteCourtSchedule = (baseUrl: string, scheduleId: string) => `${finishSlash(baseUrl)}courts/schedules/${scheduleId}`
// COURT AVAILABILITY ROUTES
const getCourtAvailability = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/availability`
const createAvailabilityException = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/availability-exceptions`
const getAvailabilityExceptions = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/availability-exceptions`
const deleteAvailabilityException = (baseUrl: string, availabilityId: string) => `${finishSlash(baseUrl)}courts/availability-exceptions/${availabilityId}`
// COURT PRICING ROUTES
const createPricingRule = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/pricing-rules`
const getPricingRules = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/pricing-rules`
const updatePricingRule = (baseUrl: string, ruleId: string) => `${finishSlash(baseUrl)}courts/pricing-rules/${ruleId}`
const deletePricingRule = (baseUrl: string, ruleId: string) => `${finishSlash(baseUrl)}courts/pricing-rules/${ruleId}`
const calculatePrice = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/calculate-price`
// RESERVATION ROUTES
const createReservation = (baseUrl: string, courtId: string) => `${finishSlash(baseUrl)}courts/${courtId}/reservations`
const getMyReservations = (baseUrl: string) => `${finishSlash(baseUrl)}users/me/reservations`
const cancelReservation = (baseUrl: string, reservationId: string) => `${finishSlash(baseUrl)}reservations/${reservationId}`

export default {
  // AUTH ROUTES
  signIn,
  signUp,
  // USER ROUTES
  updateUserExperience,
  uploadUserImage,
  updateUser,
  // VENUE ROUTES
  createVenue,
  getVenueById,
  getNearbyVenues,
  // VENUE IMAGE ROUTES
  uploadVenueImage,
  getVenueImages,
  deleteVenueImage,
  reorderVenueImage,
  // COURT ROUTES
  createCourt,
  getCourtsByVenue,
  // COURT SCHEDULE ROUTES
  createCourtSchedule,
  getCourtSchedules,
  updateCourtSchedule,
  deleteCourtSchedule,
  // COURT AVAILABILITY ROUTES
  getCourtAvailability,
  createAvailabilityException,
  getAvailabilityExceptions,
  deleteAvailabilityException,
  // COURT PRICING ROUTES
  createPricingRule,
  getPricingRules,
  updatePricingRule,
  deletePricingRule,
  calculatePrice,
  // RESERVATION ROUTES
  createReservation,
  getMyReservations,
  cancelReservation,
}