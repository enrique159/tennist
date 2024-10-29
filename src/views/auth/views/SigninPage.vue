<template>
  <ion-page>
    <ion-content :force-overscroll="false" class="bg-tertiary dark">
      <div class="h-full w-full flex flex-col items-center justify-between">
        <header class="w-full p-4 pt-8">
          <icon-button light class="mb-3" @click="goBack">
            <icon-arrow-left class="text-primary" />
          </icon-button>
          <span class="text-2xl ml-1 text-white">Inicia sesión</span>
        </header>

        <section class="w-full h-fit p-4 pb-6">
          <form ref="signInFormRef" @submit.prevent>
            <div class="w-full flex flex-col gap-4 px-5 mb-8">
              <fieldset class="text-primary flex flex-col">
                <label for="email-phone" class="uppercase">email/teléfono</label>
                <input
                  id="email-phone"
                  v-model="signInForm.emailPhone"
                  type="text"
                  class="border-b  bg-transparent px-2 py-3 text-lg focus:outline-none"
                  :class="[ errorMessages.emailPhone ? 'border-secondary text-secondary' : 'border-primary' ]"
                />
                <error-text :text="errorMessages.emailPhone" />
              </fieldset>

              <fieldset class="text-primary flex flex-col relative">
                <label for="password" class="uppercase">contraseña</label>
                <input
                  id="password"
                  v-model="signInForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="border-b bg-transparent px-2 py-3 text-lg focus:outline-none"
                  :class="[ errorMessages.password ? 'border-secondary text-secondary' : 'border-primary' ]"
                >
                <button class="bg-transparent text-primary text-lg absolute right-2 top-1/4 w-8 aspect-square rounded-full active:bg-white/10 grid place-items-center" @click="showPassword = !showPassword">
                  <icon-eye v-if="showPassword" />
                  <icon-eye-closed v-else />
                </button>
                <error-text :text="errorMessages.password" />
              </fieldset>

              <router-link to="/auth/forget-password" class="text-white underline">
                olvidé mi contraseña
              </router-link>
            </div>

            <rounded-button
              class="mt-4"
              class-name="bg-primary text-tertiary active:scale-95"
              custom
              @click="validateSignInForm"
            >
              <div
                class="flex items-center justify-between w-full h-full relative px-6 py-1 pr-1"
              >
                <span class="text-xl"> ingresar </span>
                <div
                  class="bg-tertiary text-primary rounded-full flex items-center justify-center h-full aspect-square"
                >
                  <loading-spinner v-if="loadingSignIn === StateOptions.LOADING" class-name="text-primary" />
                  <icon-arrow-right v-else />
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
import ErrorText from '@/components/ErrorText.vue';
import { IonPage, IonContent, useIonRouter } from '@ionic/vue'
import { IconArrowLeft, IconArrowRight, IconEye, IconEyeClosed } from '@tabler/icons-vue'
import { ref, reactive } from 'vue'
import { useApp } from '@/composables/useApp';
import { useToast } from '@/composables/useToast';
import { useStorage } from '@/composables/useStorage'
import { type State, StateOptions } from '@/types';
import HttpStatusCode from '@/app/shared/enums/httpStatusCode';

const ionRouter = useIonRouter()

const goBack = () => {
  ionRouter.back()
}

const showPassword = ref(false)

const signInFormRef = ref()
const signInForm = reactive({
  emailPhone: '',
  password: '',
})
const errorMessages = reactive({
  emailPhone: '',
  password: '',
})

const isPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.match(/^\+?[0-9]{10,14}$/)
}

const validateEmailPhone = (emailPhone: string) => {
  // first check if it's a phone number or email, depending of what type is, do the regex match
  if (isPhoneNumber(emailPhone)) { // phone number
    if (!emailPhone.match(/^\+?[0-9]{10,14}$/)) {
      errorMessages.emailPhone = 'número de teléfono no válido'
      return false
    }
  } else { // email
    if (!emailPhone.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      errorMessages.emailPhone = 'correo o teléfono no válido'
      return false
    }
  }
  return true
}

const validatePassword = (password: string) => {
  if (password.length < 8) {
    errorMessages.password = 'contraseña demasiado corta'
    return false
  }
  return true
}

const resetErrorMessages = () => {
  errorMessages.emailPhone = ''
  errorMessages.password = ''
}

const { signIn, setToken, setUser } = useApp()
const { errorToast } = useToast()
const { setStorageValue } = useStorage()
const loadingSignIn = ref<State>(StateOptions.IDLE)

const validateSignInForm = async () => {
  resetErrorMessages()
  validateEmailPhone(signInForm.emailPhone)
  validatePassword(signInForm.password)

  const errorCount = Object.values(errorMessages).filter((error) => error !== '').length
  if (errorCount > 0) {
    return
  }

  loadingSignIn.value = StateOptions.LOADING
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await signIn({ emailPhone: signInForm.emailPhone, password: signInForm.password })
    .then((response) => {
      loadingSignIn.value = StateOptions.SUCCESS
      setToken(response.data.token)
      setUser(response.data.user)
      setStorageValue({ key: 'tennist_token', value: response.data.token })
      setStorageValue({ key: 'tennist_user', value: response.data.user })
      ionRouter.navigate('/home', 'root')
    })
    .catch((error) => {
      for (const err of error.errors) {
        if (err.statusCode === HttpStatusCode.NOT_FOUND) errorToast('No se ha encontrado un usuario con ese correo o teléfono')
        else errorToast(err.message)
      }
      loadingSignIn.value = StateOptions.ERROR
    })
}
</script>

<style lang="scss" scoped></style>
