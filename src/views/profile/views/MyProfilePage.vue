<template>
  <ion-page>
    <ion-content :force-overscroll='false' class="bg-primary">
      <div class="w-full h-full">
        <ion-header class="bg-primary h-20">
          <div class="flex h-full w-full flex-row items-center justify-between px-4">
            <button class="custom-menu-button" @click="goHome">
              <icon-arrow-left class="text-tertiary" />
            </button>

            <ion-title class="font-light text-tertiary">
              Mi perfil
            </ion-title>
          </div>
        </ion-header>

        <div class="w-full h-fit flex flex-col items-center justify-center">
          <ion-button @click="logOut">
            cerrar sesión
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonTitle, IonButton, useIonRouter } from '@ionic/vue';
import { useApp } from '@/composables/useApp';
import { IconArrowLeft } from '@tabler/icons-vue';
import { useStorage } from '@/composables/useStorage';

const ionRouter = useIonRouter()
const { signOut } = useApp()
const { clearStorage } = useStorage()

const goHome = () => {
  ionRouter.back()
}

const logOut = () => {
  signOut()
  clearStorage()
  ionRouter.navigate('/auth/login', 'root')
}
</script>