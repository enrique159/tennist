<template>
  <div class="h-full w-full">
    <p class="px-4 mb-4">Tus preferencias de juego</p>

    <div class="flex flex-col gap-6 px-4">
      <!-- GAME STYLE -->
      <section class="space-y-2">
        <p class="font-bold text-lg text-tertiary">Estilo de juego</p>
        <div class="flex justify-around items-center gap-2">
          <!-- OPTIONS-->
          <div class="space-y-2" v-for="option in playingStyleOptions" :key="`button-playing-style-${option.value}`">
            <button
              class="rounded-full w-16 h-16 grid place-items-center transition-colors"
              :class="[
                playingStyle === option.value
                  ? 'bg-tertiary text-white'
                  : 'bg-black/5',
              ]"
              @click="selectPlayingStyle(option.value)"
            >
              <component :is="option.icon" size="28" />
            </button>
            <p class="text-sm text-center">{{ option.label }}</p>
          </div>
        </div>
      </section>

      <!-- COURT TYPE PREFERENCE -->
      <section class="space-y-2">
        <p class="font-bold text-lg text-tertiary">Tipo de cancha</p>
        <div class="flex justify-around items-center gap-2">
          <!-- OPTIONS-->
          <div class="space-y-2" v-for="option in courtTypePreferenceOptions" :key="`button-court-type-preference-${option.value}`">
            <button
              class="rounded-full w-16 h-16 grid place-items-center transition-colors"
              :class="[
                courtTypePreference === option.value
                  ? 'bg-tertiary text-white'
                  : 'bg-black/5',
              ]"
              @click="selectCourtTypePreference(option.value)"
            >
              <component :is="option.icon" :color="courtTypePreference === option.value ? '#fff' : '#266317'" />
            </button>
            <p class="text-sm text-center">{{ option.label }}</p>
          </div>
        </div>
      </section>

      <!-- GAME PREFERENCE -->
      <section class="space-y-2">
        <p class="font-bold text-lg text-tertiary">Preferencia de juego</p>
        <div class="flex justify-center items-center gap-12">
          <!-- OPTIONS-->
          <div class="space-y-2" v-for="option in gamePreferenceOptions" :key="`button-game-preference-${option.value}`">
            <button
              class="rounded-full w-16 h-16 grid place-items-center transition-colors"
              :class="[
                gamePreference === option.value
                  ? 'bg-tertiary text-white'
                  : 'bg-black/5',
              ]"
              @click="selectGamePreference(option.value)"
            >
              <component :is="option.icon" :color="gamePreference === option.value ? '#fff' : '#266317'" />
            </button>
            <p class="text-sm text-center">{{ option.label }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClay from '@/assets/custom/IconClay.vue'
import IconGrass from '@/assets/custom/IconGrass.vue'
import IconHard from '@/assets/custom/IconHard.vue'
import { UserExperience } from '@/types'
import { CourtTypePreference, GamePreference, PlayingStyle } from '@/types/User.type'
import { IconScale, IconShield, IconSword, IconUser, IconUsers } from '@tabler/icons-vue'
import { computed } from 'vue'

const emit = defineEmits(['update:experience'])
const props = defineProps<{
  experience: UserExperience
}>()

// PlayingStyle
const playingStyle = computed({
  get: () => props.experience.playingStyle,
  set: (playingStyle: PlayingStyle) => {
    emit('update:experience', {
      ...props.experience,
      playingStyle,
    })
  },
})

const playingStyleOptions = [
  { value: PlayingStyle.DEFENSIVE, label: 'Defensa', icon: IconShield },
  { value: PlayingStyle.AGRESSIVE, label: 'Agresivo', icon: IconSword },
  { value: PlayingStyle.GENERAL, label: 'Balance', icon: IconScale },
]

const selectPlayingStyle = (newValue: PlayingStyle) => {
  playingStyle.value = newValue
}

// CourtTypePreference
const courtTypePreference = computed({
  get: () => props.experience.courtTypePreference,
  set: (courtTypePreference: CourtTypePreference) => {
    emit('update:experience', {
      ...props.experience,
      courtTypePreference,
    })
  },
})

const courtTypePreferenceOptions = [
  { value: CourtTypePreference.HARD, label: 'Dura', icon: IconHard },
  { value: CourtTypePreference.CLAY, label: 'Arcilla', icon: IconClay },
  { value: CourtTypePreference.GRASS, label: 'Césped', icon: IconGrass },
]

const selectCourtTypePreference = (newValue: CourtTypePreference) => {
  courtTypePreference.value = newValue
}

// GamePreference
const gamePreference = computed({
  get: () => props.experience.gamePreference,
  set: (gamePreference: GamePreference) => {
    emit('update:experience', {
      ...props.experience,
      gamePreference,
    })
  },
})

const gamePreferenceOptions = [
  { value: GamePreference.SINGLES, label: 'Singles', icon: IconUser },
  { value: GamePreference.DOUBLES, label: 'Dobles', icon: IconUsers },
]

const selectGamePreference = (newValue: GamePreference) => {
  gamePreference.value = newValue
}
</script>
