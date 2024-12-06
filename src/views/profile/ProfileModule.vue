<template>
  <ion-page>
    <ion-content :force-overscroll='false'>
      <ion-router-outlet />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonRouterOutlet, IonPage, IonContent } from '@ionic/vue';
</script>