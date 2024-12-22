import './assets/main.css'
import 'primevue/resources/themes/aura-light-teal/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import ru from 'primelocale/ru.json';
import PrimeVue from 'primevue/config';

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {locale: ru.ru})

app.mount('#app')

