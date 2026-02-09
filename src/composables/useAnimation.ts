import { AnimationBuilder, createAnimation } from '@ionic/vue';

export const useAnimation = () => {
  const animationBuilder: AnimationBuilder = (baseEl: HTMLElement) => {
    return createAnimation()
      .addElement(baseEl)
      .duration(0) // Duración cero para que sea inmediata
  }

  return {
    animationBuilder,
  }
}