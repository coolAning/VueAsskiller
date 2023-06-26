
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast, { POSITION  } from "vue-toastification";
import "vue-toastification/dist/index.css";
const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 1500,
});
app.use(router)
app.use(vuetify)
app.mount('#app')
