<template>
  <div class="w-full h-6 flex items-center text-secondary text-sm">
    <span>{{ text || '' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string | undefined
}>()
</script>

<style lang="scss" scoped>

</style>