import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store/index.js'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faSearch, faUser, faTimes, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHeart, faSearch, faUser, faTimes, faArrowLeft, faArrowRight)

// UI
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BasePopup from './components/ui/BasePopup.vue'



const app = createApp(App)

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-popup', BasePopup)



app.mount('#app')
