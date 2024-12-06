<template>
  <!-- FOOTER STEPPER -->
  <div class="grid grid-cols-5 gap-4 w-full px-10 pb-4 items-end">
    <icon-button class="col-span-1" @click="goBackward">
      <icon-arrow-left class="text-tertiary" />
    </icon-button>

    <div
      class="flex flex-col items-center justify-center gap-2 col-span-3 pb-5"
    >
      <ion-button
        fill="clear"
        class="text-secondary font-semibold"
        @click="goForward"
      >
        omitir paso
      </ion-button>

      <div
        class="flex items-center justify-center gap-2 w-full h-full relative"
      >
        <div
          v-for="step in 5"
          :key="step"
          class="w-2 h-2 rounded-full"
          :class="[
            currentStep === step ? 'bg-complementary1' : 'bg-tertiary/10',
          ]"
        ></div>
      </div>
    </div>

    <button
      class="rounded-full h-12 aspect-square flex items-center justify-center transition-all bg-tertiary text-primary active:bg-tertiary/80"
      @click="goForward"
    >
      <icon-arrow-right />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-vue'

defineProps<{
  currentStep: number
}>()

const emits = defineEmits(['goBackward', 'goForward'])

const goBackward = () => {
  emits('goBackward')
}

const goForward = () => {
  emits('goForward')
}
</script>

<style scoped></style>
