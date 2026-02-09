<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-primary">
      <div class="w-full h-full flex flex-col">
        <header
          v-show="!showIntroduction"
          class="w-full custom-header-height px-4 pl-8 flex items-center justify-between animate__animated animate__fadeIn"
        >
          <span class="font-bold text-lg text-tertiary"
            >Bienvenido a tennist</span
          >
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
            :is-loading="isLoading"
            :current-step="currentStep"
            @submit="handleSubmit"
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
import PlayerGoalsSelector from '../components/PlayerGoalsSelector.vue'
import { IonPage, IonContent, useIonRouter } from '@ionic/vue'
import { useApp } from '@/composables/useApp'
import { useToast } from '@/composables/useToast'
import { computed, ref } from 'vue'
import { UserExperience } from '@/types'
import { Experience, Gender, PlayerGoals } from '@/types/User.type'


const showIntroduction = ref(true)
const { updateUserExperience } = useApp()
const { errorToast } = useToast()
const ionRouter = useIonRouter()

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
  playerGoals: PlayerGoals.RECREATIONAL,
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
  else if (currentStep.value === 4) return PlayerGoalsSelector
  else return null
})

const isLoading = ref(false)
const handleSubmit = () => {
  isLoading.value = true
  
  updateUserExperience(experience.value)
    .then(() => {
      ionRouter.push('/profile/setup-completed')
    })
    .catch(() => {
      errorToast('Error updating experience')
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<style lang="scss" scoped>
.flex-height {
  height: calc(100% - 128px);
}
.introduction-height {
  height: calc(100% - 200px);
}
</style>
