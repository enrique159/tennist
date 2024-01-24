
const config = {
  api: import.meta.env.VITE_APP_BASE_URL ?? 'https://igocloud-app-el34g.ondigitalocean.app/api/v1',
  image: import.meta.env.VITE_APP_STORAGE_URL ?? 'https://igocloudapp.sfo2.cdn.digitaloceanspaces.com'
}

export default config;