<template>
  <ion-page>
    <ion-content :force-overscroll='false' class="bg-primary">
      <ion-header class="bg-primary/80 h-20 shadow-none" style="backdrop-filter: blur(10px);">
        <div
          class="flex h-full w-full flex-row items-center justify-between px-4"
        >
          <button class="custom-menu-button" @click="$router.back()">
            <icon-arrow-left class="text-tertiary" />
          </button>
  
          <ion-title class="font-light text-tertiary"> {{ currentVenue?.name }} </ion-title>
        </div>
      </ion-header>
      <main class="pt-4 pb-8">
        <section
          v-if="venueImages.length > 0"
          ref="carouselRef"
          class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 gap-4"
          @scroll="onInlineCarouselScroll"
        >
          <button
            v-for="(image, index) in venueImages"
            :key="image.id"
            class="snap-center shrink-0 w-[calc(100vw-2rem)] h-[280px] rounded-3xl overflow-hidden bg-black/10"
            @click="openGallery(index)"
          >
            <img
              :src="image.imageUrl"
              :alt="`Imagen ${index + 1} de ${currentVenue?.name || 'venue'}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        </section>

        <section v-else class="px-4">
          <div class="w-full h-[280px] rounded-3xl bg-black/10 flex items-center justify-center text-tertiary/70">
            No hay imágenes disponibles
          </div>
        </section>

        <div v-if="venueImages.length > 1" class="flex justify-center gap-2 mt-4">
          <button
            v-for="(_, index) in venueImages"
            :key="`dot-${index}`"
            class="h-2.5 rounded-full transition-all duration-200"
            :class="index === inlineIndex ? 'w-6 bg-tertiary' : 'w-2.5 bg-tertiary/40'"
            @click="scrollInlineTo(index)"
            :aria-label="`Ir a imagen ${index + 1}`"
          />
        </div>

        <div class="px-4 mt-8">
          <h2 class="text-2xl text-tertiary font-bold pl-4">{{ currentVenue?.name }}</h2>
          <p class="text-tertiary/70 pl-4 mb-8">{{ currentVenue?.description }}</p>

          <div class="bg-tertiary rounded-full w-full h-fit p-2 flex items-center gap-2">
            <div class="h-12 w-12 min-w-12 bg-primary text-tertiary grid place-items-center rounded-full">
              <icon-map-pin />
            </div>
            <p class="text-white text-sm">{{ currentVenue?.address }}</p>
          </div>
        </div>
      </main>

      <transition name="lightbox-fade">
        <div
          v-if="isGalleryOpen"
          class="fixed inset-0 z-[1200] bg-black"
        >
          <div class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 text-white">
            <button class="custom-menu-button bg-white/10" @click="closeGallery" aria-label="Cerrar galería">
              <icon-arrow-left class="text-white" />
            </button>
            <span class="text-sm font-medium">{{ galleryIndex + 1 }} / {{ venueImages.length }}</span>
            <button class="custom-menu-button bg-white/10" @click="closeGallery" aria-label="Cerrar galería">
              <IconX class="text-white" />
            </button>
          </div>

          <div
            ref="galleryRef"
            class="lightbox-panel h-full w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            @scroll="onGalleryScroll"
          >
            <div
              v-for="(image, index) in venueImages"
              :key="`gallery-${image.id}`"
              class="w-screen h-full shrink-0 snap-center flex items-center justify-center overflow-hidden"
            >
              <div
                class="w-full h-full flex items-center justify-center"
                @pointerdown="onPointerDown($event, index)"
                @pointermove="onPointerMove($event, index)"
                @pointerup="onPointerUp($event, index)"
                @pointercancel="onPointerUp($event, index)"
                @pointerleave="onPointerUp($event, index)"
              >
                <img
                  :src="image.imageUrl"
                  :alt="`Imagen ${index + 1} de ${currentVenue?.name || 'venue'}`"
                  class="gallery-image"
                  :style="imageTransform(index)"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonTitle } from '@ionic/vue';
import { useVenue } from '@/composables/useVenue';
import { IconX, IconMapPin } from '@tabler/icons-vue';
import { computed, nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { venues } = useVenue();
const carouselRef = ref<HTMLElement | null>(null);
const galleryRef = ref<HTMLElement | null>(null);
const inlineIndex = ref(0);
const galleryIndex = ref(0);
const isGalleryOpen = ref(false);

const pointers = new Map<number, { x: number; y: number }>();
const pointerStart = new Map<number, { x: number; y: number; moved: boolean }>();
const imageStates = ref<Record<number, { scale: number; x: number; y: number }>>({});
const pinchState = ref<{ startDistance: number; startScale: number } | null>(null);
const lastTap = ref<{ time: number; index: number; x: number; y: number } | null>(null);

const currentVenue = computed(() => {
  const venueId = route.params.id;
  return venues.value.find((venue) => venue.id === String(venueId));
});

const venueImages = computed(() => currentVenue.value?.images ?? []);

const getImageState = (index: number) => {
  if (!imageStates.value[index]) {
    imageStates.value[index] = { scale: 1, x: 0, y: 0 };
  }
  return imageStates.value[index];
};

const imageTransform = (index: number) => {
  const state = getImageState(index);
  return {
    transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
    touchAction: state.scale > 1 ? 'none' : 'pan-x pan-y',
  };
};

const distanceBetweenPointers = () => {
  const values = Array.from(pointers.values());
  if (values.length < 2) return 0;
  const [p1, p2] = values;
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
};

const onPointerDown = (event: PointerEvent, index: number) => {
  if (index !== galleryIndex.value) return;
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  pointerStart.set(event.pointerId, { x: event.clientX, y: event.clientY, moved: false });
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);

  if (pointers.size === 2) {
    const state = getImageState(index);
    pinchState.value = {
      startDistance: distanceBetweenPointers(),
      startScale: state.scale,
    };
  }
};

const onPointerMove = (event: PointerEvent, index: number) => {
  if (index !== galleryIndex.value) return;
  if (!pointers.has(event.pointerId)) return;

  const previous = pointers.get(event.pointerId);
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  const start = pointerStart.get(event.pointerId);
  if (start) {
    const movedDistance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (movedDistance > 8) {
      start.moved = true;
      pointerStart.set(event.pointerId, start);
    }
  }
  const state = getImageState(index);

  if (pointers.size >= 2 && pinchState.value) {
    const currentDistance = distanceBetweenPointers();
    const ratio = currentDistance / pinchState.value.startDistance;
    const nextScale = Math.min(4, Math.max(1, pinchState.value.startScale * ratio));
    state.scale = nextScale;
    return;
  }

  if (pointers.size === 1 && state.scale > 1 && previous) {
    state.x += event.clientX - previous.x;
    state.y += event.clientY - previous.y;
  }
};

const onPointerUp = (event: PointerEvent, index: number) => {
  const start = pointerStart.get(event.pointerId);
  const hadOnePointer = pointers.size === 1;
  const isTap = !!start && !start.moved;

  if (isTap && hadOnePointer) {
    const now = Date.now();
    const tapX = event.clientX;
    const tapY = event.clientY;

    if (
      lastTap.value &&
      lastTap.value.index === index &&
      now - lastTap.value.time <= 280 &&
      Math.hypot(tapX - lastTap.value.x, tapY - lastTap.value.y) < 30
    ) {
      const state = getImageState(index);
      if (state.scale > 1) {
        state.scale = 1;
        state.x = 0;
        state.y = 0;
      } else {
        state.scale = 2.5;
        state.x = 0;
        state.y = 0;
      }
      lastTap.value = null;
    } else {
      lastTap.value = { time: now, index, x: tapX, y: tapY };
    }
  }

  pointers.delete(event.pointerId);
  pointerStart.delete(event.pointerId);
  if (pointers.size < 2) {
    pinchState.value = null;
  }

  const state = getImageState(index);
  if (state.scale <= 1.01) {
    state.scale = 1;
    state.x = 0;
    state.y = 0;
  }
};

const onInlineCarouselScroll = () => {
  if (!carouselRef.value) return;
  const width = carouselRef.value.clientWidth;
  if (!width) return;
  inlineIndex.value = Math.round(carouselRef.value.scrollLeft / (width - 16));
};

const onGalleryScroll = () => {
  if (!galleryRef.value) return;
  const width = galleryRef.value.clientWidth;
  if (!width) return;
  galleryIndex.value = Math.round(galleryRef.value.scrollLeft / width);
};

const scrollInlineTo = (index: number) => {
  if (!carouselRef.value) return;
  const cardWidth = carouselRef.value.clientWidth - 16;
  carouselRef.value.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
};

const openGallery = async (index: number) => {
  galleryIndex.value = index;
  isGalleryOpen.value = true;
  await nextTick();
  if (galleryRef.value) {
    galleryRef.value.scrollTo({ left: galleryRef.value.clientWidth * index, behavior: 'auto' });
  }
};

const closeGallery = () => {
  isGalleryOpen.value = false;
  pointers.clear();
  pointerStart.clear();
  pinchState.value = null;
  lastTap.value = null;
  imageStates.value = {};
};
</script>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  will-change: transform;
  transition: transform 120ms ease-out;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 220ms ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-fade-enter-active .lightbox-panel,
.lightbox-fade-leave-active .lightbox-panel {
  transition: transform 260ms ease, opacity 260ms ease;
}

.lightbox-fade-enter-from .lightbox-panel,
.lightbox-fade-leave-to .lightbox-panel {
  transform: scale(0.96);
  opacity: 0.6;
}
</style>