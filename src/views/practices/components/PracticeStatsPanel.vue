<template>
  <section class="grid gap-4 animate__animated animate__fadeIn">
    <article class="overflow-hidden rounded-3xl p-4 text-white bg-gradient-to-br from-tertiary via-[#243f47] to-[#2e6775]">
      <p class="m-0 text-xs uppercase tracking-[0.08em] text-white/75">Minutos entrenados</p>
      <h2 class="m-0 mt-1 text-[2rem] leading-none font-bold">
        {{ loading ? '...' : stats?.totalDurationMinutes ?? 0 }}
      </h2>
      <p class="m-0 mt-2 text-[0.8rem] text-white/90">
        {{ loading ? 'Cargando progreso' : `Racha actual: ${stats?.currentStreakDays ?? 0} días` }}
      </p>
    </article>

    <div class="grid grid-cols-2 gap-3">
      <article class="rounded-2xl border border-tertiary/10 bg-white p-3">
        <p class="m-0 text-[0.72rem] uppercase tracking-[0.06em] text-tertiary/60">Prácticas</p>
        <h3 class="m-0 mt-1 text-[1.05rem] font-bold text-tertiary">{{ loading ? '--' : stats?.totalPractices ?? 0 }}</h3>
      </article>

      <article class="rounded-2xl border border-tertiary/10 bg-white p-3">
        <p class="m-0 text-[0.72rem] uppercase tracking-[0.06em] text-tertiary/60">Promedio</p>
        <h3 class="m-0 mt-1 text-[1.05rem] font-bold text-tertiary">{{ loading ? '--' : `${stats?.averageDurationMinutes ?? 0} min` }}</h3>
      </article>

      <article class="rounded-2xl border border-tertiary/10 bg-white p-3">
        <p class="m-0 text-[0.72rem] uppercase tracking-[0.06em] text-tertiary/60">Saques</p>
        <h3 class="m-0 mt-1 text-[1.05rem] font-bold text-tertiary">{{ loading ? '--' : stats?.servePractices ?? 0 }}</h3>
      </article>

      <article class="rounded-2xl border border-tertiary/10 bg-white p-3">
        <p class="m-0 text-[0.72rem] uppercase tracking-[0.06em] text-tertiary/60">Amistosos</p>
        <h3 class="m-0 mt-1 text-[1.05rem] font-bold text-tertiary">{{ loading ? '--' : stats?.friendlyMatchPractices ?? 0 }}</h3>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PracticeStats } from '@/types'

defineProps<{
  stats: PracticeStats | null
  loading: boolean
}>()
</script>
