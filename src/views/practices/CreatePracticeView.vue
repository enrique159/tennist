<template>
  <ion-page>
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
          Registrar práctica
        </ion-title>
      </div>
    </ion-header>
    <ion-content :force-overscroll="false" class="bg-primary">
      <div class="h-full w-full flex flex-col items-center justify-between">
        <section
          class="w-full h-fit p-4 pb-8 animate__animated animate__fadeInUp"
        >
          <form
            class="w-full flex flex-col gap-5 px-5"
            @submit.prevent="handleSubmit"
          >
            <PracticeTypeSelector v-model="form.sourceType" />

            <fieldset class="text-tertiary flex flex-col required">
              <label class="uppercase font-semibold">Fecha</label>
              <!-- <input
                v-model="form.practiceDate"
                type="date"
                class="border-b border-tertiary bg-transparent px-2 py-3 text-lg focus:outline-none"
              /> -->
              <ion-datetime-button class="practice-date-btn" datetime="date-input"></ion-datetime-button>
            </fieldset>

            <fieldset class="text-tertiary flex flex-col required">
              <label class="uppercase font-semibold">Duración (min)</label>
              <input
                v-model.number="form.durationMinutes"
                type="number"
                min="1"
                max="600"
                class="border-b border-tertiary bg-transparent px-2 py-3 text-lg focus:outline-none"
              />
            </fieldset>

            <fieldset class="text-tertiary flex flex-col">
              <label class="uppercase font-semibold">Venue ID (opcional)</label>
              <input
                v-model="form.venueId"
                type="text"
                class="border-b border-tertiary/50 bg-transparent px-2 py-3 text-lg focus:outline-none"
                placeholder="UUID del venue"
              />
            </fieldset>

            <fieldset
              v-if="form.sourceType === PracticeSourceType.CLASS"
              class="text-tertiary flex flex-col required"
            >
              <label class="uppercase font-semibold">Class session ID</label>
              <input
                v-model="form.classSessionId"
                type="text"
                class="border-b border-tertiary bg-transparent px-2 py-3 text-lg focus:outline-none"
                placeholder="UUID de la clase"
              />
            </fieldset>

            <fieldset
              v-if="form.sourceType === PracticeSourceType.CLASS"
              class="text-tertiary flex flex-col"
            >
              <label class="uppercase font-semibold">Asistencia</label>
              <select
                v-model="form.classAttended"
                class="border-b border-tertiary bg-transparent px-2 py-3 text-lg focus:outline-none"
              >
                <option :value="true">Asistí a la clase</option>
                <option :value="false">No asistí</option>
              </select>
            </fieldset>

            <fieldset class="text-tertiary flex flex-col">
              <label class="uppercase font-semibold">Notas (opcional)</label>
              <textarea
                v-model="form.notes"
                rows="3"
                class="border-b border-tertiary/50 bg-transparent px-2 py-3 text-lg focus:outline-none"
                placeholder="Ej. Trabajé consistencia de segundo saque"
              />
            </fieldset>

            <fieldset
              class="text-tertiary flex items-center justify-between gap-3"
            >
              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-semibold border transition-colors"
                :class="
                  form.playedFriendlyMatch
                    ? 'bg-tertiary text-white border-tertiary'
                    : 'bg-transparent text-tertiary border-tertiary/30'
                "
                @click="form.playedFriendlyMatch = !form.playedFriendlyMatch"
              >
                {{ form.playedFriendlyMatch ? 'Con amistoso' : 'Sin amistoso' }}
              </button>

              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-semibold border transition-colors"
                :class="
                  form.practicedServes
                    ? 'bg-tertiary text-white border-tertiary'
                    : 'bg-transparent text-tertiary border-tertiary/30'
                "
                @click="form.practicedServes = !form.practicedServes"
              >
                {{ form.practicedServes ? 'Con saques' : 'Sin saques' }}
              </button>
            </fieldset>

            <button
              type="submit"
              class="rounded-full bg-tertiary text-white h-14 px-6 text-lg font-bold flex items-center justify-between active:scale-95 transition-all"
              :disabled="isSubmitting"
              :class="{ 'opacity-70': isSubmitting }"
            >
              <span>{{
                isSubmitting ? 'Guardando...' : 'Guardar práctica'
              }}</span>
              <span
                class="rounded-full bg-primary h-10 w-10 flex items-center justify-center text-tertiary"
              >
                <IconDeviceFloppy class="h-5 w-5" />
              </span>
            </button>
          </form>
        </section>
      </div>
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime
          id="date-input"
          v-model="form.practiceDate"
          locale="es-ES"
          presentation="date"
          prefer-wheel
          :max="currentDate"
        ></ion-datetime>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonTitle,
  IonHeader,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  useIonRouter,
} from '@ionic/vue'
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-vue'
import { computed, reactive, ref } from 'vue'
import { usePractice } from '@/composables/usePractice'
import { useToast } from '@/composables/useToast'
import { CreatePracticePayload, PracticeSourceType } from '@/types'
import PracticeTypeSelector from './components/PracticeTypeSelector.vue'

const ionRouter = useIonRouter()
const { createPractice } = usePractice()
const { successToast, errorToast } = useToast()

const currentDate = computed(() => {
  return new Date().toISOString().slice(0, 10)
})

const form = reactive<CreatePracticePayload>({
  practiceDate: new Date().toISOString().slice(0, 10),
  durationMinutes: 60,
  playedFriendlyMatch: false,
  practicedServes: false,
  sourceType: PracticeSourceType.MANUAL,
  classAttended: true,
  venueId: '',
  classSessionId: '',
  notes: '',
})

const isSubmitting = ref(false)

const validateForm = () => {
  if (!form.practiceDate) {
    errorToast('Debes seleccionar una fecha de práctica')
    return false
  }

  if (!form.durationMinutes || form.durationMinutes < 1) {
    errorToast('La duración debe ser mayor a 0 minutos')
    return false
  }

  if (form.sourceType === PracticeSourceType.CLASS) {
    if (!form.classSessionId || form.classSessionId.trim().length === 0) {
      errorToast('Para práctica de clase debes enviar class session ID')
      return false
    }

    if (!form.classAttended) {
      errorToast('Debes confirmar asistencia para registrar práctica de clase')
      return false
    }
  }

  return true
}

const buildPayload = (): CreatePracticePayload => {
  const payload: CreatePracticePayload = {
    practiceDate: form.practiceDate,
    durationMinutes: Number(form.durationMinutes),
    playedFriendlyMatch: !!form.playedFriendlyMatch,
    practicedServes: !!form.practicedServes,
    sourceType: form.sourceType,
    notes: form.notes?.trim() || undefined,
  }

  if (form.venueId?.trim()) {
    payload.venueId = form.venueId.trim()
  }

  if (form.sourceType === PracticeSourceType.CLASS) {
    payload.classAttended = !!form.classAttended
    payload.classSessionId = form.classSessionId?.trim()
  }

  return payload
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  const payload = buildPayload()

  await createPractice(payload)
    .then(() => {
      successToast('Práctica registrada con éxito')
      ionRouter.replace('/practices')
    })
    .catch((error) => {
      const errorMessage =
        error?.errors?.[0]?.message || 'No se pudo registrar la práctica'
      errorToast(errorMessage)
    })
    .finally(() => {
      isSubmitting.value = false
    })
}
</script>
