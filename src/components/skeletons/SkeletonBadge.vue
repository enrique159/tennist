<template>
  <div :class="['skeleton rounded-full', custom]">
  </div>
</template>

<script setup lang="ts">
defineProps({
  custom: {
    type: String,
    default: 'h-[60px] w-[120px]'
  }
})
</script>