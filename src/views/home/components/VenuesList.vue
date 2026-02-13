<template>
  <div
    v-if="isAllLoading"
    class="w-full overflow-x-hidden h-fit flex gap-4 py-8 pl-6 animate__animated animate__fadeIn"
  >
    <skeleton-badge
      v-for="skeleton in 3"
      :key="`skeleton-${skeleton}`"
      custom="h-[120px] min-w-[280px]"
    />
  </div>
  <div
    v-else-if="venues.length > 0"
    class="w-full overflow-x-auto h-fit flex items-center gap-4 py-8 px-6"
  >
    <div
      v-for="venue in venues"
      :key="venue.id"
      class="flex-shrink-0 bg-tertiary rounded-full p-2 w-[280px] h-[120px] animate__animated animate__fadeInLeft"
    >
      <div
        class="bg-white w-full h-full rounded-full flex items-center justify-start"
      >
        <img
          v-if="venue.images && venue.images.length > 0"
          :src="venue.images[0].imageUrl"
          class="rounded-full aspect-square object-cover h-full"
        />
        <img
          v-else
          src="@/assets/court_default_image.svg"
          class="rounded-full aspect-square object-cover h-full"
          alt=""
        />

        <!-- INFO -->
        <div class="ml-4">
          <h6 class="font-light text-gray-600">
            CANCHAS {{ venue.type === 'PUBLIC' ? 'PÚB.' : 'PRIV.' }}
          </h6>
          <h3 class="text-lg font-bold uppercase">
            {{ venue.name.split(' ').slice(0, 1).join(' ') }}
          </h3>
          <span
            class="text-sm text-complementary2 font-semibold flex items-center gap-2 mt-1"
          >
            <IconLocationFilled size="13" />
            {{ venue.distance }} Km
          </span>
        </div>
      </div>
    </div>

    <button
      class="flex-shrink-0 bg-black/10 active:bg-black/20 active:scale-95 ease-out duration-200 transition-all rounded-full p-2 w-20 h-20 aspect-square flex items-center justify-center relative"
    >
      <IconArrowRight size="24" />
      <span class="absolute -bottom-6 text-complementary2 text-sm"
        >Ver más</span
      >
    </button>
  </div>
  <div
    v-else-if="isErrorFetch"
    class="w-full h-20 flex items-center justify-center"
  >
    <p class="text-red-500">Error al cargar los venues</p>
  </div>
</template>

<script setup lang="ts">
import useGeolocation from '@/composables/useGeolocation'
import useVenue from '@/composables/useVenue'
import { IconLocationFilled, IconArrowRight } from '@tabler/icons-vue'
import { computed, ref } from 'vue'

const { venues, getNearbyVenues } = useVenue()
const { getCurrentPosition, loading } = useGeolocation()

const isAllLoading = computed(() => {
  return isLoading.value || loading.value
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
    page: 1,
  })
    .catch((error) => {
      console.log(error)
      isErrorFetch.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

fetchVenues()
</script>
