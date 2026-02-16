<template>
  <div class="w-full h-full py-4 flex flex-col justify-between">
    <!-- FILTERS -->
    <div>
      <!-- NEARBY OR ALL -->
      <p class="text-sm text-gray-600 mb-2">Mostrando:</p>
      <div class="flex gap-2 mb-8">
        <button
          class="rounded-full py-2 px-4"
          :class="
            !currentFilters.all
              ? 'bg-tertiary text-primary'
              : 'bg-tertiary/10 text-tertiary'
          "
          @click="currentFilters.all = false"
        >
          Cerca de mí
        </button>
        <button
          class="rounded-full py-2 px-4"
          :class="
            currentFilters.all
              ? 'bg-tertiary text-primary'
              : 'bg-tertiary/10 text-tertiary'
          "
          @click="currentFilters.all = true"
        >
          Todas
        </button>
      </div>

      <!-- NEARBY OR ALL -->
      <p class="text-sm text-gray-600 mb-2">Por tipo:</p>
      <div class="flex gap-2 mb-8">
        <button
          class="rounded-full py-2 px-4"
          :class="
            !currentFilters.type
              ? 'bg-tertiary text-primary'
              : 'bg-tertiary/10 text-tertiary'
          "
          @click="currentFilters.type = undefined"
        >
          Todas
        </button>
        <button
          class="rounded-full py-2 px-4"
          :class="
            currentFilters.type === 'PUBLIC'
              ? 'bg-tertiary text-primary'
              : 'bg-tertiary/10 text-tertiary'
          "
          @click="currentFilters.type = 'PUBLIC'"
        >
          Públicas
        </button>
        <button
          class="rounded-full py-2 px-4"
          :class="
            currentFilters.type === 'PRIVATE'
              ? 'bg-tertiary text-primary'
              : 'bg-tertiary/10 text-tertiary'
          "
          @click="currentFilters.type = 'PRIVATE'"
        >
          Privadas
        </button>
      </div>

      <!-- NEARBY OR ALL -->
      <p class="text-sm text-gray-600 mb-2">Por distancia:</p>
      <div class="flex gap-2 mb-8">
        <button
          v-for="km in [10, 25, 50, 100]"
          :key="`btn-km-${km}`"
          class="rounded-full py-2 px-4"
          :class="
            currentFilters.radiusKm === km
              ? 'bg-tertiary text-primary'
              : 'bg-tertiary/10 text-tertiary'
          "
          @click="currentFilters.radiusKm = km"
        >
          {{ km }} km
        </button>
      </div>
    </div>

    <button
      class="bg-tertiary text-primary rounded-full py-3 px-6"
      @click="emit('update:filters', currentFilters)"
    >
      Aplicar
    </button>
  </div>
</template>

<script setup lang="ts">
import { FindNearbyVenuesParams } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  filters: FindNearbyVenuesParams
}>()

const currentFilters = ref<FindNearbyVenuesParams>({ ...props.filters })

const emit = defineEmits<{
  'update:filters': [filters: FindNearbyVenuesParams]
}>()

const copyFilters = () => {
  currentFilters.value = { ...props.filters }
}

defineExpose({
  copyFilters,
})
</script>
