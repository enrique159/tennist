<template>
  <div class="h-full w-full">
    <p class="px-4 mb-4">Ya casi terminamos</p>

    <div class="flex flex-col gap-6 px-4">
      <!-- MAIN OBJECTIVE -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-gender" class="uppercase">Objetivo principal</label>
        <button
          class="bg-transparent px-2 py-3 text-lg focus:outline-none text-tertiary w-full border-b border-solid border-tertiary flex items-center justify-between"
          @click="openPlayerGoalsPopover"
        >
          <span class="">{{ selectedPlayerGoal }}</span>
          <icon-chevron-down class="text-tertiary" />
        </button>

        <ion-popover
          :is-open="showPlayerGoalsPopover"
          :event="event"
          @didDismiss="showPlayerGoalsPopover = false"
        >
          <ion-content class="bg-tertiary text-white">
            <ion-list>
              <ion-item
                v-for="option in playerGoalsOptions"
                :key="option.value"
                @click="changePlayerGoal(option.value)"
              >
                <span class="text-white">{{ option.label }}</span>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </fieldset>

      <!-- GAMES PER WEEK -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-games-per-week" class="uppercase">Juegos por semana</label>
        <input
          id="input-games-per-week"
          v-model="gamesPerWeek"
          type="number"
          class="border-b border-tertiary bg-transparent px-2 py-3 text-lg focus:outline-none"
        />
      </fieldset>

      <!-- DOMINANT HAND -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-dominant-hand" class="uppercase">Mano dominante</label>
        <button
          class="bg-transparent px-2 py-3 text-lg focus:outline-none text-tertiary w-full border-b border-solid border-tertiary flex items-center justify-between"
          @click="openDominantHandPopover"
        >
          <span class="">{{ selectedDominantHand }}</span>
          <icon-chevron-down class="text-tertiary" />
        </button>

        <ion-popover
          :is-open="showDominantHandPopover"
          :event="event"
          @didDismiss="showDominantHandPopover = false"
        >
          <ion-content class="bg-tertiary text-white">
            <ion-list>
              <ion-item
                v-for="option in dominantHandOptions"
                :key="option.value"
                @click="changeDominantHand(option.value)"
              >
                <span class="text-white">{{ option.label }}</span>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonPopover, IonContent, IonList, IonItem } from '@ionic/vue'
import { UserExperience } from '@/types'
import { PlayerGoals, DominantHand } from '@/types/User.type'
import { computed, ref } from 'vue'

const emit = defineEmits(['update:experience'])
const props = defineProps<{
  experience: UserExperience
}>()

// Popover
const showPlayerGoalsPopover = ref(false)
const event = ref<Event | null>(null)
const openPlayerGoalsPopover = (e: Event) => {
  event.value = e
  showPlayerGoalsPopover.value = true
}

const playerGoalsOptions = [
  { value: PlayerGoals.RECREATIONAL, label: 'Jugar por diversión' },
  { value: PlayerGoals.COMPETITIVE, label: 'Ser competitivo' },
  { value: PlayerGoals.FITNESS, label: 'Mejorar mi condición física' },
  { value: PlayerGoals.NONE, label: 'No tengo un objetivo específico' },
]

const selectedPlayerGoal = computed(() => {
  return (
    playerGoalsOptions.find((option) => option.value === props.experience.playerGoals)
      ?.label ?? 'Otro'
  )
})

const changePlayerGoal = (playerGoal: string) => {
  emit('update:experience', {
    ...props.experience,
    playerGoals: playerGoal as PlayerGoals,
  })
  showPlayerGoalsPopover.value = false
  event.value = null
}

// Games per week
const gamesPerWeek = computed({
  get: () => props.experience.gamesPerWeek,
  set: (value: number) => {
    emit('update:experience', {
      ...props.experience,
      gamesPerWeek: value,
    })
  },
})

// DOMINANT HAND
const dominantHandOptions = [
  { value: DominantHand.LEFT, label: 'Izquierda' },
  { value: DominantHand.RIGHT, label: 'Derecha' },
]

const selectedDominantHand = computed(() => {
  return (
    dominantHandOptions.find(
      (option) => option.value === props.experience.dominantHand
    )?.label ?? 'Otro'
  )
})

const showDominantHandPopover = ref(false)
const openDominantHandPopover = (e: Event) => {
  event.value = e
  showDominantHandPopover.value = true
}

const changeDominantHand = (dominantHand: DominantHand) => {
  emit('update:experience', {
    ...props.experience,
    dominantHand,
  })
  showDominantHandPopover.value = false
  event.value = null
}
</script>

<style scoped></style>
