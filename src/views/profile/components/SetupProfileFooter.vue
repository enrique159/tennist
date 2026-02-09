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
        class="text-secondary font-semibold transition-all"
        :class="{ 'opacity-0': isLastStep }"
        @click="goForward"
      >
        omitir paso
      </ion-button>

      <div
        class="flex items-center justify-center gap-2 w-full h-full relative"
      >
        <div
          v-for="step in stepsCount"
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
      @click="() => isLastStep ? handleSubmit() : goForward()"
    >
      <loading-spinner v-if="isLoading" class-name="text-primary" />
      <icon-check v-else-if="isLastStep" />
      <icon-arrow-right v-else />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-vue'
import { computed } from 'vue';

const props = defineProps<{
  currentStep: number
  isLoading: boolean
}>()

const stepsCount = 4

const emits = defineEmits(['goBackward', 'goForward', 'submit'])

const goBackward = () => {
  emits('goBackward')
}

const goForward = () => {
  emits('goForward')
}

const handleSubmit = () => {
  emits('submit')
}

const isLastStep = computed(() => {
  return props.currentStep === stepsCount
})
</script>
