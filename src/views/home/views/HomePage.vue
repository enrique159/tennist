<template>
  <ion-page>
    <header-page />
    <ion-content :force-overscroll='false'>
      <section class="flex items-center w-full mt-4 px-8 gap-2 animate__animated animate__fadeIn">
        <h1 class="text-2xl"> Hola! {{ firstName }} </h1>
        <img src="@/assets/tennis_ball.png" alt="🎾" class="w-6 h-6 aspect-square">
      </section>
      <main-stats class="animate__animated animate__fadeInUp" />

      <section class="flex items-center w-full mt-4 px-8 gap-2 animate__animated animate__fadeIn">
        <h1 class="text-2xl"> Hola! {{ firstName }} </h1>
        <img src="@/assets/tennis_ball.png" alt="🎾" class="w-6 h-6 aspect-square">
      </section>
      <main-stats class="animate__animated animate__fadeInUp" />

      <section class="flex items-center w-full mt-4 px-8 gap-2 animate__animated animate__fadeIn">
        <h1 class="text-2xl"> Hola! {{ firstName }} </h1>
        <img src="@/assets/tennis_ball.png" alt="🎾" class="w-6 h-6 aspect-square">
      </section>
      <main-stats class="animate__animated animate__fadeInUp" />

      <section class="flex items-center w-full mt-4 px-8 gap-2 animate__animated animate__fadeIn">
        <h1 class="text-2xl"> Hola! {{ firstName }} </h1>
        <img src="@/assets/tennis_ball.png" alt="🎾" class="w-6 h-6 aspect-square">
      </section>
      <main-stats class="animate__animated animate__fadeInUp" />

      <section class="flex items-center w-full mt-4 px-8 gap-2 animate__animated animate__fadeIn">
        <h1 class="text-2xl"> Hola! {{ firstName }} </h1>
        <img src="@/assets/tennis_ball.png" alt="🎾" class="w-6 h-6 aspect-square">
      </section>
      <main-stats class="animate__animated animate__fadeInUp" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import MainStats from '../components/MainStats.vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useApp } from '@/composables/useApp';

const { firstName } = useApp();
</script>

<style lang="scss" scoped>

</style>