import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

Vue.prototype.$baseUrl = 'http://192.168.0.121:8180'

const app = new Vue({
    store,
    ...App
})
app.$mount()
