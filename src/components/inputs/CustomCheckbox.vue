<template>
  <div
    :class="[
      'w-6 h-6 aspect-square rounded-md border-2 border-primary outline outline-2 outline-tertiary grid place-items-center transition active:scale-95',
      checked ? 'bg-tertiary' : 'bg-primary',
    ]"
    @click="toggleCheckbox"
  >
    <icon-check v-if="checked" class="text-primary" :size="12" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props =defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const toggleCheckbox = () => {
  checked.value = !checked.value
}

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})
</script>

<style lang="scss" scoped>

</style>