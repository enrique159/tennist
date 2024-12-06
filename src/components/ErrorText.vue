<template>
  <div class="w-full min-h-6 h-fit flex items-center text-secondary text-sm">
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