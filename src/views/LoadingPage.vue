<template>
  <ion-page>
    <ion-content>
      <div class="loading-app">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonSpinner, useIonRouter } from '@ionic/vue'
import { useStorage } from '@/composables/useStorage'
import { useApp } from '@/composables/useApp'
import { onBeforeMount } from 'vue'

const ionRouter = useIonRouter()

const { getAllStorageValues } = useStorage()
const { setToken, setUser, validToken } = useApp()

const setupStorageInSession = async() => {
  const storageValues = await getAllStorageValues()
  storageValues.forEach((element: any) => {
    if (element.key === 'tennist_token') setToken(element.value)
    if (element.key === 'tennist_user') setUser(element.value)
  })

  if (validToken()) ionRouter.navigate('/home', 'root')
  else ionRouter.navigate('/auth/login', 'root')
}


onBeforeMount(() => {
  setupStorageInSession()
})
</script>

<style scoped>
.loading-app {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>