<template>
  <div class="w-full text-center px-8 text-xl font-semibold text-tertiary">
    <h2 v-if="step === 1" class="animate__animated" :class="step === 1 ? 'animate__fadeIn' : 'animate__fadeOut'">
      ¡Listo! Hemos creado tu cuenta
    </h2>

    <h2 v-if="step === 2" class="animate__animated" :class="step === 2 ? 'animate__fadeIn' : 'animate__fadeOut'">
      Ahora, necesitamos conocerte un poco más para completar tu perfil
    </h2>

    <h2 v-if="step === 3" class="animate__animated" :class="step === 3 ? 'animate__fadeIn' : 'animate__fadeOut'">
      Comencemos..
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    }
  },
  mounted() {
    setTimeout(() => this.step = 2, 3000);
    setTimeout(() => this.step = 3, 6000);
  }
}
</script>