<template>
  <button
    class="rounded-full h-12 aspect-square flex items-center justify-center transition-all"
    :class="[
      `${className}`,
      !light ? 'bg-tertiary/10 active:bg-tertiary/20 text-complementary2' : 'bg-white/10 active:bg-white/20 text-primary',
    ]"
  >
    <slot>
      <icon-arrow-right />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@tabler/icons-vue';
defineProps({
  light: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped></style>
