<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-tertiary">
      <main class="flex flex-col justify-center items-center h-screen relative">
        <ion-icon
          :icon="checkmarkCircleOutline"
          class="text-primary text-6xl mb-4 animate__animated animate__fadeInUp"
        />
        <p class="text-white text-lg px-20 text-center animate__animated animate__fadeInUp animate__delay-1s">
          Has completado la experiencia de tu perfil
        </p>

        <button
          class="absolute bottom-16 bg-primary text-tertiary text-lg font-bold px-8 py-2 rounded-full animate__animated animate__fadeInUp animate__delay-2s"
          @click="goToHome"
        >
          Iniciar
        </button>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, useIonRouter } from '@ionic/vue'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { useAnimation } from '@/composables/useAnimation'

const ionRouter = useIonRouter()

const goToHome = () => {
  ionRouter.replace('/home', useAnimation().animationBuilder)
}
</script>
