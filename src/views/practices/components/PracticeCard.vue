<template>
  <article class="rounded-2xl border border-tertiary/10 bg-white/95 p-4 animate__animated animate__fadeInUp">
    <div class="flex items-center justify-between gap-2">
      <p class="m-0 text-[0.82rem] font-semibold text-tertiary/70">{{ formatDate(practice.practiceDate) }}</p>
      <span
        class="rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.05em]"
        :class="practice.sourceType === PracticeSourceType.CLASS ? 'bg-[#2a7293]/20 text-[#23586f]' : 'bg-[#237553]/20 text-[#1f6a4b]'"
      >
        {{ practice.sourceType === PracticeSourceType.CLASS ? 'Clase' : 'Manual' }}
      </span>
    </div>

    <h3 class="m-0 mt-3 text-base text-tertiary font-semibold">
      {{ practice.className || (practice.sourceType === PracticeSourceType.CLASS ? 'Entrenamiento de clase' : 'Sesión individual') }}
    </h3>

    <div class="mt-3 flex flex-wrap gap-2">
      <p class="m-0 rounded-full bg-tertiary/10 px-2.5 py-1 text-xs font-semibold text-tertiary/75">{{ practice.durationMinutes }} min</p>
      <p class="m-0 rounded-full bg-tertiary/10 px-2.5 py-1 text-xs font-semibold text-tertiary/75">{{ practice.playedFriendlyMatch ? 'Con amistoso' : 'Sin amistoso' }}</p>
      <p class="m-0 rounded-full bg-tertiary/10 px-2.5 py-1 text-xs font-semibold text-tertiary/75">{{ practice.practicedServes ? 'Con saques' : 'Sin saques' }}</p>
    </div>

    <p v-if="practice.notes" class="m-0 mt-3 text-[0.85rem] leading-[1.35] text-tertiary/80">{{ practice.notes }}</p>
  </article>
</template>

<script setup lang="ts">
import { Practice, PracticeSourceType } from '@/types'

defineProps<{
  practice: Practice
}>()

const formatDate = (value: string) => {
  const date = new Date(`${value}T12:00:00`)
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>
