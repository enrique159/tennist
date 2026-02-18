<template>
  <fieldset class="text-tertiary flex flex-col">
    <label class="uppercase">Tipo de práctica</label>
    <div class="mt-3 grid grid-cols-2 gap-3">
      <button
        type="button"
        class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
        :class="
          modelValue === PracticeSourceType.MANUAL
            ? 'bg-tertiary text-white'
            : 'bg-tertiary/10 text-tertiary'
        "
        @click="$emit('update:modelValue', PracticeSourceType.MANUAL)"
      >
        Personal
      </button>

      <button
        type="button"
        class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
        :class="
          modelValue === PracticeSourceType.CLASS
            ? 'bg-tertiary text-white'
            : 'bg-tertiary/10 text-tertiary'
        "
        @click="$emit('update:modelValue', PracticeSourceType.CLASS)"
      >
        Clase
      </button>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { PracticeSourceType } from '@/types'

defineProps<{
  modelValue: PracticeSourceType
}>()

defineEmits<{
  'update:modelValue': [value: PracticeSourceType]
}>()
</script>
