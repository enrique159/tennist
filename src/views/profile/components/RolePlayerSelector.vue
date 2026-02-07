<template>
  <div class="h-full w-full">
    <p class="px-4 mb-4">¿Con qué rol te relacionas más?</p>
    <button
      v-for="option in options"
      :key="`option-button-${option.title}`"
      class="w-full rounded-full h-20 grid grid-cols-12 items-center gap-2 px-4 pl-6 transition-all border-solid border-2 border-complementary2 mb-4 active:scale-95"
      :class="{
        'bg-complementary2 text-white': experience.role === option.role,
      }"
      @click="
        emits('update:experience', { ...props.experience, role: option.role })
      "
    >
      <img
        :src="option.icon"
        alt="🎾"
        class="h-7 aspect-square object-contain col-span-2"
      />

      <div class="col-span-10 text-left">
        <span
          class="font-bold uppercase"
          :class="[
            experience.role === option.role ? 'text-primary' : 'text-tertiary',
          ]"
          >{{ option.title }}</span
        >
        <p
          class="text-complementary2 text-sm font-medium"
          :class="{ 'text-white': experience.role === option.role }"
        >
          {{ option.description }}
        </p>
      </div>
    </button>

    <div
      v-if="selectedRoleDetails"
      class="mt-6 flex flex-col items-center justify-center"
    >
      <h6 class="text-complementary2 font-bold flex items-center gap-2">
        <icon-info-circle />
        información
      </h6>
      <p class="text-tertiary text-center">
        {{ selectedRoleDetails?.details }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IconInfoCircle } from '@tabler/icons-vue'
import { UserExperience } from '@/types'

const props = defineProps<{
  experience: UserExperience
}>()

const emits = defineEmits(['update:experience'])

const options = [
  {
    role: 'player',
    title: 'Jugador',
    description: 'recreativo o profesional',
    details:
      'Como jugador tienes acceso a llevar control de tus juegos y prácticas, así como tener acceso al catálogo de canchas y clubes, y agregar a otros jugadores como amigos.',
    icon: new URL('@/assets/icon_player.png', import.meta.url).href,
  },
  {
    role: 'coach',
    title: 'Entrenador',
    description: 'también jugador',
    details:
      'Como entrenador tienes acceso a las mismas características que un jugador, pero con la posibilidad de crear y administrar clases, prácticas y juegos.',
    icon: new URL('@/assets/icon_couch.png', import.meta.url).href,
  },
  {
    role: 'court_owner',
    title: 'Gestor de canchas / club',
    description: 'también jugador y/o entrenador',
    details:
      'Como gestor de canchas o club tienes acceso a las mismas características que un jugador y entrenador, pero con la posibilidad de crear y administrar canchas y clubes.',
    icon: new URL('@/assets/icon_court.png', import.meta.url).href,
  },
]

const selectedRoleDetails = computed(() => {
  const selectedRole = options.find(
    (option) => option.role === props.experience.role
  )
  return selectedRole
})
</script>

<style scoped></style>
