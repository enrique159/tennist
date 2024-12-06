import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import TablerIcons from './plugins/tabler-icons'
import storageFactory from '@/plugins/IonicStorage'
import { createPinia } from 'pinia'
import { vMaska } from "maska/vue"

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/styles.scss';
import 'animate.css';

// Global Components
import HeaderPage from './components/HeaderPage.vue';
import RoundedButton from './components/buttons/RoundedButton.vue';
import IconButton from './components/buttons/IconButton.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import CustomCheckbox from './components/inputs/CustomCheckbox.vue';

// Global Composables
const app = createApp(App)
const pinia = createPinia()
const storagePlugin = await storageFactory()

app.component('HeaderPage', HeaderPage);
app.component('RoundedButton', RoundedButton);
app.component('IconButton', IconButton);
app.component('LoadingSpinner', LoadingSpinner);
app.component('CustomCheckbox', CustomCheckbox);
app.directive('maska', vMaska)
app.use(IonicVue);
app.use(router);
app.use(TablerIcons);
app.use(pinia);
app.use(storagePlugin)

router.isReady().then(() => {
  app.mount('#app');
});
