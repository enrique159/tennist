<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <div class="w-full h-full flex flex-col">
        <header
          v-show="!showIntroduction"
          class="w-full custom-header-height px-4 pl-8 flex items-center justify-between animate__animated animate__fadeIn"
        >
          <span class="font-bold text-lg text-tertiary"
            >Bienvenido a tennist</span
          >
          <ion-button fill="clear" class="text-secondary" size="small">
            <span class="text-[1rem]">Omitir todo</span>
          </ion-button>
        </header>
        <div v-if="showIntroduction" class="h-full grid place-items-center">
          <introduction-messages />
        </div>

        <section
          v-else
          class="flex-height w-full p-4 flex flex-col items-center justify-between animate__animated animate__fadeIn"
        >
          <!-- DINAMIC CONTENT -->
          <component
            v-if="currentSelector"
            :is="currentSelector"
            :experience="experience"
            @update:experience="updateExperience"
          />

          <setup-profile-footer
            :current-step="currentStep"
            @go-backward="goBackward"
            @go-forward="goForward"
          />
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import IntroductionMessages from '../components/IntroductionMessages.vue'
import SetupProfileFooter from '../components/SetupProfileFooter.vue'
import RolePlayerSelector from '../components/RolePlayerSelector.vue'
import ExperienceSelector from '../components/ExperienceSelector.vue'
import StylePlayerSelector from '../components/StylePlayerSelector.vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { computed, ref } from 'vue'
import { UserExperience } from '@/types'
import { Experience, Gender } from '@/types/User.type'

const showIntroduction = ref(true)

setTimeout(() => {
  showIntroduction.value = false
}, 9000)

const currentStep = ref(1)
const goForward = () => {
  currentStep.value++
}
const goBackward = () => {
  if (currentStep.value === 1) return
  currentStep.value--
}

const experience = ref<UserExperience>({
  role: null,
  gender: Gender.MALE,
  age: null,
  experience: Experience.BEGGINER,
  playingTime: null,
  playingStyle: null,
  courtTypePreference: null,
  gamePreference: null,
  playerGoals: null,
  gamesPerWeek: null,
  dominantHand: null,
})

const updateExperience = (experienceValue: UserExperience) => {
  experience.value = experienceValue
}

const currentSelector = computed(() => {
  if (currentStep.value === 1) return RolePlayerSelector
  else if (currentStep.value === 2) return ExperienceSelector
  else if (currentStep.value === 3) return StylePlayerSelector
  else return null
})
</script>

<style lang="scss" scoped>
.flex-height {
  height: calc(100% - 128px);
}
.introduction-height {
  height: calc(100% - 200px);
}
</style>
