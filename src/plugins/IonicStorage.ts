import { Storage } from '@ionic/storage'

export default async function storageFactory() {
  const storage = new Storage()
  const storageInstance = await storage.create()
  return {
    install(app: any){
      app.config.globalProperties.$ionicStorage = storageInstance
    },
  }
}