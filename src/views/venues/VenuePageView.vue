<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-primary">
      <ion-header
        class="bg-primary/80 h-20 shadow-none"
        style="backdrop-filter: blur(10px)"
      >
        <div
          class="flex h-full w-full flex-row items-center justify-between px-4"
        >
          <button class="custom-menu-button" @click="$router.back()">
            <icon-arrow-left class="text-tertiary" />
          </button>

          <ion-title class="font-light text-tertiary">
            {{ currentVenue?.name }}
          </ion-title>
        </div>
      </ion-header>
      <main class="pt-4 pb-8">
        <VenueImagesGallery
          :images="currentVenue?.images || []"
          :venue-name="currentVenue?.name || ''"
        />

        <div class="px-4 mt-8">
          <div class="flex justify-between items-center w-full px-3 mb-4">
            <span class="text-xs text-complementary2 font-light py-2 px-3 rounded-full border border-complementary2"
              >CANCHAS {{ currentVenue?.type === 'PUBLIC' ? 'PÚBLICAS' : 'PRIVADAS' }}</span
            >
            <span
              class="text-sm text-complementary2 font-semibold flex items-center gap-2 mt-1"
            >
              <IconLocationFilled size="13" />
              {{ currentVenue?.distance }} Km
            </span>
          </div>
          <h2 class="text-2xl text-tertiary font-bold pl-4">
            {{ currentVenue?.name }}
          </h2>
          <p class="text-tertiary/70 pl-4 mb-8">
            {{ currentVenue?.description }}
          </p>

          <div
            class="bg-tertiary rounded-full w-full h-fit p-2 flex items-center gap-2"
            @click="openMap"
          >
            <div
              class="h-12 w-12 min-w-12 bg-primary text-tertiary grid place-items-center rounded-full"
            >
              <icon-map-pin />
            </div>
            <p class="text-white text-sm">{{ currentVenue?.address }}</p>
          </div>
        </div>
      </main>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonTitle } from '@ionic/vue'
import { useVenue } from '@/composables/useVenue'
import { IconMapPin } from '@tabler/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { generateLocationLink } from '@/utils/generateLocationLink'
import VenueImagesGallery from './components/VenueImagesGallery.vue'

const openMap = () => {
  if (!currentVenue.value) return
  const url = generateLocationLink(
    Number(currentVenue.value.lat),
    Number(currentVenue.value.lng),
    currentVenue.value.name,
  )
  window.open(url, '_blank')
}

const route = useRoute()
const { venues } = useVenue()

const currentVenue = computed(() => {
  const venueId = route.params.id
  return venues.value.find((venue) => venue.id === String(venueId))
})
</script>
