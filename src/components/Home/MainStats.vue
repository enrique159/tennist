<template>
  <section class="w-full grid grid-cols-2 gap-4 mt-4 px-4">
    <div class="flex flex-col items-center justify-center">
      <span class="font-bold text-tertiary leading-11 mb-4" :class="[
        { 'text-[5rem]': wins.toString().length === 2 },
        { 'text-[4rem]': wins.toString().length === 3 },
      ]">
        {{ wins }}
      </span>
      <span class="font-light text-sm uppercase">
        Partidas ganadas
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2 items-start justify-center">
      <div class="flex flex-col items-center justify-center">
        <span class="font-light text-sm uppercase text-center">
          Juegos
        </span>
        <span class="font-bold text-tertiary text-4xl">
          {{ stats.games }}
        </span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <span class="font-light text-sm uppercase text-center">
          Ace's
        </span>
        <span class="font-bold text-tertiary text-4xl">
          {{ stats.aces }}
        </span>
      </div>

      <button class="bg-black/10 rounded-full w-full pl-4 pr-3 py-3 col-span-2 text-complementary2 text-sm flex items-center justify-between active:bg-complementary2/20">
        ver mas stats.
        <icon-arrow-right class="ml-2 text-tertiary/50" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp';

const { wins, stats } = useApp();
</script>

<style lang="scss" scoped>

</style>