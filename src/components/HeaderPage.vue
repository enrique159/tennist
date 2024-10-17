<template>
  <ion-header class="bg-primary h-20">
    <div class="flex h-full w-full flex-row items-center justify-between px-4">
      <ion-menu-button class="custom-menu-button">
        <icon-menu class="text-tertiary" />
      </ion-menu-button>

      <ion-title class="font-regular">
        <slot>
          tennist
        </slot>
      </ion-title>

      <slot name="right">
        <div class="flex items-center border-4 border-secondary rounded-full"  @click="togglePopover">
          <img src="@/assets/example_profile.jpg" class="w-[52px] rounded-full object-cover" />
        </div>
      </slot>
    </div>
  </ion-header>

  <!-- POPOVER CLIENT MENU -->
  <ion-popover :is-open="isPopoverOpen" :event="popoverEvent" @didDismiss="isPopoverOpen = false" side="bottom">
    <ion-content class="bg-tertiary">
      <ion-list>
        <ion-item button>
          <ion-label>
            <span class="text-primary">Ver mi perfil</span>
          </ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>
            <span class="text-primary">Compartir perfil</span>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
import { IonHeader, IonMenuButton, IonTitle, IonPopover, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref } from 'vue';

const popoverEvent = ref<Event | null>(null)
const isPopoverOpen = ref(false);


const togglePopover = (event: Event) => {
  popoverEvent.value = event
  isPopoverOpen.value = !isPopoverOpen.value
}
</script>

<style lang="scss" scoped>
.custom-menu-button {
  background: rgba(0, 0, 0, 0.10);
  padding: 0.8rem;
  border-radius: 50%;

  &:active {
    transform: scale(0.9);
  }
}
</style>