<template>
  <ion-page ref="venuePageRef">
    <ion-content :force-overscroll="false" class="bg-primary">
      <ion-header
        class="bg-primary/80 h-20 shadow-none fixed"
        style="backdrop-filter: blur(10px)"
      >
        <div
          class="flex h-full w-full flex-row items-center justify-between px-4"
        >
          <button class="custom-menu-button" @click="$router.back()">
            <icon-arrow-left class="text-tertiary" />
          </button>

          <ion-title class="font-light text-tertiary"> Canchas </ion-title>

          <ion-button id="open-modal" expand="block" shape="round" size="large">
            <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
          </ion-button>
        </div>
      </ion-header>
      <div v-if="isAllLoading" class="h-fit w-full px-6 flex flex-col gap-y-4">
        <div class="skeleton h-[260px] w-full rounded-[2.8rem]"></div>
        <div class="skeleton h-[260px] w-full rounded-[2.8rem]"></div>
        <div class="skeleton h-[260px] w-full rounded-[2.8rem]"></div>
      </div>
      <div
        v-show="!isAllLoading"
        class="flex flex-col items-center justify-center gap-y-4 px-6 pt-20"
      >
        <input
          v-model="filters.search"
          type="text"
          placeholder="Buscar por nombre"
          class="w-full px-6 py-4 bg-tertiary/10 placeholder:text-tertiary/40 text-tertiary rounded-full outline-none animate__animated animate__fadeIn"
          @keyup.enter="fetchVenues"
        />
        <!-- VENUES -->
        <VenueCard
          v-for="venue in venues"
          :key="venue.id"
          :venue="venue"
          @click="$router.push(`/venues/${venue.id}`)"
        />
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content
            loading-spinner="circular"
          ></ion-infinite-scroll-content>
        </ion-infinite-scroll>
        <p v-if="!meta.hasMore" class="text-center text-secondary py-4 pb-16">
          No hay más canchas
        </p>
      </div>

      <ion-modal
        ref="venueFiltersDialog"
        trigger="open-modal"
        :presenting-element="presentingElementFilters"
      >
        <ion-content class="bg-primary" :force-overscroll="false">
          <ion-header>
            <ion-toolbar>
              <ion-title class="text-tertiary">Filtrar por</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="dismiss()">
                  <IconX class="text-secondary" />
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <div class="w-full custom-filter-height px-4">
            <VenueFilters
              ref="venueFiltersRef"
              :filters="filters"
              @update:filters="handleUpdateFilters"
            />
          </div>
        </ion-content>
      </ion-modal>
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
  IonModal,
  IonButton,
  IonButtons,
  IonToolbar,
  IonIcon,
} from '@ionic/vue'
import { IconArrowLeft, IconX } from '@tabler/icons-vue'
import { useVenue } from '@/composables/useVenue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useGeolocation } from '@/composables/useGeolocation'
import { MetaPage } from '@/app/network/domain/interfaces'
import { filterOutline } from 'ionicons/icons'
import VenueFilters from './components/VenueFilters.vue'
import { FindNearbyVenuesParams } from '@/types'

const { venues, getNearbyVenues } = useVenue()
const { location, getCurrentPosition, loading } = useGeolocation()

const isAllLoading = computed(() => {
  return isLoading.value || loading.value
})

const filters = reactive<FindNearbyVenuesParams>({
  search: '',
  lat: 0,
  lng: 0,
  radiusKm: 10,
  all: false,
  type: undefined,
})
const meta = ref<MetaPage>({
  page: 1,
  hasMore: false,
})

const isLoading = ref(false)
const isErrorFetch = ref(false)
const fetchVenues = async () => {
  isErrorFetch.value = false
  isLoading.value = true

  filters.lat = location.value?.lat || 0
  filters.lng = location.value?.lng || 0

  getNearbyVenues({
    search: filters.search,
    lat: filters.lat,
    lng: filters.lng,
    radiusKm: filters.radiusKm,
    page: meta.value.page,
    all: filters.all,
    type: filters.type,
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

onMounted(async () => {
  await getCurrentPosition()
  fetchVenues()
})

const presentingElementFilters = ref(null)
const venueFiltersDialog = ref()
const venuePageRef = ref()

const dismiss = () => {
  venueFiltersDialog.value.$el.dismiss()
}

onMounted(() => {
  presentingElementFilters.value = venuePageRef.value.$el
})

const venueFiltersRef = ref()
watch(venueFiltersRef, () => {
  if (venueFiltersRef.value) {
    venueFiltersRef.value.copyFilters()
  }
})

const handleUpdateFilters = (newValues: FindNearbyVenuesParams) => {
  filters.lat = newValues.lat
  filters.lng = newValues.lng
  filters.radiusKm = newValues.radiusKm
  filters.all = newValues.all
  filters.type = newValues.type
  meta.value.page = 1

  // Close modal
  dismiss()

  // Fetch venues with new filters
  fetchVenues()
}
</script>

<style lang="scss" scoped>
ion-button {
  --background: rgba(0, 0, 0, 0.1);
  --background-activated: rgba(0, 0, 0, 0.2);

  --color: #1a2529;
}

.custom-filter-height {
  height: calc(100% - 110px);
  padding-bottom: calc(env(safe-area-inset-top) + 1.8rem);
}
</style>
