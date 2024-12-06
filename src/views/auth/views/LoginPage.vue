<template>
  <ion-page>
    <ion-content :force-overscroll='false' class="bg-tertiary">
      <div class="video-background">
        <video autoplay loop muted playsinline>
          <source src="@/assets/login_video.mp4" type="video/mp4">
        </video>
      </div>

      <div class="w-full h-full flex flex-col overflow-hidden">
        <div class="w-full h-1/2 flex items-center justify-center">
          <span class="text-primary text-xl animate__animated animate__fadeInUp animate__delay-2s">tennist</span>
        </div>
        <div class="w-full h-1/2 bg-primary flex flex-col justify-start rounded-ss-[48px] rounded-se-[48px] animate__animated animate__slideInUp p-4">
          <rounded-button custom class="mb-4" @click="signIn">
            <div class="flex items-center justify-center w-full h-full relative">
              <span class="text-white text-lg">
                inicia sesión
              </span>

              <icon-arrow-right class="ml-2 text-primary absolute top-1/2 -translate-y-1/2 right-8" />
            </div>
          </rounded-button>

          <rounded-button custom class-name="bg-white text-tertiary" @click="signUp">
            <div class="flex items-center justify-center w-full h-full relative">
              <span class="text-complementary1 text-lg">
                crear cuenta
              </span>
            </div>
          </rounded-button>

          <p class="text-center my-4">
            o ingresa con
          </p>
          
          <div class="flex justify-center items-center gap-4">
            <button class="rounded-full bg-tertiary/10 text-complementary2 h-12 aspect-square flex items-center justify-center active:bg-tertiary/20 transition-all">
              <icon-google />
            </button>

            <button class="rounded-full bg-tertiary/10 text-complementary2 h-12 aspect-square flex items-center justify-center active:bg-tertiary/20 transition-all">
              <icon-facebook />
            </button>

            <button class="rounded-full bg-tertiary/10 text-complementary2 h-12 aspect-square flex items-center justify-center active:bg-tertiary/20 transition-all">
              <icon-apple />
            </button>
          </div>

          <div class="flex justify-between items-center absolute bottom-6 left-0 w-full px-6 text-xs">
            <span>términos y condiciones</span>

            <span>ayuda y soporte</span>
          </div>
        </div>
      </div>


      <div v-if="showFade" class="fade-page"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import IconGoogle from '@/assets/custom/IconGoogle.vue';
import IconFacebook from '@/assets/custom/IconFacebook.vue';
import IconApple from '@/assets/custom/IconApple.vue';
import { IconArrowRight } from '@tabler/icons-vue';
import { IonPage, IonContent, useIonRouter } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const showFade = ref(true);

onMounted(() => {
  setTimeout(() => {
    showFade.value = false;
  }, 2000);
});


const ionRouter = useIonRouter();

const signIn = () => {
  ionRouter.push('/auth/signin');
}

const signUp = () => {
  ionRouter.push('/auth/signup');
}
</script>

<style lang="scss" scoped>
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  filter: brightness(0.4);

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.fade-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: v.$color-primary;
  opacity: 0;
  pointer-events: none;
  animation: fade-effect 2s ease-in-out forwards;
}

@keyframes fade-effect {
  0% {
    opacity: 1;
    pointer-events: auto;
  }
  80% {
    opacity: 0;
    pointer-events: auto;
  }
  100% {
    opacity: 0;
    pointer-events: none;
  }
}
</style>