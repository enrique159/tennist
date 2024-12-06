<template>
  <div class="h-full w-full">
    <p class="px-4 mb-4">Información base</p>

    <div class="flex flex-col gap-6 px-4">
      <!-- GENDER -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-gender" class="uppercase">Sexo</label>
        <button
          class="bg-transparent px-2 py-3 text-lg focus:outline-none text-tertiary w-full border-b border-solid border-tertiary flex items-center justify-between"
          @click="openGenderPopover"
        >
          <span class="">{{ selectedGender }}</span>
          <icon-chevron-down class="text-tertiary" />
        </button>

        <ion-popover
          :is-open="showGenderPopover"
          :event="event"
          @didDismiss="showGenderPopover = false"
        >
          <ion-content class="bg-tertiary text-white">
            <ion-list>
              <ion-item
                v-for="option in genderOptions"
                :key="option.value"
                @click="changeGender(option.value)"
              >
                <span class="text-white">{{ option.label }}</span>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </fieldset>

      <!-- AGE -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-age" class="uppercase">Edad</label>
        <input
          id="input-age"
          v-model="ageProp"
          type="number"
          class="border-b border-tertiary bg-transparent px-2 py-3 text-lg focus:outline-none"
        />
      </fieldset>

      <!-- EXPERIENCE -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-experience" class="uppercase">Nivel</label>
        <button
          class="bg-transparent px-2 py-3 text-lg focus:outline-none text-tertiary w-full border-b border-solid border-tertiary flex items-center justify-between"
          @click="openExpereincePopover"
        >
          <span class="">{{ selectedExperience }}</span>
          <icon-chevron-down class="text-tertiary" />
        </button>

        <ion-popover
          :is-open="showExperiencePopover"
          :event="event"
          @didDismiss="showExperiencePopover = false"
        >
          <ion-content class="bg-tertiary text-white">
            <ion-list>
              <ion-item
                v-for="option in experienceOptions"
                :key="option.value"
                @click="changeExperience(option.value)"
              >
                <span class="text-white">{{ option.label }}</span>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </fieldset>

      <!-- PLAYING TIME -->
      <fieldset class="text-tertiary flex flex-col">
        <label for="input-playing-time" class="uppercase">Tiempo jugando</label>
        <div class="w-full relative h-fit">
          <input
            id="input-playing-time"
            :value="playingTime"
            disabled
            type="text"
            class="border-b border-tertiary bg-transparent px-12 py-3 text-lg focus:outline-none"
          />
          <icon-button
            class="absolute left-0 bottom-2 z-10"
            class-name="h-10 bg-transparent"
            @click="substractPlayingTime"
          >
            <icon-chevron-left class="text-tertiary" />
          </icon-button>
          <icon-button
            class="absolute right-0 bottom-2 z-10"
            class-name="h-10 bg-transparent"
            @click="addPlayingTime"
          >
            <icon-chevron-right class="text-tertiary" />
          </icon-button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonPopover, IonContent, IonList, IonItem } from '@ionic/vue'
import { UserExperience } from '@/types'
import { Gender, Experience } from '@/types/User.type'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
import { computed, ref } from 'vue'

const emit = defineEmits(['update:experience'])
const props = defineProps<{
  experience: UserExperience
}>()

// Popover
const showGenderPopover = ref(false)
const event = ref<Event | null>(null)
const openGenderPopover = (e: Event) => {
  event.value = e
  showGenderPopover.value = true
}

const genderOptions = [
  { value: 'male', label: 'Hombre' },
  { value: 'female', label: 'Mujer' },
  { value: 'other', label: 'Otro' },
]

const selectedGender = computed(() => {
  return (
    genderOptions.find((option) => option.value === props.experience.gender)
      ?.label ?? 'Otro'
  )
})

const changeGender = (gender: string) => {
  emit('update:experience', {
    ...props.experience,
    gender: gender as Gender,
  })
  showGenderPopover.value = false
  event.value = null
}

// Age
const ageProp = computed({
  get: () => props.experience.age,
  set: (age: number) => {
    emit('update:experience', {
      ...props.experience,
      age,
    })
  },
})

// Experience
const experienceOptions = [
  { value: Experience.BEGGINER, label: 'Principiante' },
  { value: Experience.INTERMEDIATE, label: 'Intermedio' },
  { value: Experience.ADVANCED, label: 'Avanzado' },
  { value: Experience.PRO, label: 'Profesional' },
]

const selectedExperience = computed(() => {
  return (
    experienceOptions.find(
      (option) => option.value === props.experience.experience
    )?.label ?? 'Otro'
  )
})

const showExperiencePopover = ref(false)
const openExpereincePopover = (e: Event) => {
  event.value = e
  showExperiencePopover.value = true
}

const changeExperience = (experience: string) => {
  emit('update:experience', {
    ...props.experience,
    experience: experience as Gender,
  })
  showExperiencePopover.value = false
  event.value = null
}

// Playing time
const playingTime = computed(() => {
  if (
    props.experience.playingTime === null ||
    props.experience.playingTime === 0
  )
    return 'Nunca'
  else if (props.experience.playingTime === 1) return '1 mes'
  else if (
    props.experience.playingTime > 1 &&
    props.experience.playingTime <= 11
  ) {
    return `${props.experience.playingTime} meses`
  } else if (props.experience.playingTime === 12) return '1 año'
  else {
    return `${props.experience.playingTime / 12} años`
  }
})

const addPlayingTime = () => {
  emit('update:experience', {
    ...props.experience,
    playingTime: props.experience.playingTime
      ? props.experience.playingTime >= 12
        ? props.experience.playingTime + 12
        : props.experience.playingTime + 1
      : 1,
  })
}

const substractPlayingTime = () => {
  if (props.experience.playingTime === null) return
  if (props.experience.playingTime === 0) return
  emit('update:experience', {
    ...props.experience,
    playingTime:
      props.experience.playingTime > 12
        ? props.experience.playingTime - 12
        : props.experience.playingTime - 1,
  })
}
</script>

<style scoped></style>
