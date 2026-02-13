<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-primary">
      <ion-header class="bg-primary/80 h-20 shadow-none fixed" style="backdrop-filter: blur(10px);">
        <div
          class="flex h-full w-full flex-row items-center justify-between px-4"
        >
          <button class="custom-menu-button" @click="$router.back()">
            <icon-arrow-left class="text-tertiary" />
          </button>
  
          <ion-title class="font-light text-tertiary"> Canchas </ion-title>
        </div>
      </ion-header>
      <div
        v-if="!isAllLoading"
        class="flex flex-col items-center justify-center gap-y-4 px-6 pt-20"
      >
        <VenueCard v-for="venue in venues" :key="venue.id" :venue="venue" @click="$router.push(`/venues/${venue.id}`)" />
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content
            loading-spinner="circular"
          ></ion-infinite-scroll-content>
        </ion-infinite-scroll>
        <p v-if="!meta.hasMore" class="text-center text-secondary py-4 pb-16">
          No hay más canchas
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import VenueCard from './components/VenueCard.vue'
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/vue'
import { IconArrowLeft } from '@tabler/icons-vue'
import { useVenue } from '@/composables/useVenue'
import { computed, ref } from 'vue'
import { useGeolocation } from '@/composables/useGeolocation'
import { MetaPage } from '@/app/network/domain/interfaces'

const { venues, getNearbyVenues } = useVenue()
const { getCurrentPosition, loading } = useGeolocation()

const isAllLoading = computed(() => {
  return isLoading.value || loading.value
})

const showAllVenues = ref(false)
const meta = ref<MetaPage>({
  page: 1,
  hasMore: false,
})

const isLoading = ref(false)
const isErrorFetch = ref(false)
const fetchVenues = async () => {
  isErrorFetch.value = false
  isLoading.value = true
  const position = await getCurrentPosition()
  if (!position) return

  getNearbyVenues({
    lat: position.lat,
    lng: position.lng,
    radiusKm: 100,
    page: meta.value.page,
    all: showAllVenues.value,
  })
    .then((response) => {
      meta.value = response.meta || {}
    })
    .catch((error) => {
      console.log(error)
      isErrorFetch.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

const ionInfinite = async (event: InfiniteScrollCustomEvent) => {
  const target = event.target as HTMLIonInfiniteScrollElement

  if (!meta.value.hasMore) {
    target.disabled = true
    await target.complete()
    return
  }

  meta.value.page = (meta.value.page || 1) + 1

  try {
    await fetchVenues()
  } finally {
    await target.complete()
    if (!meta.value.hasMore) target.disabled = true
  }
}

fetchVenues()
</script>
