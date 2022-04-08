import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
Vue.config.productionTip = false

Vue.use(VModal)
new Vue({
  render: h => h(App),
}).$mount('#app')
