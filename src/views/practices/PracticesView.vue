<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-primary">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content />
      </ion-refresher>

      <header
        class="sticky top-0 z-20 flex justify-between items-center gap-3 bg-primary/85 px-4 pb-3"
        :style="{ paddingTop: 'calc(env(safe-area-inset-top) + 0.6rem)', backdropFilter: 'blur(10px)' }"
      >
        <button class="custom-menu-button" @click="$router.back()">
          <IconArrowLeft class="text-tertiary" />
        </button>

        <ion-title class="font-light text-tertiary"> Prácticas </ion-title>
      </header>

      <main class="grid gap-4 px-4 pb-8 pt-2">
        <PracticeStatsPanel
          class="animate__animated animate__fadeInUp animate__fast"
          :style="{ animationDelay: '0.05s', animationFillMode: 'both' }"
          :stats="practiceStats"
          :loading="isLoading"
        />

        <PracticeFilters
          class="animate__animated animate__fadeInUp animate__fast"
          :style="{ animationDelay: '0.12s', animationFillMode: 'both' }"
          v-model:selectedRange="selectedRange"
          v-model:selectedSource="selectedSource"
        />

        <section
          class="grid gap-3 animate__animated animate__fadeInUp animate__fast"
          :style="{ animationDelay: '0.19s', animationFillMode: 'both' }"
        >
          <div class="flex items-center justify-between">
            <h2 class="m-0 text-base text-tertiary">Historial</h2>
            <p class="m-0 text-[0.82rem] text-tertiary/65">{{ practices.length }} registros</p>
          </div>

          <div v-if="isLoading" class="grid gap-3">
            <div class="h-28 rounded-2xl bg-tertiary/10 animate-pulse"></div>
            <div class="h-28 rounded-2xl bg-tertiary/10 animate-pulse"></div>
            <div class="h-28 rounded-2xl bg-tertiary/10 animate-pulse"></div>
          </div>

          <div v-else-if="practices.length === 0" class="grid justify-items-center gap-2 rounded-2xl border border-tertiary/10 bg-white p-5 text-center">
            <IconBallTennis class="h-7 w-7 text-tertiary/50" />
            <h3 class="m-0 text-[0.95rem] text-tertiary">No hay prácticas en este filtro</h3>
            <p class="m-0 text-[0.82rem] text-tertiary/70">Cambia el rango o registra una nueva práctica para comenzar a ver tu progreso.</p>
          </div>

          <div v-else class="grid gap-3">
            <PracticeCard
              v-for="practice in practices"
              :key="practice.id"
              :practice="practice"
            />
          </div>
        </section>
      </main>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="$router.push('/practices/create')">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  RefresherCustomEvent,
} from '@ionic/vue'
import { IconArrowLeft, IconBallTennis } from '@tabler/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { usePractice } from '@/composables/usePractice'
import { FindPracticesParams, PracticeSourceType } from '@/types'
import PracticeCard from './components/PracticeCard.vue'
import PracticeFilters from './components/PracticeFilters.vue'
import PracticeStatsPanel from './components/PracticeStatsPanel.vue'
import { add } from 'ionicons/icons'

type PracticeRange = '7d' | '30d' | 'all'
type PracticeSourceFilter = 'all' | PracticeSourceType

const { practices, practiceStats, getMyPractices, getMyPracticeStats } = usePractice()

const isLoading = ref(false)
const selectedRange = ref<PracticeRange>('30d')
const selectedSource = ref<PracticeSourceFilter>('all')

const buildParams = (): FindPracticesParams => {
  const params: FindPracticesParams = {}
  const now = new Date()

  if (selectedRange.value === '7d' || selectedRange.value === '30d') {
    const daysToSubtract = selectedRange.value === '7d' ? 6 : 29
    const fromDate = new Date(now)
    fromDate.setDate(now.getDate() - daysToSubtract)

    params.fromDate = toDateString(fromDate)
    params.toDate = toDateString(now)
  }

  if (selectedSource.value !== 'all') {
    params.sourceType = selectedSource.value
  }

  return params
}

const toDateString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fetchPractices = async () => {
  isLoading.value = true
  const params = buildParams()

  await Promise.all([
    getMyPractices(params),
    getMyPracticeStats(params),
  ]).finally(() => {
    isLoading.value = false
  })
}

const handleRefresh = async (event: RefresherCustomEvent) => {
  await fetchPractices()
  event.target.complete()
}

watch([selectedRange, selectedSource], () => {
  fetchPractices()
})

onMounted(() => {
  fetchPractices()
})
</script>

<style lang="scss" scoped>
ion-fab {
  margin-right: 1rem;
  margin-bottom: calc(env(safe-area-inset-bottom) + 1rem);
}
ion-fab-button {
    --background: #1A2529;
    --background-activated: #1a2029;
    --color: white;
  }
</style>
