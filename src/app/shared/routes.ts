const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, "/")


// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
// PRODUCT ROUTES
const getProductsByCI = (baseUrl: string, codigoInternet: string) => `${finishSlash(baseUrl)}products/${codigoInternet}`
const getStockByCI = (baseUrl: string, codigoInternet: string) => `${finishSlash(baseUrl)}stock/${codigoInternet}`
// CLIENT ROUTES
const createClient = (baseUrl: string) => `${finishSlash(baseUrl)}clients`
const getClients = (baseUrl: string) => `${finishSlash(baseUrl)}clients`
const getClientById = (baseUrl: string, clientId: string) => `${finishSlash(baseUrl)}clients/${clientId}`
const updateClient = (baseUrl: string, clientId: string) => `${finishSlash(baseUrl)}clients/${clientId}`
const deleteClient = (baseUrl: string, clientId: string) => `${finishSlash(baseUrl)}clients/${clientId}`


export default {
  signIn,
  getProductsByCI,
  getStockByCI,
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
}