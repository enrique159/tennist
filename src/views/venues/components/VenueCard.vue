<template>
  <div
    class="bg-tertiary rounded-[2.6rem] w-full h-fit min-h-[320px] animate__animated animate__fadeInUp"
  >
    <img
      v-if="venue.images && venue.images.length > 0"
      :src="venue.images[0].imageUrl"
      class="rounded-[2.6rem] w-full object-cover h-[180px]"
    />
    <img
      v-else
      src="@/assets/court_default_image.svg"
      class="rounded-[2.6rem] w-full object-cover h-[180px]"
      alt=""
    />

    <div class="flex flex-col items-start justify-start gap-1 p-5 mb-4">
      <div class="flex justify-between items-center w-full">
        <span class="text-xs text-gray-300 font-light"
          >CANCHAS {{ venue.type === 'PUBLIC' ? 'PÚBLICAS' : 'PRIVADAS' }}</span
        >
        <span
          class="text-sm text-complementary1 font-semibold flex items-center gap-2 mt-1"
        >
          <IconLocationFilled size="13" />
          {{ venue.distance }} Km
        </span>
      </div>
      <h3 class="text-lg font-semibold text-primary uppercase">
        {{ venue.name }}
      </h3>
      <p class="text-sm text-gray-300">{{ venue.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Venue } from '@/types'
import { IconLocationFilled } from '@tabler/icons-vue';

defineProps<{
  venue: Venue
}>()
</script>
