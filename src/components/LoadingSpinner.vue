<template>
  <div :class="className">
    <icon-loader2 class="spin" :size="size" />
  </div>
</template>

<script setup lang="ts">
import { IconLoader2 } from '@tabler/icons-vue'

defineProps({
  className: {
    type: String,
    default: 'text-tertiary',
  },
  size: {
    type: Number,
    default: 24,
  }
})
</script>

<style lang="scss" scoped>
.spin {
  animation: spin 500ms linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>