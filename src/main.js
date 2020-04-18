import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ls from './plugins/LocalStorageMaster.js'
import modal from './plugins/ModalMaster.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faTrashAlt,
  faCaretSquareLeft,
  faCaretSquareRight,
  faSave
} from '@fortawesome/free-regular-svg-icons';
import { faPlus, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faEdit, faTrashAlt, faPaperPlane, faCaretSquareLeft, faCaretSquareRight, faSave, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(ls)
Vue.use(modal)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
