<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
    <ion-toast
      :is-open="toast.show"
      :message="toast.message"
      :duration="toast.duration"
      :color="toast.color"
      :icon="toast.icon"
      :mode="toast.mode"
      :position="toast.position"
      :class="{ 'success-toast': toast.success, 'text-lg': true }"
      @didDismiss="toast.dismissable ? dismissToast() : ()=>{}"
    />
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonToast,
} from '@ionic/vue';
import { useToast } from './composables/useToast';

const { toast, dismissToast } = useToast()
</script>

<style lang="scss">
ion-toast.success-toast {
  --background: v.$color-complementary-1;
  --color: v.$color-tertiary;
}

ion-toolbar > div {
  background-color: v.$color-secondary;
}
</style>