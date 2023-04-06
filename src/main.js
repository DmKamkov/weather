import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import router from './router'

library.add(fas)
const app = createApp(App)
app.component('FontAwesome', FontAwesomeIcon)
app.use(router)
app.mount('#app')
