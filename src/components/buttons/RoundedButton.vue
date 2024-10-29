<template>
  <div class="rounded-full w-full h-16 text-lg font-boldpy-3 active:scale-95 transition-all" :class="`${className}`">
    <slot v-if="custom">
    </slot>
    <div v-else class="w-full h-full flex items-center justify-between pl-8 pr-3 py-3">
      <span>
        {{ text }}
      </span>
      <slot name="append-icon">
        <div class="rounded-full bg-primary h-full aspect-square flex items-center justify-center">
          <icon-arrow-right class="text-tertiary" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@tabler/icons-vue';
defineProps({
  className: {
    type: String,
    default: 'bg-tertiary text-white',
  },
  text: {
    type: String,
    default: '',
  },
  custom: {
    type: Boolean,
    default: false,
  }
})
</script>

<style lang="scss" scoped>

</style>