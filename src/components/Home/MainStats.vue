<template>
  <section class="w-full grid grid-cols-2 gap-4 mt-4 px-4">
    <div class="flex flex-col items-center justify-center">
      <span class="text-tertiary leading-11 mb-4" :class="[
        { 'text-[6.8rem]': wins.toString().length === 2 },
        { 'text-[4rem]': wins.toString().length === 3 },
      ]">
        {{ countUpParsed }}
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
        <span class="text-tertiary text-[3rem] leading-10">
          {{ countUpGames }}
        </span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <span class="font-light text-sm uppercase text-center">
          Ace's
        </span>
        <span class="text-tertiary text-[3rem] leading-10">
          {{ countUpAces }}
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
import { computed, ref, onMounted } from 'vue';

const { wins, stats } = useApp();
const countUpWins = ref(0);
const countUpGames = ref(0);
const countUpAces = ref(0);

const startCountUpAnimation = () => {
  const interval = setInterval(() => {
    if (stats.value.wins > 20) {
      if (countUpWins.value < stats.value.wins - 10) {
        countUpWins.value += 7;
      } else {
        countUpWins.value++;
      }
    } else {
      countUpWins.value++;
    }
    
    const remainingNumbers = stats.value.wins - countUpWins.value;
    const speed = remainingNumbers > 5 ? 50 : 50 + ((5 - remainingNumbers) * 50);
    
    clearInterval(interval);
    
    if (countUpWins.value === stats.value.wins) return;
    
    setTimeout(() => {
      startCountUpAnimation();
    }, speed);
  }, 20);
}

const startCountUpGamesAnimation = () => {
  const interval = setInterval(() => {
    countUpGames.value++

    const remainingNumbers = stats.value.games - countUpGames.value;
    const speed = remainingNumbers > 5 ? 20 : 20 + ((5 - remainingNumbers) * 20);

    clearInterval(interval);

    if (countUpGames.value === stats.value.games) return;

    setTimeout(() => {
      startCountUpGamesAnimation();
    }, speed);
  }, 30);
}

const startCountUpAcesAnimation = () => {
  const interval = setInterval(() => {
    countUpAces.value++;

    const remainingNumbers = stats.value.aces - countUpAces.value;
    const speed = remainingNumbers > 5 ? 30 : 30 + ((5 - remainingNumbers) * 30);

    clearInterval(interval);

    if (countUpAces.value === stats.value.aces) return;

    setTimeout(() => {
      startCountUpAcesAnimation();
    }, speed);
  }, 30);
}

const countUpParsed = computed(() => {
  return countUpWins.value < 10 ? `0${countUpWins.value}` : `${countUpWins.value}`;
})

onMounted(() => {
  startCountUpAnimation();
  startCountUpGamesAnimation();
  startCountUpAcesAnimation();
})
</script>

<style lang="scss" scoped>

</style>