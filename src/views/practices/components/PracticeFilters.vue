<template>
  <section class="grid gap-4 animate__animated animate__fadeInUp">
    <div class="grid gap-2">
      <p class="m-0 text-[0.8rem] uppercase tracking-[0.04em] text-tertiary/65">Rango</p>
      <div class="flex gap-2">
        <button
          v-for="option in rangeOptions"
          :key="option.value"
          type="button"
          class="rounded-full px-4 py-2 text-[0.85rem] font-semibold"
          :class="option.value === selectedRange ? 'bg-tertiary text-white' : 'bg-tertiary/10 text-tertiary'"
          @click="$emit('update:selectedRange', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div class="grid gap-2">
      <p class="m-0 text-[0.8rem] uppercase tracking-[0.04em] text-tertiary/65">Tipo</p>
      <div class="grid grid-cols-3 rounded-full bg-tertiary/10 p-1 gap-1">
        <button
          v-for="option in sourceOptions"
          :key="option.value"
          type="button"
          class="rounded-full px-1 py-2 text-[0.8rem] font-semibold"
          :class="option.value === selectedSource ? 'bg-tertiary text-white' : 'bg-transparent text-tertiary'"
          @click="$emit('update:selectedSource', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PracticeSourceType } from '@/types'

type PracticeRange = '7d' | '30d' | 'all'
type PracticeSourceFilter = 'all' | PracticeSourceType

defineProps<{
  selectedRange: PracticeRange
  selectedSource: PracticeSourceFilter
}>()

defineEmits<{
  'update:selectedRange': [value: PracticeRange]
  'update:selectedSource': [value: PracticeSourceFilter]
}>()

const rangeOptions: Array<{ label: string; value: PracticeRange }> = [
  { label: '7 días', value: '7d' },
  { label: '30 días', value: '30d' },
  { label: 'Todo', value: 'all' },
]

const sourceOptions: Array<{ label: string; value: PracticeSourceFilter }> = [
  { label: 'Todas', value: 'all' },
  { label: 'Manual', value: PracticeSourceType.MANUAL },
  { label: 'Clase', value: PracticeSourceType.CLASS },
]
</script>
