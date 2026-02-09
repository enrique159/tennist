const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, "/")


// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signup`
// USER ROUTES
const updateUserExperience = (baseUrl: string, userId: string) => `${finishSlash(baseUrl)}users/${userId}/experience`

export default {
  // AUTH ROUTES
  signIn,
  signUp,
  // USER ROUTES
  updateUserExperience,
}