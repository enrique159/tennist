<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content class="bg-tertiary" :force-overscroll="false">
          <ion-list id="inbox-list" class="pl-2 custom-content">
            <ion-list-header class="mb-8 flex items-center justify-between">
              <span class="text-primary font-light">tennist</span>
              <ion-menu-toggle class="ml-auto">
                <icon-x class="text-white" />
              </ion-menu-toggle>
            </ion-list-header>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="[ i === 7 ? 'pt-20' : '' ]" >
                <ion-label>
                  <span class="text-white uppercase font-bold text-2xl" :class="{ 'text-primary selected-marker': selectedIndex === i }">
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
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Inicio',
    url: '/home',
  },
  {
    title: 'Canchas',
    url: '/courts',
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
    title: 'Clubs',
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
];

const path = window.location.pathname.split('/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.url.split('/')[1] === path.toLowerCase());
}
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

.selected-marker {
  position: relative;
  padding-left: 12px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: v.$color-primary;
    border-radius: 4px;
  }
}
</style>
