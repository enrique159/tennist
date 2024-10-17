<template>
  <ion-page>
    <header-page />
    <ion-content :force-overscroll='false'>
      <section class="flex items-center w-full mt-4 px-8 gap-2">
        <h1 class="text-2xl"> Hola! {{ user.name }} </h1>
        <img src="@/assets/tennis_ball.png" alt="🎾" class="w-6 h-6 aspect-square">
      </section>
      <main-stats />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import MainStats from '@/components/Home/MainStats.vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useApp } from '@/composables/useApp';

const { user } = useApp();
</script>

<style lang="scss" scoped>

</style>