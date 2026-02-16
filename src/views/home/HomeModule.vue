<template>
  <ion-page>
    <ion-content :force-overscroll="false">
      <ion-split-pane content-id="main-content">
        <ion-menu
          content-id="main-content"
          type="overlay"
          class="menu-backdrop"
        >
          <ion-content class="bg-tertiary" :force-overscroll="false">
            <ion-list id="inbox-list" class="pl-2 custom-content">
              <ion-list-header
                class="mb-8 flex items-center justify-between pr-4"
              >
                <span class="text-primary font-light text-xl">tennist</span>
                <ion-menu-toggle class="ml-auto">
                  <icon-x class="text-white" />
                </ion-menu-toggle>
              </ion-list-header>

              <ion-menu-toggle
                :auto-hide="false"
                v-for="(p, i) in appPages"
                :key="i"
              >
                <ion-item
                  @click="$router.push(p.url)"
                  lines="none"
                  :detail="false"
                  class="hydrated"
                  :class="[i === 7 ? 'pt-20' : '']"
                >
                  <ion-label>
                    <span class="text-white uppercase font-bold text-2xl">
                      {{ p.title }}
                    </span>
                  </ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonLabel,
} from '@ionic/vue'

const appPages = [
  {
    title: 'Inicio',
    url: '/home',
  },
  {
    title: 'Canchas',
    url: '/venues',
  },
  {
    title: 'Prácticas',
    url: '/practices',
  },
  {
    title: 'Clases',
    url: '/classes',
  },
  {
    title: 'Clubes',
    url: '/clubs',
  },
  {
    title: 'Torneos',
    url: '/tournaments',
  },
  {
    title: 'Amigos',
    url: '/friends',
  },
  {
    title: 'Mi perfil',
    url: '/profile',
  },
  {
    title: 'Ajustes',
    url: '/settings',
  },
]

</script>

<style lang="scss" scoped>
ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: v.$color-primary;
}

.custom-content {
  padding-top: calc(env(safe-area-inset-top) + 1rem);
}
</style>
