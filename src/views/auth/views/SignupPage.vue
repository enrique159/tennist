<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-primary">
      <div class="h-full w-full flex flex-col items-center justify-between">
        <header class="w-full p-4 pt-8">
          <icon-button class="mb-3" @click="goBack">
            <icon-arrow-left class="text-tertiary" />
          </icon-button>
        </header>

        <section class="w-full h-fit p-4 pb-6">
          <form ref="signUpFormRef" @submit.prevent>
            <div class="w-full flex flex-col gap-4 px-5 mb-8">
              <fieldset class="text-tertiary flex flex-col required">
                <label for="fullName" class="uppercase font-semibold"
                  >Nombre y apellido</label
                >
                <input
                  id="fullName"
                  v-model="signUpForm.fullName"
                  type="text"
                  class="border-b bg-transparent px-2 py-3 text-lg focus:outline-none"
                  :class="[
                    errorMessages.fullName
                      ? 'border-secondary text-secondary'
                      : 'border-tertiary',
                  ]"
                />
                <error-text :text="errorMessages.fullName" />
              </fieldset>

              <fieldset class="text-tertiary flex flex-col">
                <label for="phone" class="uppercase font-semibold"
                  >Teléfono</label
                >
                <input
                  id="phone"
                  v-model="signUpForm.phoneNumber"
                  type="text"
                  class="border-b bg-transparent px-2 py-3 text-lg focus:outline-none"
                  v-maska="'(###) ###-####'"
                  :class="[
                    errorMessages.phone
                      ? 'border-secondary text-secondary'
                      : 'border-tertiary',
                  ]"
                />
                <error-text :text="errorMessages.phone" />
              </fieldset>

              <fieldset class="text-tertiary flex flex-col required">
                <label for="email" class="uppercase font-semibold">email</label>
                <input
                  id="email"
                  v-model="signUpForm.email"
                  type="text"
                  class="border-b bg-transparent px-2 py-3 text-lg focus:outline-none"
                  :class="[
                    errorMessages.email
                      ? 'border-secondary text-secondary'
                      : 'border-tertiary',
                  ]"
                />
                <error-text :text="errorMessages.email" />
              </fieldset>

              <fieldset class="text-tertiary flex flex-col relative required">
                <label for="password" class="uppercase font-semibold"
                  >contraseña</label
                >
                <input
                  id="password"
                  v-model="signUpForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="border-b bg-transparent px-2 py-3 text-lg focus:outline-none"
                  autocomplete="new-password"
                  :class="[
                    errorMessages.password
                      ? 'border-secondary text-secondary'
                      : 'border-tertiary',
                  ]"
                />
                <button
                  class="bg-transparent text-tertiary text-lg absolute right-2 top-1/4 w-8 aspect-square rounded-full active:bg-black/10 grid place-items-center"
                  @click="showPassword = !showPassword"
                >
                  <icon-eye v-if="showPassword" />
                  <icon-eye-closed v-else />
                </button>
                <error-text :text="errorMessages.password" />
              </fieldset>

              <fieldset class="flex items-center justify-between gap-4" :class="{ 'animate__animated animate__tada': shakeTerms }">
                <custom-checkbox v-model="terms" />
                <label for="terms" class="font-bold">
                  Estoy de acuerdo con los
                  <router-link
                    to="/terms-and-conditions"
                    class="text-complementary2 underline"
                  >
                    términos y condiciones
                  </router-link>
                </label>
              </fieldset>
            </div>

            <rounded-button
              class="mt-4"
              class-name="bg-tertiary text-white active:scale-95"
              custom
              @click="validateSignUpForm"
            >
              <div
                class="flex items-center justify-between w-full h-full relative px-6 py-1 pr-1"
              >
                <span class="text-xl"> crear cuenta </span>
                <div
                  class="bg-primary text-tertiary rounded-full flex items-center justify-center h-full aspect-square"
                >
                  <loading-spinner
                    v-if="loadingSignUp === StateOptions.LOADING"
                    class-name="text-tertiary"
                  />
                  <icon-ball-tennis v-else class="rotate-45 text-tertiary" />
                </div>
              </div>
            </rounded-button>
          </form>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ErrorText from '@/components/ErrorText.vue'
import { IonPage, IonContent, useIonRouter } from '@ionic/vue'
import {
  IconArrowLeft,
  IconEye,
  IconEyeClosed,
  IconBallTennis,
} from '@tabler/icons-vue'
import { ref, reactive } from 'vue'
import { useApp } from '@/composables/useApp'
import { useToast } from '@/composables/useToast'
import { useStorage } from '@/composables/useStorage'
import { type State, StateOptions } from '@/types'
import FormValidations from '@/utils/formValidations'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

const ionRouter = useIonRouter()

const goBack = () => {
  ionRouter.back()
}

const showPassword = ref(false)

const signUpFormRef = ref()
const signUpForm = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
})
const errorMessages = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
})

const resetErrorMessages = () => {
  errorMessages.email = ''
  errorMessages.phone = ''
  errorMessages.password = ''
  errorMessages.fullName = ''
}

const { signUp, setToken, setUser } = useApp()
const { errorToast } = useToast()
const { setStorageValue } = useStorage()
const loadingSignUp = ref<State>(StateOptions.IDLE)

const terms = ref(false)
const shakeTerms = ref(false)

const validateSignUpForm = async () => {
  resetErrorMessages()

  FormValidations.validateEmail(
    signUpForm.email,
    (message) => (errorMessages.email = message)
  )
  FormValidations.validateCreatePassword(
    signUpForm.password,
    (message) => (errorMessages.password = message)
  )
  FormValidations.validateFullName(
    signUpForm.fullName,
    (message) => (errorMessages.fullName = message)
  )
  signUpForm.phoneNumber.length > 0 && FormValidations.validatePhone(
    signUpForm.phoneNumber,
    (message) => (errorMessages.phone = message)
  )

  const errorCount = Object.values(errorMessages).filter(
    (error) => error !== ''
  ).length
  if (errorCount > 0) {
    return
  }

  if (!terms.value) {
    shakeTerms.value = true
    setTimeout(() => {
      shakeTerms.value = false
    }, 1000)
    return
  }

  loadingSignUp.value = StateOptions.LOADING
  await signUp(signUpForm)
    .then((response) => {
      loadingSignUp.value = StateOptions.SUCCESS
      setToken(response.data.token)
      setUser(response.data.user)
      setStorageValue({ key: 'tennist_token', value: response.data.token })
      setStorageValue({ key: 'tennist_user', value: response.data.user })
      ionRouter.navigate('/profile/setup', 'root')
    })
    .catch((error) => {
      for (const err of error.errors) {
        if (err.statusCode === HttpStatusCode.NOT_FOUND)
          errorToast('No se ha encontrado un usuario con ese correo o teléfono')
        else errorToast(err.message)
      }
      loadingSignUp.value = StateOptions.ERROR
    })
}
</script>
